import Vuex from "vuex";

// Use a new variable and export values to change default behaviour.
let store = null;
 
import { useQuasar } from 'quasar'
export default function () {
  const Store = new Vuex.Store({
    namespaced: true,
    name: "global",
      state: {  url_base: 'http://192.168.3.219/ApiCafeteria',
      DatosUsuario:{},
      url_izipay:'http://192.168.3.219/pasarela',
      url_socket:'ws://192.168.3.219:8090',
      carrito:[] ,
      tipoMensaje:'',
      systemNotify: {
        openNoti1: false,
        openNoti2: false       
      },
    },
    mutations: {   
      setUsuario(state,obj){
        state.DatosUsuario=obj
      },  
      showNotify:(state,show)=>{
        state.systemNotify.openNoti=show;
      },

      setItemCart (state, data) {  
       // state.systemNotify.openNoti1=true;  
        if (data.usastock==1) {
          if (data.stock==0) {
            /// fin(title);
          //  state.openNoti1.openNoti1=true;
          }
          else{
                let obj =state.carrito.find((x) => x.id_producto == data.id_producto);
                if (obj) {
                      let position = state.carrito.findIndex((x) => x.id_producto == data.id_producto);
                      let cantidad_pedido = obj.cantidad_pedido;
                      if (cantidad_pedido>=data.stock) {
                        //  Mucho()
                        state.tipoMensaje="sin";
                      }else{
                        let precio =obj.precio;
                        state.carrito[position].cantidad_pedido = cantidad_pedido + 1; 
                        state.carrito[position].total = precio * state.carrito[position].cantidad_pedido;   
                        state.carrito[position].stock = data.stock;   
                      }                    
                }else{
                     const objeto = {
                      id_producto: data.id_producto,
                      producto: data.title,
                      cantidad_pedido: 1,
                      id_categoria:data.id_categoria,
                      precio: parseFloat(data.preci),
                      total: parseFloat(data.preci) ,
                      descripcion:'',
                      stock:data.stock,
                      usastock:data.usastock
                    };     
                    state.carrito.push(objeto); 
                }
                state.tipoMensaje="add";
               // console.log("agregado")
              //    $q.notify({
              //   message: "Agregado "+data.title,
              //   color: "accent",
              //   position: "top",
              // });
          }
      }else{

            let obj = state.carrito.find((x) => x.id_producto == data.id_producto);
            if (obj) {  
                 let position = state.carrito.findIndex((x) => x.id_producto == data.id_producto);
                 let cantidad_pedido = obj.cantidad_pedido;
                 let precio =obj.precio;
                 state.carrito[position].cantidad_pedido = cantidad_pedido + 1; 
                 state.carrito[position].total = precio * state.carrito[position].cantidad_pedido;  

            }else{
                 const objeto = {
                      id_producto: data.id_producto,
                      producto: data.title,
                      cantidad_pedido: 1,
                      id_categoria:data.id_categoria,
                      precio: parseFloat(data.preci),
                      total: parseFloat(data.preci) ,
                      descripcion:'',
                      stock:data.stock,
                      usastock:data.usastock
                    };     
                    state.carrito.push(objeto); 
            }
            state.tipoMensaje="add";
          //    $q.notify({
          //       message: "Agregado "+data.title,
          //       color: "accent",
          //       position: "top",
          // });

      } 
       
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