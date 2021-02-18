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
                if (response.data) {

                    commit("fetchSuccess");
                }
                return Promise.resolve(response);
            }, error => {
                commit("fetchFailure");
                return Promise.reject(error);
            });
        },
        fetchAllData({ commit }) {
            return CoronaService.fetchAllData().then(response => {
                console.error(response);
                if (response.data) {
                    commit("fetchSuccess", response.data);
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
            state.corona = data;
        },
        fetchFailure(state) {
            state.exists = false;
            state.corona = null;
        },
    }
};
