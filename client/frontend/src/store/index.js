import Vue from 'vue';
import Vuex from 'vuex';
import createMultiTabState from 'vuex-multi-tab-state';
import { alert } from './alert.module';
import { corona } from './corona.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    corona,
  },
  plugins: [
    createMultiTabState({
      key: 'tab',
      statesPaths: [
        'corona.exists'
      ]
    }),
  ]
});
