import axios from 'axios'
import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        isLogged: false,
    }, 
    mutations: {
        login(state) {
            state.isLogged = true
        },
        logout(state) {
            state.isLogged = false
        },
    },
    getters: {
        isLogged: state => state.isLogged
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
    }
})

