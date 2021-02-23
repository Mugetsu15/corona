import CoronaService from "@/services/corona.service";

const data = JSON.parse(sessionStorage.getItem('corona'));
const initialState = data
    ? { corona: { exists: true, data: data } }
    : { corona: { exists: false, data: [] } };

export const corona = {
    namespaced: true,
    state: initialState,
    actions: {
        fetchSpecificData({ commit }, payload) {
            return CoronaService.fetchSpecificData(payload).then(response => {
                if (response.data) {
                    commit("fetchSuccess", response.data);
                    sessionStorage.setItem('corona', JSON.stringify(response.data));
                }
                return Promise.resolve(response);
            }, error => {
                return Promise.reject(error);
            });
        },
        fetchAllData({ commit }) {
            return CoronaService.fetchAllData().then(response => {
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
        fallback({ commit }) {
            return CoronaService.fallback().then(response => {
                return Promise.resolve(response);
            }, error => {
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
