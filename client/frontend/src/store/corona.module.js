import CoronaService from "../services/corona.service";

const data = JSON.parse(sessionStorage.getItem('corona'));
const initialState = data
    ? { data: { exists: true, corona: data } }
    : { data: { exists: false, corona: null } };

export const corona = {
    namespaced: true,
    state: initialState,
    actions: {
        fetchSpecificData({ commit }, payload) {
            return CoronaService.fetchSpecificData(payload).then(response => {
                commit("fetchSuccess")
                return Promise.resolve(response);
            }, error => {
                commit("fetchFailure")
                return Promise.reject(error);
            });
        },
        fetchAllData({ commit }) {
            return CoronaService.fetchAllData().then(response => {
                commit("fetchSuccess")
                return Promise.resolve(response);
            }, error => {
                commit("fetchFailure")
                return Promise.reject(error);
            });
        },
    },
    mutations: {
        fetchSuccess(state) {
            state.exists = true;
        },
        fetchFailure(state) {
            state.exists = false;
        },
    }
};
