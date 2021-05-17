import axios from 'axios';

const API_URL = 'https://rest-api.gservon.de/corona/';
const API_URL_ALL = API_URL + 'iz/all';
const API_URL_BY_DATE = API_URL_ALL + '/select/{DDMMYYYY}';
const API_URL_BY_DISTRICT = 'iz/district';

class CoronaService {

  byDate(date) {
    return axios.get(API_URL_BY_DATE + date);
  }

  all() {
    return axios.get(API_URL_ALL);
  }

  byDistrict(district) {
    let body = {
      'KreisName': district.KreisName,
      'KreisArt': district.KreisArt
};
    return axios.post(API_URL_BY_DISTRICT, body, {
      
    });
  }
}

export default new CoronaService();
