import axios from 'axios';

const API_URL = 'api/corona';

class CoronaService {

  fetchSpecificData(payload) {
    let body = {
          'kreisName': payload.name,
          'kreisArt': payload.type
    };
    return axios.post(API_URL, body).then(
        (response) => {
            if (response.data.corona) {
                sessionStorage.setItem(JSON.stringify('corona', response.data.corona));
            }
            return response;
        }
    );
  }

  fetchAllData() {
    return axios.get(API_URL + '/all').then(
        (response) => {
            if (response.data) {
                sessionStorage.setItem(JSON.stringify('corona', response.data.corona));
            }
            return response;
        }
    );
  }
}

export default new CoronaService();
