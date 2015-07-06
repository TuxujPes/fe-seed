import axios from 'axios';
import urls from '../configs/url_constants';

export default {
  get: function get(url) {
    let path = urls.BASE_URL + url;

    console.log(`GET: ${url}`);
    return axios.get(path);
  }
};
