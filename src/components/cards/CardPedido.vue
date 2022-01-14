<template>
  <q-card class="my-card colorborde">
    <q-item>
      <q-item-section top>
        <q-item-label lines="1">
          <q-btn
            v-if="estado_pedido == 0"
            color="red"
            label="Nuevo"
            @click="Editar(1)"
          >
            <q-spinner-rings size="1.5em" />
          </q-btn>
          <q-btn
            v-else-if="estado_pedido == 1"
            style="background: goldenrod; color: white"
            label="En Proceso  "
            @click="Editar(2)"
          >
            <q-spinner-gears size="1.5em" />
          </q-btn>

          <q-btn
            v-else-if="estado_pedido == 2"
            color="secondary"
            label="Listo"
            @click="Editar(3)"
          >
            <q-spinner-hourglass color="primary" size="1.5em"
          /></q-btn>
        </q-item-label>
        <br />
        <q-item-label lines="1">
          <span class="text-weight-medium"
            >{{ area }}- Piso {{ piso_especialidad }}</span
          >
          <!-- <span class="text-grey-8"> - GitHub repository</span> -->
        </q-item-label>

        <q-item-label
          lines="1"
          class="text-weight-bold text-primary text-uppercase"
        >
          <span class="cursor-pointer">{{ des_auxiliar }}</span>
        </q-item-label>
        <q-item-label caption lines="1">
          <span class="text-bold">
            {{ diaEntrega }} - {{ fecha_pedido }} / a las:
            {{ hora_pedido }}</span
          >
        </q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="delete"
            @click="Editar(4)"
          />
        </div>
      </q-item-section>
    </q-item>
    <q-separator></q-separator>
    <q-list>
      <q-item clickable v-for="item in detalle" :key="item.id_pedido_detalle">
        <q-item-section avatar>
          <q-icon color="primary" :name="item.logo" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.nombre_producto }}</q-item-label>
          <q-item-label caption lines="2">{{ item.descripcion }}</q-item-label>
          <q-item-label caption lines="1">          Cant.: {{ item.cantidad_pedido }} x S/
            <span class="text-bold">
              {{ item.precio_venta }}</span></q-item-label>
         <q-item-label caption lines="">{{ item.fecha_pedido }}</q-item-label>

        </q-item-section>
      </q-item>
    </q-list>
    <q-card-section class="col-5 flex flex-left text-bold">
      <div>Total: S/ {{ total }}</div>
    </q-card-section>
  </q-card>
</template>
<script>
import moment from "moment";
import "moment/locale/es";
export default {
  props: [
    "id_pedido",
    "des_auxiliar",
    "piso_especialidad",
    "area",
    "detalle",
    "color",
    "fecha_pedido",
    "total",
    "hora_pedido",
    "cod_auxiliar",
    "estado_pedido",
    
  ],
  data() {
    return {
      step: 0,
      done1: false,
      done2: false,
      done3: false,
      tipoEnvio: "",
      fecha_actual: moment(new Date()).format("YYYY-MM-DD"),
      fecha_actual2: moment(new Date()).format("DD-MM-YYYY"),
    };
  },
  computed: {
    diaEntrega: function () {
      let fechas = this.fecha_pedido.split("-");
      let dia = fechas[0];
      let mes = fechas[1];
      let anio = fechas[2];
      let fecha_sql = anio + "-" + mes + "-" + dia;
      let nombre_dia_hoy = moment(new Date(this.fecha_actual)).format("dddd");
      let nombre_dia_envio = moment(fecha_sql).format("dddd");
      if (nombre_dia_hoy == nombre_dia_envio) {
        this.tipoEnvio = "Hoy ";
      } else {
        this.tipoEnvio = "Para ";
      }
      return moment(fecha_sql).format("dddd");
    },
  },
  methods: {
    Editar2(step) {
      console.log(this.estado_pedido);
      let estado = this.estado_pedido;
      if (estado == 0) {
      } else if (estado == 1) {
      }
    },
    Editar(step) {
      if (this.fecha_pedido == this.fecha_actual2) {
        if (step == 4 && this.estado_pedido > 0) {
          this.$q
            .dialog({
              dark: true,
              title: "Ups",
              message: "No Puedes Efectuar esta Accion",
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
        } else {
          // console.log(this.cod_auxiliar);
          if (step == 4) {
            //poner aqui ocpcion de pregunta ?
          } else {
            const datas = {
              estado_pedido: step,
              id_pedido: this.id_pedido,
              lista: [],
              tipo: "Update",
              cod_auxiliar: this.cod_auxiliar,
            };
            this.$emit("update", datas);
            this.$q.notify({
              message: "Enviado estado",
              color: "accent",
              position: "top",
            });
          }
        }
      } else {
        this.$q.dialog({
          dark: true,
          title: "Ups",
          message: "Este pedido no corresponde a la fecha de Hoy !!",
        });
      }
    },
  },
};
</script>

<style>
.q-stepper__step-content {
  display: none !important;
}

.q-stepper__tab--active,
.q-stepper__tab--done {
  color: #b71408;
}

.colorborde {
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>

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