import axios from 'axios';

const API_URL = 'https://rest-api.gservon.de/corona';
const API_URL_ALL = '/iz/all';
const API_URL_BY_DATE = API_URL_ALL + '/select/{DDMMYYYY}';
const API_URL_DISTRICT = API_URL_ALL + '/district';

class CoronaService {

  byDate(date) {
    return axios.post(API_URL_BY_DATE + date);
  }

  all() {
    return axios.get(API_URL_ALL);
  }

  byDistrict(district) {
    let body = {
        "KreisArt": district.KreisArt,
        "KreisName": district.KreisName
    }
    return axios.post(API_URL_DISTRICT, body, {
    
    });
  }
}

export default new CoronaService();
