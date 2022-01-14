<template>
  <q-page class="q-pa-sm">
    <q-toolbar class="bg-red-1 q-my-md shadow-2">
      <div class="text-h5 text-bold">-</div>
      <q-space />
      <div class="text-h5 text-bold">S/ {{ SumTotal }}aa</div>
    </q-toolbar>


      <!-- <q-radio name="shape" v-model="shape" val="Todos" label="Todos"  />
      <q-radio name="shape" v-model="shape" val="Nuevo" label="Nuevo" />
      <q-radio name="shape" v-model="shape" val="Entregado" label="Entregado" />
      <q-radio name="shape" v-model="shape" val="Rechazado" label="Rechazado" /> -->

    <q-btn-dropdown
      color="red"
      :label="nombreDia + ' - ' + date"
      dropdown-icon="change_history"
      class="float-right"
    >
      <q-date
        v-model="date"
        mask="DD-MM-YYYY"
        event-color="red"
        @update:model-value="ChangeDate($event)"
      />
    </q-btn-dropdown>

    <br />
    <br />
        <br />
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
import { defineComponent, ref, reactive } from "vue";
import CardAllOrder from "components/cards/CardAllOrder.vue";

import { mapState } from "vuex";
import moment from "moment";
import "moment/locale/es";

export default defineComponent({
  name: "PedidosAll",
  components: { CardAllOrder },
  setup() {
    let itemallorder = ref([]);
    const modelo = reactive({ COD_AUXILIAR: "", DES_AUXILIAR: "" });
    const fecha_actual = ref(moment(new Date()).format("YYYY/MM/DD"));
    let nombreDia = ref("");
    return {
      shape: ref('Todos'),
      itemallorder,
      step: ref(0),
      date: ref(moment(new Date()).local().format("DD-MM-YYYY")),
      modelo,
      nombreDia,
      fecha_actual,
      moment,
    };
  },
  created() {
    let existe = this.$q.sessionStorage.has("Qsesion");
    if (existe == false) {
      this.$router.push({ path: "/" });
    }
  },
  mounted() {
    // let  conn= new WebSocket(this.url_socket);
    this.nombreDia = moment(new Date(this.fecha_actual)).format("dddd");
    let existe = this.$q.sessionStorage.has("Qsesion");
    if (existe == true) {
      let obj = this.$q.sessionStorage.getItem("Qsesion");
      this.modelo.DES_AUXILIAR = obj.DES_AUXILIAR;
      this.modelo.COD_AUXILIAR = obj.COD_AUXILIAR;
    }
    this.get();
  },
  computed: {
    ...mapState(["url_base", "url_izipay", "url_socket"]),
    SumTotal() {
      var result = this.itemallorder.reduce(function (acc, obj) {
        return acc + parseFloat(obj.totalpedido);
      }, 0);
      return result.toFixed(2);
    },
  },
  methods: {
    get() {
      let tipo = "getallorder";
   //   this.fecha_actual
      let url = "/Controller/PedidoController.php?tipo=" + tipo;
      this.$axios
        .get(this.url_base + url)
        .then((response) => {
            console.log(response)
          this.itemallorder = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    // search(event) {
    //   let fecha = event;
    //   let tipo = "fecha";
    //   let url =
    //     "/Controller/PedidoController.php?tipo=" + tipo + "&fecha=" + fecha;
    //   this.$axios
    //     .get(this.url_base + url)
    //     .then((response) => {
    //       console.log(response);
    //       this.itemallorder = response.data;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     })
    //     .finally(() => {});
    // },
    ChangeDate(e) {
      if (e == null) {
        this.nombreDia = moment(new Date(this.fecha_actual)).format("dddd");
          let array =this.fecha_actual.split('/');
          let dia =array[2];
          let mes =array[1];
          let anio=array[0];
          let fecha1 =dia+'-'+mes+'-'+anio;
          let fechaSql=anio+'-'+mes+'-'+dia;
        //DD-MM-YYYY
         this.date=fecha1      
         this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd');
        this.get();

      } else {
        let array = e.split("-");
        let dia = array[0];
        let mes = array[1];
        let anio = array[2];
        let fecha1 = anio + "/" + mes + "/" + dia;
        let fechaSql = anio + "-" + mes + "-" + dia;
        this.nombreDia = moment(new Date(fecha1)).format("dddd");
        let tipo = "fecha";
          let url =  "/Controller/PedidoController.php?tipo=" + tipo + "&fecha=" + fechaSql;
          this.$axios
            .get(this.url_base + url)
            .then((response) => {
              //console.log(response);
              this.itemallorder = response.data;
            })
            .catch(function (error) {
              console.log(error);
            })
            .finally(() => {});


      }
    },
  },
});
</script>

<style >
.q-stepper__step-content {
  display: none !important;
}
</style>
