<template>
  <q-page class="q-pa-sm">
<label for="">Mis Pedidos</label>
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
            
            ></card-mi-pedido>
          </div>
        </div>
  </q-page>
</template>

<script>
import { defineComponent, ref,reactive } from "vue";
import CardMiPedido from "components/cards/CardMiPedidos.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "MiPedido",
  components: {CardMiPedido},
  setup() {
    const done1 = ref(false);
    const done2 = ref(false);
    const done3 = ref(false);
    let itemCocina = ref([]);
    const modelo = reactive({ COD_AUXILIAR: "045530", DES_AUXILIAR: "" });
    return {
      conn: new WebSocket("ws://localhost:8090"),
      step: ref(0),
      done1,
      done2,
      done3,
      itemCocina,
      modelo
    };
   },
   created(){ 
      let existe = this.$q.sessionStorage.has("Qsesion");
      if (!existe) {
         this.$router.push({ path: "/" });
      }
   },
   mounted() {
    let obj = this.$q.sessionStorage.getItem("Qsesion");
    this.modelo.DES_AUXILIAR = obj.DES_AUXILIAR;
    this.modelo.COD_AUXILIAR = obj.COD_AUXILIAR;

    this.get();   
      this.conn.onopen = (e) => {
       console.log("conectado Mi : " + e);
    };
    this.conn.onmessage = (e) => {
      this.rcv(e.data);
      console.log("scoket");
    
    };
  },
  computed: {
    ...mapState(["url_base"]),  
  },
  methods: {   
    get(){
      let tipo="mio";
      let url="/Controller/PedidoController.php?tipo="+tipo+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;
      this.$axios
        .get(this.url_base+url)
        .then((response) => {
          this.itemCocina = response.data;         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },    
    rcv(str) {
       this.get();
    },
  },
});
</script>

<style >
.q-stepper__step-content {
  display: none !important;
}
</style>
