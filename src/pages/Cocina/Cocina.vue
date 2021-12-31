<template>
  <q-page class="q-pa-sm">
    <h5>COCINA SOCKET</h5>

    <q-tabs
      v-model="tab"
      dense
      align="justify"
      class="bg-primary text-white shadow-2"
      :breakpoint="0"
    >
      <q-tab name="mails" icon="alarm" label="Proceso" />
      <q-tab name="alarms" icon="fas fa-tasks" label="Enviado" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails">

        <div class="row q-col-gutter-sm">
          <div
            class="col-md-3 col-lg-4 col-sm-12 col-xs-12"
            v-for="item in itemCocina"
            :key="item.id_pedido"
          >
            <card-pedido
              :id_pedido="item.id_pedido"
              :des_auxiliar="item.des_auxiliar"
              :piso_especialidad="item.piso_especialidad"
              :area="item.area"
              :color="item.color"
              :detalle="item.detalle"
              :estado="item.estado_pedido"
              v-on:update="modificar"
            ></card-pedido>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="alarms">
       <div class="row q-col-gutter-sm">
          <div
            class="col-md-3 col-lg-4 col-sm-12 col-xs-12"
            v-for="item in itemTerminado"
            :key="item.id_pedido"
          >
            <card-terminado
              :id_pedido="item.id_pedido"
              :des_auxiliar="item.des_auxiliar"
              :piso_especialidad="item.piso_especialidad"
              :area="item.area"
              :color="item.color"
              :detalle="item.detalle"
              :estado="item.estado_pedido"             
            ></card-terminado>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <br />
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import CardPedido from "components/cards/CardPedido.vue";
import CardTerminado from "components/cards/CardTerminado.vue";


import useSound from "vue-use-sound";
import buttonSfx from "../../assets/timbre.mp3";
import { ref } from "vue";

export default {
  name: "Cocina",
  components: {
    CardPedido,
    CardTerminado
  },
  setup() {
    let itemCocina = ref([]);
    let itemTerminado = ref([]);
    const [play] = useSound(buttonSfx);
    return {
      play,
      msg: "Test  Meesage",
      name: "jkun",
      conn: new WebSocket("ws://localhost:8090"),
      msgA: [],
      itemCocina,
      itemTerminado,
      type: "All",
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 4,

      tab: ref("mails"),
    };
  },
  created() {},
  mounted() {
    this.get();
    this.getTerminados();
    this.conn.onopen = (e) => {
      console.log("conectado : " + e);
    };
    this.conn.onmessage = (e) => {
      this.rcv(e.data);
      this.Sonido();
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
      let tipo="nuevo";
      this.$axios
        .get("http://localhost/ApiCafeteria/Controller/PedidoController.php?tipo="+tipo)
        .then((response) => {
          this.itemCocina = response.data;
          //  console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    getTerminados() {
      let tipo="terminado";      
      this.$axios
        .get("http://localhost/ApiCafeteria/Controller/PedidoController.php?tipo="+tipo)
        .then((response) => {
          this.itemTerminado = response.data;
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
    Sonido() {
      this.play();
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
    modificar(datos) {
      let dato = datos.split("-");
      let step = dato[0];
      let id_pedido = dato[1];
      let modelo = {
        estado_pedido: step,
        id_pedido: id_pedido,
      };
      let me = this;

      let url = "http://localhost/ApiCafeteria/Controller/PedidoController.php";
      const data = modelo;
      this.$axios({
        method: "PUT",
        url: url,
        data: data,
      })
        .then(function (response) {
          // console.log(response);
          let result = response.data.resultado;
          if (result == "Registrado") {
            me.get();
            me.$q.notify({
              message: "Modificado!",
              color: "accent",
              position: "top",
            });
          } else {
            ///me.Existe();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>
