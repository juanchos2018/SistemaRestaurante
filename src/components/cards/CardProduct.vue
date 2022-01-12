<template>
  <q-card class="my-card colorborde" @click="aggrear(data.id_producto,data.nombre_producto,data.precio_venta,data.id_categoria,data.stock,data.usastock)">
      <q-img :src="url_base+data.imagen"   :ratio="4/3" >
        <div class="absolute-top text-h5 text-right text-bold text-green" style="height:45px">         
           <strong> S/  {{data.precio_ventas}}</strong>  
             <!-- <q-badge fab color="primary" :label="data.precio_ventas"   class="q-mr-sm"  /> -->
              
                 <!-- <q-chip outline color="teal" text-color="white" >
              {{data.precio_ventas}}
              </q-chip> -->
        </div>
      </q-img>
      <q-card-section>     
        <div v-if="data.usastock==1">
            <q-badge fab color="primary" :label="data.stock>0?'Disponible':'Agotado'"   class="absolute"   style="top: 0; right: 12px; transform: translateY(-50%);"/>
        </div> 
        <div v-else>
           <q-badge fab color="primary" label="Libre"   class="absolute"   style="top: 0; right: 12px; transform: translateY(-50%);"/>
        </div>     
        <div class="row no-wrap items-center no-padding no-margin">
          <div class="col text-h6 ellipsis no-padding no-margin ">
            {{ data.nombre_producto }}
          </div>                
          <div class="col-auto 	 text-caption q-pt-md row no-wrap items-center no-padding no-margin">         
            <!-- S/  {{data.precio_ventas}} -->
             <span class="text-green text-bold" v-if="data.usastock==1">  stock :  {{ data.stock }}</span>
         <span class="text-green text-bold"  v-else>    stock :  <q-icon name="fas fa-infinity" size="24px"></q-icon></span>
          </div>
        </div>  
          <div class="text-caption text-grey no-padding no-margin">
          {{data.descripcion}}
        </div>
        <div class="">
        <!-- <q-rating size="22px" v-model="data.estrellas" :max="5" color="yellow"   readonly  /> -->
        </div>
      </q-card-section>
       <!-- <q-card-section>
         <div class="row no-wrap items-center">
            <q-rating size="22px" v-model="data.estrellas" :max="5" color="yellow"   readonly  />
         </div>
      </q-card-section> -->
      <q-card-section class="">
       <q-item-label  lines="1">  
        


         <!-- <div class="text-subtitle1" v-if="data.usastock==1">
          stock :  {{ data.stock }}
        </div>
        <div class="text-subtitle1" v-else>        
          stock :  <q-icon name="fas fa-infinity" size="24px"></q-icon>
        </div> -->
           <q-rating size="22px" v-model="data.estrellas" :max="5" color="yellow"   readonly  />
        </q-item-label>

  <!-- <q-item-label caption lines="1"> Cant.: {{ item.cantidad_pedido }} x <span class="text-green text-bold"> {{item.precio_venta}}</span></q-item-label> -->


        <!-- <div class="text-subtitle1" v-if="data.usastock==1">
          stock :  {{ data.stock }}
        </div>
        <div class="text-subtitle1" v-else>        
          stock :  <q-icon name="fas fa-infinity" size="24px"></q-icon>
        </div> -->
       
      </q-card-section>
      <q-separator />   
    </q-card> 
</template>

<script>
import { inject, defineComponent } from "vue";
import { useQuasar } from 'quasar'
import { mapState ,useStore} from "vuex";



export default defineComponent({
  name: "CardProduct",
  props: ["data"],
  setup() {
    const $q = useQuasar()
    const store = useStore();
    const arrayva = inject("arrayvacio");
    const fin=(title)=>{
          $q
        .dialog({
          dark: true,
          title: "Ups",
          message: title+" Se ha agotado",
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
    const Mucho=()=>{
          $q
        .dialog({
          dark: true,
          title: "Ups",
          message: "No tenemos Tanto Stock :(",
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    const aggrear = (id_producto, title, preci,id_categoria,stock,usastock) => {
      
        // let data ={
        //     id_producto:id_producto,
        //     title:title,
        //     preci:preci,
        //     id_categoria:id_categoria,
        //     stock:stock,
        //     usastock:usastock
        //   }
        // store.commit('setItemCart', data);
        // let tipo =store.state.tipoMensaje;
        // if (tipo=="sin") {
        //       Mucho();
        // }else if (tipo=="add") {
        //     $q.notify({
        //       message: "Agregado "+title,
        //       color: "accent",
        //       position: "top",
        //     });
        // }       
      

        if (usastock==1) {
            if (stock==0) {
               fin(title);
            }
            else{
                  let obj = arrayva.value.find((x) => x.id_producto == id_producto);
                  if (obj) {
                        let position = arrayva.value.findIndex((x) => x.id_producto == id_producto);
                        let cantidad_pedido = obj.cantidad_pedido;
                        if (cantidad_pedido>=stock) {
                            Mucho()
                        }else{
                          let precio =obj.precio;
                          arrayva.value[position].cantidad_pedido = cantidad_pedido + 1; 
                          arrayva.value[position].total = precio * arrayva.value[position].cantidad_pedido;   
                          arrayva.value[position].stock = stock;   
                        }                    
                  }else{
                       const objeto = {
                        id_producto: id_producto,
                        producto: title,
                        cantidad_pedido: 1,
                        id_categoria:id_categoria,
                        precio: parseFloat(preci),
                        total: parseFloat(preci) ,
                        descripcion:'',
                        stock:stock,
                        usastock:usastock
                      };     
                      arrayva.value.push(objeto); 
                  }
                   $q.notify({
                  message: "Agregado "+title,
                  color: "accent",
                  position: "top",
                });
            }
        }else{

              let obj = arrayva.value.find((x) => x.id_producto == id_producto);
              if (obj) {  
                   let position = arrayva.value.findIndex((x) => x.id_producto == id_producto);
                   let cantidad_pedido = obj.cantidad_pedido;
                   let precio =obj.precio;
                   arrayva.value[position].cantidad_pedido = cantidad_pedido + 1; 
                   arrayva.value[position].total = precio * arrayva.value[position].cantidad_pedido;  

              }else{
                   const objeto = {
                        id_producto: id_producto,
                        producto: title,
                        cantidad_pedido: 1,
                        id_categoria:id_categoria,
                        precio: parseFloat(preci),
                        total: parseFloat(preci) ,
                        descripcion:'',
                        stock:stock,
                        usastock:usastock
                      };     
                      arrayva.value.push(objeto); 
              }
               $q.notify({
              message: "Agregado "+title,
              color: "accent",
              position: "top",
            });

        }   
    
    };
    return { aggrear,fin };
  },
   computed: {
    ...mapState(["url_base",'url_izipay',]),
   },
  methods: {
    detail(id, title, preci) {
      this.$emit("additem", id, title, 1, parseInt(preci));
    },
    calcula(){
       this.$emit('calcula',  canPrec);
    }, 
  },
});
</script>

<style scoped>


.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>
