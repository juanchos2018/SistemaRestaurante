import Vuex from "vuex";

// Use a new variable and export values to change default behaviour.
let store = null;

//Vue.use(Vuex);

// .. other code
//Clinica url_base: 'http://192.168.3.219/ApiCafeteria', 

export default function () {
  const Store = new Vuex.Store({
    namespaced: true,
    name: "global",
    state: {  url_base: 'http://192.168.3.219/ApiCafeteria', },
    
  });

  // add this so that we export store
  store = Store;

  // Quasar default
  return Store;
}

// add this line to access store wherever you need
export { store };