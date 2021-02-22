import axios from 'axios';

const API_URL = '/api/corona';

class CoronaService {

  fetchSpecificData(payload) {
    let body = {
          'KreisName': payload.name,
          'KreisArt': payload.type
    };
    return axios.post(API_URL, body)
  }

  fetchAllData() {
    return axios.get(API_URL + '/all');
  }
}

export default new CoronaService();
