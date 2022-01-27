<template>
  <q-page class="q-pa-sm">

    <br>
    <br>
       <div class="row q-col-gutter-sm">     
          <div
            class="col-md-3 col-lg-4 col-sm-12 col-xs-12"
            v-for="item in itemhistory"
            :key="item.id_pedido"
          >
            <card-history            
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
              v-on:updateStart="UpdateStart"         
            ></card-history>
          </div>
        </div>     
  </q-page>
</template>

<script>
import { defineComponent, ref,reactive } from "vue";
import CardHistory from "components/cards/CardHistory.vue";

import { mapState } from "vuex";

export default defineComponent({
  name: "MiPedido",
  components: {CardHistory},
  setup() {
    let itemhistory = ref([]);
    const modelo = reactive({ COD_AUXILIAR: "", DES_AUXILIAR: "" });
    return {   
      itemhistory,
      step: ref(0),            
      modelo,
      conn:null,
     
    };
   },
   created(){ 
      let existe = this.$q.sessionStorage.has("Qsesion");    
      if (existe==false) {
         this.$router.push({ path: "/" });
      }    
   },
   mounted() {
      let existe = this.$q.sessionStorage.has("Qsesion");     
      if (existe==true) {
          let obj = this.$q.sessionStorage.getItem("Qsesion");
          this.modelo.DES_AUXILIAR = obj.DES_AUXILIAR;
          this.modelo.COD_AUXILIAR = obj.COD_AUXILIAR;
      } 
     this.get();
   },
  computed: {
   ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2"]),
  },
  methods: {      
    get(){
      let tipo="history";
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      let url="/Controller/PedidoController.php?tipo="+tipo+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;
      this.$axios
        .get(url_b+url)
        .then((response) => {
       ///  console.log(response)
          this.itemhistory = response.data;         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },   
    UpdateStart(obj){
   //  console.log(obj);
      let me = this;
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      let url ="/Controller/PedidoController.php";         
      let data = obj;
      this.$axios({
        method: "PUT",
        url: url_b+url,
        data: data,
      })
        .then(function (response) {
         //  console.log(response);
          let result = response.data;
          me.get();
              me.$q.notify({
              message: "Calificado ",
              color: "accent",
              position: "top",
        });
        
        })
        .catch((error) => {
          console.log(error);
        });
     }
  },
});
</script>

<style >
.q-stepper__step-content {
  display: none !important;
}
</style>
