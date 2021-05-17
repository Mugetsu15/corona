import CoronaService from "@/services/corona.service";

const data = JSON.parse(sessionStorage.getItem('corona'));
const initialState = data
    ? { corona: { exists: true, data: data } }
    : { corona: { exists: false, data: [] } };

export const corona = {
    namespaced: true,
    state: initialState,
    actions: {
        byDate({ commit }, date) {
            return CoronaService.byDate(date).then(response => {
                if (response.data) {
                    sessionStorage.setItem('corona', JSON.stringify(response.data));
                }
                return Promise.resolve(response);
            }, error => {
                return Promise.reject(error);
            });
        },
        all({ commit }) {
            return CoronaService.all().then(response => {
                if (response.data) {
                    commit("fetchSuccess", response.data);
                    sessionStorage.setItem('corona', JSON.stringify(response.data));
                }
                return Promise.resolve(response);
            }, error => {
                commit("fetchFailure");
                return Promise.reject(error);
            });
        },
        byDistrict({ commit }, district) {
            return CoronaService.byDistrict(district).then(response => {
                if (response.data) {
                    sessionStorage.setItem('corona', JSON.stringify(response.data));
                }
                return Promise.resolve(response);
            }, error => {
                commit("fetchFailure");
                return Promise.reject(error);
            });
        },
    },
    mutations: {
        fetchSuccess(state, data) {
            state.exists = true;
            state.data = data;
        },
        fetchFailure(state) {
            state.exists = state.data.length > 0;
        }
    }
};
