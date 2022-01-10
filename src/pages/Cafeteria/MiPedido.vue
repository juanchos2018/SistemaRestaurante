<template>
  <q-page class="q-pa-sm">
     <q-tabs v-model="tab" dense align="justify" class="bg-primary text-white shadow-2" :breakpoint="0">
      <q-tab name="mails" icon="alarm" label="Proceso" />
      <q-tab name="success" icon="alarm" label="Entregado" />
      <q-tab name="alarms" icon="fas fa-exclamation-triangle" label="Rechazado" />
    </q-tabs>
     <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails">
       <div class="row q-col-gutter-sm">     
          <div
            class="col-md-3 col-lg-4 col-sm-12 col-xs-12"
            v-for="item in itemCocina"
            :key="item.id_pedido"
          >
            <card-mi-pedido
              :id_pedido="item.id_pedido"
              :des_auxiliar="item.des_auxiliar"
              :piso_especialidad="item.piso_especialidad"
              :area="item.area"
              :color="item.color"
              :detalle="item.detalle"
              :estado_pedido="item.estado_pedido"
              :fecha_pedido="item.fecha_pedido"
              :hora_pedido="item.hora_pedido"
              :total="item.totalpedido"
            
            ></card-mi-pedido>
          </div>
        </div>
      </q-tab-panel>
       <q-tab-panel name="success"> 
        <div class="row q-col-gutter-sm">
          <div class="col-md-3 col-lg-4 col-sm-12 col-xs-12" v-for="item in itemSucess" :key="item.id_pedido">
            <card-success 
            :id_pedido="item.id_pedido"
            :des_auxiliar="item.des_auxiliar"
            :piso_especialidad="item.piso_especialidad"
            :area="item.area" :color="item.color"
            :detalle="item.detalle"
            :estado="item.estado_pedido"
            :fecha_pedido="item.fecha_pedido"
            :hora_pedido="item.hora_pedido"
            :total="item.totalpedido"
            v-on:updateStart="UpdateStart"       >
            </card-success>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="alarms">
    
        <div class="row q-col-gutter-sm">
          <div class="col-md-3 col-lg-4 col-sm-12 col-xs-12" v-for="item in itemRejected" :key="item.id_pedido">
            <card-rejected  :id_pedido="item.id_pedido"
            :des_auxiliar="item.des_auxiliar"
            :piso_especialidad="item.piso_especialidad"
            :area="item.area" :color="item.color"
            :detalle="item.detalle"
            :estado="item.estado_pedido"
            :fecha_pedido="item.fecha_pedido"
            :hora_pedido="item.hora_pedido"
            :total="item.totalpedido"></card-rejected>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>      
  </q-page>
</template>

<script>
import { defineComponent, ref,reactive } from "vue";
import CardMiPedido from "components/cards/CardMiPedidos.vue";
import CardRejected from "components/cards/CardRejected.vue";
import CardSuccess from "components/cards/CardSuccess.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "MiPedido",
  components: {CardMiPedido,CardRejected,CardSuccess},
  setup() {
    const done1 = ref(false);
    const done2 = ref(false);
    const done3 = ref(false);
    let itemCocina = ref([]);
    let itemRejected = ref([]);
    let itemSucess = ref([]);
    const modelo = reactive({ COD_AUXILIAR: "", DES_AUXILIAR: "" });
    return {
      tab: ref("mails"),
      itemRejected,
      itemCocina,    
      itemSucess,
      step:ref(0),
    
      done1,
      done2,
      done3,      
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
      this.conn= new WebSocket(this.url_socket);
      let existe = this.$q.sessionStorage.has("Qsesion");     
      if (existe==true) {
          let obj = this.$q.sessionStorage.getItem("Qsesion");
          this.modelo.DES_AUXILIAR = obj.DES_AUXILIAR;
          this.modelo.COD_AUXILIAR = obj.COD_AUXILIAR;
      } 
      this.get();   
      this.getSucess();
      this.getrecjected();
      this.conn.onopen = (e) => {
       console.log("WebSocket Mi : " + e);
     };
     this.conn.onmessage = (e) => {
        this.rcv(e.data);
         let recibe =   JSON.parse(e.data); 
      //console.log(e.data);
         let es =  recibe.estado_pedido;
         if (es=="2") {  
          this.check();
         }   
     };
  },
  computed: {
   ...mapState(["url_base",'url_izipay','url_socket']),
    nombreDia: function () {
      return moment(this.fecha_pedido).format("dddd");
    },
  },
  methods: {   
    check(){
      this.$q.notify({
          position: "top",
          type: 'positive',
          message: 'Tu Pedido ya esta Listo :)'             
        });
    },
    get(){
      let tipo="mio";
      let url="/Controller/PedidoController.php?tipo="+tipo+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;
      this.$axios
        .get(this.url_base+url)
        .then((response) => {
       //   console.log(response)
          this.itemCocina = response.data;         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },    
    getrecjected(){
        let tipo="rejected";
      let url="/Controller/PedidoController.php?tipo="+tipo+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;
      this.$axios
        .get(this.url_base+url)
        .then((response) => {
          //console.log(response);
          this.itemRejected = response.data;         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    getSucess(){
      let tipo="success";
      let url="/Controller/PedidoController.php?tipo="+tipo+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;
      this.$axios
        .get(this.url_base+url)
        .then((response) => {     
         // console.log(response)  
          this.itemSucess = response.data;         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
      UpdateStart(obj){
   //  console.log(obj);
      let me = this;
      let url ="/Controller/PedidoController.php";         
      let data = obj;
      this.$axios({
        method: "PUT",
        url: me.url_base+url,
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
    },
    rcv(str) {
       this.get();
       this.getrecjected();
       this.getSucess();
    },
  },
});
</script>

<style >
.q-stepper__step-content {
  display: none !important;
}
</style>
