import Vuex from "vuex";

// Use a new variable and export values to change default behaviour.
let store = null;

//Vue.use(Vuex);

// .. other code
//Clinica url_base: 'http://192.168.3.219/ApiCafeteria', 
import { useQuasar } from 'quasar'
export default function () {
  const Store = new Vuex.Store({
    namespaced: true,
    name: "global",
    state: {  url_base: 'http://192.168.1.209/ApiCafeteria',DatosUsuario:{},url_izipay:'http://192.168.3.219/pasarela',url_socket:'ws://192.168.1.209:8090' },
    mutations: {   
      setUsuario(state,obj){
        state.DatosUsuario=obj
      },  
    },
    getters: {
      TipoUsuario(state){
        return state.user
      },
      
    },
    actions: {    
        guardarDatos({commit},obj){
        commit("setUsuario",obj)        
       // localStorage.setItem("nombre", nombre)
        //this.$useQuasar.localStorage.set("Qsesion", objeto)
        const parsed = JSON.stringify(obj);
        localStorage.setItem("Qsesion", parsed)
        },
      // this.cats = JSON.parse(localStorage.getItem('cats'));
      
    },

    
  });
  // add this so that we export store
  store = Store;  
  return Store;
}

// add this line to access store wherever you need
export { store };