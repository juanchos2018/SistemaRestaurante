<template>
  <q-page class="q-pa-sm">

    <q-tabs v-model="tab" dense align="justify" class="bg-primary text-white shadow-2" :breakpoint="0">
      <q-tab name="mails" icon="alarm" label="Proceso" />
      <q-tab name="alarms" icon="fas fa-tasks" label="Enviado" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails">

        <q-table grid :card-container-class="cardContainerClass" title="Pedido" :rows="itemCocina" :columns="columns" row-key="name" :filter="filter" hide-header v-model:pagination="pagination" :rows-per-page-options="rowsPerPageOptions">
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <card-pedido :id_pedido="props.row.id_pedido" :des_auxiliar="props.row.des_auxiliar" :piso_especialidad="props.row.piso_especialidad" :area="props.row.area" :color="props.row.color" :detalle="props.row.detalle" :estado="props.row.estado_pedido" v-on:update="modificar"></card-pedido>
            </div>
          </template>
        </q-table>

        <!-- <div
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
          </div> -->

      </q-tab-panel>

      <q-tab-panel name="alarms">
        <div class="row q-col-gutter-sm">
          <div class="col-md-3 col-lg-4 col-sm-12 col-xs-12" v-for="item in itemTerminado" :key="item.id_pedido">
            <card-terminado :id_pedido="item.id_pedido" :des_auxiliar="item.des_auxiliar" :piso_especialidad="item.piso_especialidad" :area="item.area" :color="item.color" :detalle="item.detalle" :estado="item.estado_pedido"></card-terminado>
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
import { ref, watch, computed } from "vue";
import { mapState } from "vuex";

export default {
  name: "Cocina",
  components: {
    CardPedido,
    CardTerminado,
  },
  setup() {
    const $q = useQuasar();
    let itemCocina = ref([]);
    let itemTerminado = ref([]);
    const [play] = useSound(buttonSfx);
    const otherValue = $q.sessionStorage.getItem("Qsesion");
    function getItemsPerPage() {
      if ($q.screen.lt.sm) {
        return 3;
      }
      if ($q.screen.lt.md) {
        return 6;
      }
      return 9;
    }
    const filter = ref("");
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage(),
    });
    watch(
      () => $q.screen.name,
      () => {
        pagination.value.rowsPerPage = getItemsPerPage();
      }
    );
    return {
      otherValue,
      $q,
      play,
      msg: "Test  Meesage",
      name: "jkun",
      conn: new WebSocket("ws://localhost:8090"),
      msgA: [],
      filter,
      pagination,
      itemCocina,
      itemTerminado,
      type: "All",
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 4,
      tab: ref("mails"),
      cardContainerClass: computed(() => {
        return $q.screen.gt.xs
          ? "grid-masonry grid-masonry--" + ($q.screen.gt.sm ? "3" : "2")
          : null;
      }),
      rowsPerPageOptions: computed(() => {
        return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
      }),
      columns: [
        { name: "des_auxiliar", label: "des_auxiliar", field: "des_auxiliar" },
        {
          name: "piso_especialidad",
          label: "Calories (g)",
          field: "piso_especialidad",
        },
      ],
    };
  },
  created() {
    let existe = this.$q.sessionStorage.has("Qsesion");
    if (!existe) {
      this.$router.push({ path: "/" });
    }
  },
  mounted() {
    this.get();
    this.getTerminados();
    this.conn.onopen = (e) => {
      console.log("conectado Co : " + e);
    };
    this.conn.onmessage = (e) => {
     // console.log(e.data)     
      let jsonre =   JSON.parse(e.data);  
      //console.log(aa.tipo);     
      if (jsonre.tipo=="Store") {
         this.rcv(e.data);
         this.Sonido();
         this.noti2();
         this.Sonido();
      }

     
    };
  },
  computed: {
    ...mapState(["url_base"]),
    getData2() {
      return this.getData().slice(
        (this.page - 1) * this.totalPages,
        (this.page - 1) * this.totalPages + this.totalPages
      );
    },
  },
  methods: {
    get() {
      let tipo = "nuevo";
      let url = "/Controller/PedidoController.php?tipo=" + tipo;
      this.$axios
        .get(this.url_base + url)
        .then((response) => {
          this.itemCocina = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    getTerminados() {
      let tipo = "terminado";
      let url = "/Controller/PedidoController.php?tipo=" + tipo;
      this.$axios
        .get(this.url_base + url)
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
        tipo:'Update'
      };
    
      const data = modelo;
      this.conn.send(JSON.stringify(data));

      // let me = this;
      // let url = "/Controller/PedidoController.php";
      // this.$axios({
      //   method: "PUT",
      //   url: me.url_base + url,
      //   data: data,
      // })
      //   .then(function (response) {
      //     // console.log(response);
      //     let result = response.data.resultado;
      //     if (result == "Registrado") {
      //       me.get();
      //       me.getTerminados();
      //       me.$q.notify({
      //         message: "Modificado!",
      //         color: "accent",
      //         position: "top",
      //       });
      //     } else {            
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
  },
};
</script>

<style lang="sass">
.grid-masonry
  flex-direction: column
  height: 700px

  &--2
    > div
      &:nth-child(2n + 1)
        order: 1
      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3
    > div
      &:nth-child(3n + 1)
        order: 1
      &:nth-child(3n + 2)
        order: 2
      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
</style>
