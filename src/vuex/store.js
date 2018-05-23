import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: true
}

export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING(state, status) {
      state.isLoading = status
    }
  }
})
