<template>
  <q-page class="q-pa-sm">
    <label for="">Reservas</label>
    <br /><br />
    <div class="row q-col-gutter-sm">     
      <div
        class="col-md-6 col-lg-6 col-sm-12 col-xs-12"
        v-for="(item, index) in itemTomorrow"
        :key="item.id_pedido"
      >
        <q-card class="colorborde">
          <q-item>
            <q-item-section top>
              <q-item-label lines="1">
                <span
                  class="cursor-pointer   text-body2 text-weight-bold text-primary text-uppercase"
                >
                  {{ nameDia[index] }}</span
                >
                <span class="text-weight-medium">
                  - {{ formarPeru[index] }}</span
                >
              </q-item-label>
            </q-item-section>
   <q-item-label lines="1">
                <span                 class="cursor-pointer   text-body2 text-weight-bold text-primary text-uppercase"
                >
                  {{ item.hora_pedido }}</span
                >
             
              </q-item-label>
            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn size="12px" flat dense round icon="more_vert" />
              </div>
            </q-item-section>
          </q-item>
  <q-separator></q-separator>
          <q-card-section>
            <table-tomorrow class="q-mt-lg" :data="item.detalle">
            </table-tomorrow>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>



<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";
import { mapState } from "vuex";

import moment from "moment";
import "moment/locale/es";

export default defineComponent({
  name: "Tables",
  components: {
    TableTomorrow: defineAsyncComponent(() =>
      import("components/tables/TableTomorrow")
    ),
  },
  setup() {
    let visiblemodal = ref(false);
    let fecha_actual = ref(moment(new Date()).format("YYYY/MM/DD"));
    return {
      visiblemodal,
      itemTomorrow: ref([]),
      Estado: ref(true),
      fecha_actual,
    };
  },
  created() {
    //  let existe =  this.$q.sessionStorage.isEmpty()
    let existe2 = this.$q.sessionStorage.has("Qsesion");  
    if (!existe2) {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
   ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2"]),
    nombreDia: function () {
      return moment(new Date(this.fecha_actual)).format("dddd");
    },
    nameDia: function () {
      return this.itemTomorrow.map(function (item) {
          let array =item.fecha_pedido.split('-');
          let dia =array[2];
          let mes =array[1];
          let anio=array[0];
          let fecha1 =anio+'/'+mes+'/'+dia;
        return moment(new Date(fecha1)).format("dddd");
      });
    },
    formarPeru() { 
      return this.itemTomorrow.map(function (item) {
          let array =item.fecha_pedido.split('-');
          let dia =array[2];
          let mes =array[1];
          let anio=array[0];
          let fecha1 =anio+'/'+mes+'/'+dia;
        return moment(new Date(fecha1)).format("DD/MM/YYYY");
      });
    },
  },
  mounted() {
    this.Get();
  },
  methods: {
    AddCategoria() {
      this.visiblemodal = true;
    },
    CerrarModal() {
      this.visiblemodal = false;
    },
    Validate() {
      if (this.modelo.nombre_categoria == "") {
        this.$q
          .dialog({
            dark: true,
            title: "Ups",
            message: "Falta Llenar campos",
          })
          .onOk(() => {})
          .onCancel(() => {})
          .onDismiss(() => {});
      } else {
        this.Store();
      }
    },
    EditarLogo(item) {
      this.modelo.logo = item;
    },

    Get() {
      let tipo = "tomorrow";
       let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;  
      let url = "/Controller/PedidoController.php?tipo=" + tipo;
      this.$axios
        .get(url_b + url)
        .then((response) => {
          ///console.log(response)
          this.itemTomorrow = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    Existe() {
      this.$q
        .dialog({
          dark: true,
          title: "Ups",
          message: "Nombre de categoria ya existe",
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
});
</script>

<style>
.colorborde {
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>
