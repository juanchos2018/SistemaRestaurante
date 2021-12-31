<template>
  <q-page class="q-pa-sm">
    <h5>COCINA SOCKET </h5>          
    <div class="row q-col-gutter-sm">
      <div class="col-md-3 col-lg-4 col-sm-12 col-xs-12" v-for="item in itemCocina" :key="item.id_pedido">
        <card-pedido :des_auxiliar="item.des_auxiliar" :piso_especialidad="item.piso_especialidad" :detalle="item.detalle" ></card-pedido>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import CardPedido from "components/cards/CardPedido.vue";

import useSound from 'vue-use-sound'
import buttonSfx from '../../assets/timbre.mp3'
import { ref } from "vue";
export default {
  name: "Cocina",
  components: {
    CardPedido,
  },
  setup() {
    let itemCocina=ref([])
    const [play] = useSound(buttonSfx)
      const enviar=()=>{

      }
     return {
      play,
      msg: "Test  Meesage",
      name: "jkun",
      conn: new WebSocket("ws://localhost:8090"),
      msgA: [],
      itemCocina,     
      type: "All",
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 4,
    };
  },
  created() {},
  mounted() {
    this.get();
    this.conn.onopen = (e) => {
      console.log("conectado : "+e);
    };
    this.conn.onmessage = (e) => {
      this.rcv(e.data);
      this.noti2();
      this.Sonido();
    };
  },
  computed: {
    getData2() {
      return this.getData().slice(
        (this.page - 1) * this.totalPages,
        (this.page - 1) * this.totalPages + this.totalPages
      );
    },
  },
  methods: {
    get() {
      this.$axios
        .get("http://localhost/ApiCafeteria/Controller/PedidoController.php")
        .then((response) => {
          this.itemCocina = response.data;
        //  console.log(response.data);
      
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },

    rcv(str) {
      this.get();
    },
    noti2(use) {
      this.$q.notify({
        message: "Tienes un Nuevo Pedido !",
        color: "negative",
        position: "top-right",
      });
    },
    Sonido(){
      this.play()
    },
    getData() {
      if (this.type == "All") {
        return this.cards_data;
      } else {
        let self = this;
        return this.cards_data.filter(function (item) {
          return item.type.toLowerCase() == self.type.toLowerCase();
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
