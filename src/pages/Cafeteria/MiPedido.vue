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
              :estado="item.estado_pedido"
            
            ></card-mi-pedido>
          </div>
        </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
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
    return {
      step: ref(0),
      done1,
      done2,
      done3,
      itemCocina
    };
  },
   mounted() {
    this.get();    
  },
  computed: {
    ...mapState(["url_base"]),  
  },
  methods: {
    get(){
      let tipo="nuevo";
      let url="/Controller/PedidoController.php?tipo="+tipo;
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
    alerta(name) {
      alert(name);
    },
  },
});
</script>

<style >
.q-stepper__step-content {
  display: none !important;
}
</style>
