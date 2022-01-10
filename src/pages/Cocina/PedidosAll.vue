<template>
  <q-page class="q-pa-sm">
     <q-toolbar class="bg-red-1  q-my-md shadow-2">
          <div class="text-h5  text-bold">
           -
          </div>
          <q-space />           
          <div class="text-h5  text-bold">S/ {{ SumTotal }}</div>
        </q-toolbar>
        <div class="row">
            <div class="col-3">
                <q-input v-model="date" filled type="date"    @update:model-value="search($event)"  />
            </div>
        </div>
        <br>     
        <div v-if="!itemallorder.length">
              <h5>SIN REGISTROS</h5>
       </div>
       <div class="row q-col-gutter-sm">     
          <div
            class="col-md-3 col-lg-4 col-sm-12 col-xs-12"
            v-for="item in itemallorder"
            :key="item.id_pedido"
          >
            <card-all-order            
              :id_pedido="item.id_pedido"
              :des_auxiliar="item.des_auxiliar"
              :piso_especialidad="item.piso_especialidad"
              :area="item.area"
              :color="item.color"
              :fecha_pedido="item.fecha_pedido"
              :hora_pedido="item.hora_pedido"
              :detalle="item.detalle"
              :estado_pedido="item.estado_pedido"
              :total="item.totalpedido"                    
            ></card-all-order>
          </div>
        </div>     
  </q-page>
</template>

<script>
import { defineComponent, ref,reactive } from "vue";
import CardAllOrder from "components/cards/CardAllOrder.vue";

import { mapState } from "vuex";

export default defineComponent({
  name: "PedidosAll",
  components: {CardAllOrder},
  setup() {
    let itemallorder = ref([]);
    const modelo = reactive({ COD_AUXILIAR: "", DES_AUXILIAR: "" });
    return {   
      itemallorder,
      step: ref(0),  
      date: ref(''),        
      modelo,
     
    };
   },
   created(){ 
      let existe = this.$q.sessionStorage.has("Qsesion");    
      if (existe==false) {
         this.$router.push({ path: "/" });
      }    
   },
   mounted() {
     // let  conn= new WebSocket(this.url_socket);
      let existe = this.$q.sessionStorage.has("Qsesion");     
      if (existe==true) {
          let obj = this.$q.sessionStorage.getItem("Qsesion");
          this.modelo.DES_AUXILIAR = obj.DES_AUXILIAR;
          this.modelo.COD_AUXILIAR = obj.COD_AUXILIAR;
      } 
     this.get();
   },
  computed: {
   ...mapState(["url_base",'url_izipay','url_socket']),
    SumTotal() {
      var result = this.itemallorder.reduce(function (acc, obj) {
        return acc + parseFloat(obj.totalpedido);
      }, 0);
      return result.toFixed(2);
    },
  },
  methods: {      
    get(){
      let tipo="getallorder";
      let url="/Controller/PedidoController.php?tipo="+tipo;
      this.$axios
        .get(this.url_base+url)
        .then((response) => {
       ///  console.log(response)
          this.itemallorder = response.data;         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },  
    search(event){
      let fecha =event;
      let tipo="fecha";
      let url="/Controller/PedidoController.php?tipo="+tipo+"&fecha="+fecha;
      this.$axios
        .get(this.url_base+url)
        .then((response) => {
         console.log(response)
          this.itemallorder = response.data;         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    } 
   
  },
});
</script>

<style >
.q-stepper__step-content {
  display: none !important;
}
</style>
