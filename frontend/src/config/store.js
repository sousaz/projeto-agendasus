import axios from '../services/api'
import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    isLogged: false,
    currentPage: 1,
    selectedUbs: '',
    selectedQuery: '',
    tableData: {},
    loadMore: true
  },
  mutations: {
    login(state) {
      state.isLogged = true
    },
    logout(state) {
      state.isLogged = false
    },
    setPage(state, page) {
      if(page > 0)
        state.currentPage = page
    },
    setUbs(state, ubs) {
      state.selectedUbs = ubs
    },
    setQuery(state, query) {
      state.selectedQuery = query
    },
    setTableData(state, data) {
      state.tableData = data
    },
    setLoadMore(state, data) {
      state.loadMore = data
    },
  },
  getters: {
    isLogged: state => state.isLogged,
  },
  actions: {
    async initializeApp({ commit }) {
      const token = localStorage.getItem('token');

      if (token) {
        const url = "/auth/validateToken";

        try {
          const response = await axios.post(url, { token });

          if (response.data.validate === true) {
            commit('login');
          } else {
            commit('logout');
          }
        } catch (error) {
          console.error("Erro na validação do token:", error);
          commit('logout');
        }
      }
    },
    async validateAdmin({ commit }) {
      const token = localStorage.getItem('token');

      if (token) {
        const url = "/auth/admin";

        try {
          const response = await axios.post(url, { token });

          if (response.data.validate === true) {
            commit('login');
          } else {
            commit('logout');
          }
        } catch (error) {
          console.error("Erro na validação do token:", error);
          commit('logout');
        }
      }
    },
    async loadTable(context) {
      const url = `/auth/consulta/${context.state.currentPage}/${context.state.selectedUbs}/${context.state.selectedQuery}`
      try {
        const response = await axios.get(url)
        if(response.data.length) {
          context.commit('setTableData', response.data)
          context.commit('setLoadMore', true)
        }else {
          context.commit('setTableData', response.data)
          context.commit('setLoadMore', false)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})

