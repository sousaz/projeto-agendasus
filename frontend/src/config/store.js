import axios from 'axios'
import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    isLogged: false,
    currentPage: 1,
    selectedUbs: '',
    selectedQuery: '',
    tableData: {},
  },
  mutations: {
    login(state) {
      state.isLogged = true
    },
    logout(state) {
      state.isLogged = false
    },
    setPage(state, page) {
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
  },
  getters: {
    isLogged: state => state.isLogged,
  },
  actions: {
    async initializeApp({ commit }) {
      const token = localStorage.getItem('token');

      if (token) {
        const url = "http://localhost:3333/api/auth/validateToken";

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
      const url = `http://localhost:3333/api/auth/consulta/${context.state.currentPage}/${context.state.selectedUbs}/${context.state.selectedQuery}`
      try {
        const response = await axios.get(url)
        context.commit('setTableData', response.data)
        console.log(context.state.tableData)
      } catch (error) {
        console.log(error)
      }
    }
  }
})

