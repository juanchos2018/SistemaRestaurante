<template>
  <q-page class="q-pa-xs">
    <q-tabs
      v-model="tab"
      dense
      align="justify"
      class="bg-red-1 text-white shadow-2"
      :breakpoint="0"
    >
      <q-tab name="mails" icon="alarm" label="Nuevo" />
      <q-tab name="alarms" icon="fas fa-tasks" label="Enviado" />
      <q-tab
        name="reject"
        icon="fas fa-exclamation-triangle"
        label="Anulados"
      />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails">
        <!-- <p>{{itemCocina}}</p> -->
        <q-table
          grid
          :card-container-class="cardContainerClass"
          title="Pedido"
          :rows="itemCocina"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
          v-model:pagination="pagination"
          :rows-per-page-options="rowsPerPageOptions"
        >
          <template v-slot:top-right>          
            <div>                   
             <q-btn-dropdown color="red" :label="nombreDia+' - '+date" dropdown-icon="change_history"     class="float-right"  >
               <q-date
                  v-model="date"     
                      :events="events"
                       event-color="red"
                  @update:model-value="ChangeDate($event)"
                />
              </q-btn-dropdown>  
          </div>       
          </template>
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <card-pedido
                :id_pedido="props.row.id_pedido"
                :des_auxiliar="props.row.des_auxiliar"
                :cod_auxiliar="props.row.cod_auxiliar"
                :piso_especialidad="props.row.piso_especialidad"
                :area="props.row.area"
                :color="props.row.color"
                :detalle="props.row.detalle"
                :fecha_pedido="props.row.fecha_pedido"
                :hora_pedido="props.row.hora_pedido"
                :estado_pedido="props.row.estado_pedido"
                :total="props.row.totalpedido"
                v-on:update="modificar"
              ></card-pedido>
            </div>
          </template>
        </q-table>
      </q-tab-panel>

      <q-tab-panel name="alarms">
        <q-toolbar class="bg-secondary text-white q-my-md shadow-2">
          <div class="text-h5 text-white text-bold">
             {{ nombreDia }} - {{ fecha_actual }}
          </div>
          <q-space />
          <div class="text-h5 text-white text-bold">S/ {{ SumTotal }}</div>
        </q-toolbar>
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
              :totalpedido="item.totalpedido"
              :detalle="item.detalle"
              :estado="item.estado_pedido"
            ></card-terminado>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="reject">
        <div class="row q-col-gutter-sm">
          <div
            class="col-md-3 col-lg-4 col-sm-12 col-xs-12"
            v-for="item in itemRejected"
            :key="item.id_pedido"
          >
            <card-anulado
              :id_pedido="item.id_pedido"
              :des_auxiliar="item.des_auxiliar"
              :piso_especialidad="item.piso_especialidad"
              :area="item.area"
              :color="item.color"
              :totalpedido="item.totalpedido"
              :detalle="item.detalle"
              :estado="item.estado_pedido"
            ></card-anulado>
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
import CardAnulado from "components/cards/CardAnulado.vue";

import useSound from "vue-use-sound";
import buttonSfx from "../../assets/timbre.mp3";
import { ref, watch, computed } from "vue";
import { mapState } from "vuex";
import moment from "moment";
import "moment/locale/es";
export default {
  name: "Cocina",
  components: {
    CardPedido,
    CardTerminado,
    CardAnulado,
  },
  setup() {
    const $q = useQuasar();
    let itemCocina = ref([]);
    let itemTerminado = ref([]);
    let itemRejected = ref([]);
    const [play] = useSound(buttonSfx);
    const otherValue = $q.sessionStorage.getItem("Qsesion");
    const  fecha_actual= ref(moment(new Date()).format("YYYY/MM/DD"));
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
      nombreDia:'',    
      events: [],
      date: ref(moment(new Date()).local().format("YYYY/MM/DD")), 
      fecha_actual,
      play,
      con: null,
      msg: "Test  Meesage",
      name: "jkun",
      msgA: [],
      filter,
      pagination,
      itemCocina,
      itemTerminado,
      itemRejected,
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
          label: "Area",
          field: "piso_especialidad",
        },
      ],
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
    this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd');
    this.conn = new WebSocket(this.url_socket);
    this.get();
    this.getCalendar();
    this.getTerminados();
    this.getRjecteds();
    this.conn.onopen = (e) => {
      console.log("conectado Co : " + e);
    };
    this.conn.onmessage = (e) => {
      // console.log(e.data)
      let jsonre = JSON.parse(e.data);
      //console.log(aa.tipo);
      if (jsonre.tipo == "Store") {
        if (this.esCocinero) {
             this.Sonido();
             this.noti2();
             this.Sonido();
        }
       
        this.rcv(e.data);
      } else if (jsonre.tipo == "Update") {
        this.get();
        this.getTerminados();
        this.getRjecteds();
      }
    };
  },
  computed: {
    ...mapState(["url_base", "url_izipay", "url_socket"]),
    getData2() {
      return this.getData().slice(
        (this.page - 1) * this.totalPages,
        (this.page - 1) * this.totalPages + this.totalPages
      );
    },
    SumTotal() {
      var result = this.itemTerminado.reduce(function (acc, obj) {
        return acc + parseFloat(obj.totalpedido);
      }, 0);
      return result.toFixed(2);
    },
    nombreDiayano: function () {
      return moment(this.fecha_actual).format("dddd");
    },
    esCocinero(){
       let existe = this.$q.sessionStorage.has("Qsesion");
        if (existe==true) {
            let datos = JSON.parse(localStorage.getItem('Qsesion'));
            return    datos.AREA=='COCINA';
        }      
    },
  },
  methods: {
    get() {
      let tipo = "nuevo";
      let url = "/Controller/PedidoController.php?tipo=" + tipo+"&fecha="+this.fecha_actual;
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
    getCalendar() {
      let tipo = "calendar";
      let url = "/Controller/PedidoController.php?tipo=" + tipo;
      this.$axios
        .get(this.url_base + url)
        .then((response) => {      
        //  console.log(response);
          this.events = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    ChangeDate(e){
      let tipo = "nuevo";   
      if (e==null) {       
       this.date=this.fecha_actual
       this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd');
       this.get();
      }else{           
        this.nombreDia=moment(new Date(e)).format('dddd');         
        let url = "/Controller/PedidoController.php?tipo=" + tipo+"&fecha="+e;
      //  console.log(url);
        this.$axios
        .get(this.url_base + url)
        .then((response) => {        
          ///console.log(response);
          this.itemCocina = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});                 
      }
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
    getRjecteds() {
      let tipo = "rejectedcock";
      let url = "/Controller/PedidoController.php?tipo=" + tipo;
      this.$axios
        .get(this.url_base + url)
        .then((response) => {
          this.itemRejected = response.data;
          //  console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    rcv(str) {
      this.get();
      this.getRjecteds();
    },
    noti2(use) {
      this.$q.notify({
        group: false,
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
      let indice = this.itemCocina.findIndex(
        (x) => x.id_pedido == datos.id_pedido
      );
      if (datos.estado_pedido == 4) {
        const array = this.itemCocina[indice].detalle.filter(function (
          element
        ) {
          return element.id_pedido == datos.id_pedido;
        });
        array.forEach((element) => {
          datos.lista.push({
            id_producto: element.id_producto,
            cantidad_pedido: element.cantidad_pedido,
            usastock: element.usastock,
          });
        });
      }
      // console.log(datos);
      this.conn.send(JSON.stringify(datos));
    },
  },
};
</script>

<style lang="sass">
</style>
