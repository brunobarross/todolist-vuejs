import { createStore } from 'vuex';
import axios from 'axios';


export default createStore({
  state: {
    todos: [],
  },
  getters: {},
  mutations: {
    storeTodos(state, data) {
      state.todos = data;
    },
    storeTodo(state, data) {
      state.todos.unshift(data)
    },
  },
  actions: {
    getTodos({ commit }) {
      //forçando loading demorado pois os dados estavam vindo rápido demais, não preciso na vida real pois depende do tempo da requisição
      return new Promise((resolve) =>{
        setTimeout(() => {
          return axios
          .get('http://localhost:3000/todos')
          .then((response) => {
            commit('storeTodos', response.data);
            // this.todos = response.data;
            resolve();
          })
        }, 300);
      })
      
        
    },
    addTodo({commit}, data){
      return axios.post('http://localhost:3000/todos', data).then((response)=>{
        commit('storeTodo', response.data)
      })
    }
  },
  modules: {},
});
