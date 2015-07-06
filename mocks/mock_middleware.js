var fs = require('fs');
var config = require('./config');
var MOCKS_ROOT_PATH = './mocks/';
var urlParser = require('url');

module.exports = function(req, res, next) {

  var match = false;

  var fileToRead = '';

  var RESPONSE_DELAY = 500;

  Object.keys(config).forEach(function(url) {

    var queryString = urlParser.parse(req.url);
    var requestType = req.method.toLowerCase();

    if (queryString.pathname === url && Object.keys(config[url]).indexOf(requestType) > -1) {

      match = true;

      /* ability to set JSON mock file according to options POST request field */
      if (typeof config[url][requestType] !== 'string') {
        config[url][requestType].every(function(conf) {
          if (conf.optionValue === req.body.options[conf.option]) {
            fileToRead = conf.file;
            return false;
          } else {
            return true;
          }
        });

      } else {
        fileToRead = config[url][requestType];
      }
    }
  });

  //no match with the url, move along
  if (match === false) {
    return next();
  }

  var fullFilePath = MOCKS_ROOT_PATH + fileToRead;

  fs.readFile(fullFilePath, 'utf8', function(err, data) {
    if (err) {
      console.log('JSON mock file ' + fullFilePath + ' read error');
      res.writeHead(404);
    } else {

      // Handle JSON parsing errors
      try {
        JSON.parse(data);
      } catch (e) {
        console.log('JSON read error: mock file ' + fileToRead + 'is not a valid JSON!');
        res.writeHead(500);
        return res.end('JSON mock file ' + fullFilePath + ' read error');
      }

      console.log('JSON mock file ' + fullFilePath + ' read success');
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      // simulate server delay
      setTimeout(function() {
        res.end(data);
      }, RESPONSE_DELAY);
    }
  });
};
