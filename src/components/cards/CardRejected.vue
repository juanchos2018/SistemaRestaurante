<template>
  <q-card class="my-card colorborde">
    <q-item>
      <q-item-section>
        <q-item-label>{{ nombreDia }} - {{ fecha_pedido }}</q-item-label>
        <q-item-label caption>
          {{ hora_pedido }}
        </q-item-label>
      </q-item-section>
        <q-item-section side top>
             RECHAZADO
        </q-item-section>
    </q-item>
    <q-list bordered padding>
      <q-item v-for="item in detalle" :key="item.id_pedido_detalle">
        <q-item-section avatar>
          <q-icon color="primary" :name="item.logo" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.nombre_producto }}</q-item-label>
          <q-item-label caption lines="2">{{ item.descripcion }}</q-item-label>
           <q-item-label caption lines="1"> Cant.: {{ item.cantidad_pedido }} x <span class="text-green text-bold"> {{item.precio_venta}}</span></q-item-label>
             <q-item-label caption lines="">con : {{ item.entrada }}</q-item-label>
        </q-item-section>
        <q-item-section side top>         
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-section class="col-5 flex flex-left text-green text-bold">
      <div>Total: S/ {{ total }}</div>
    </q-card-section>
  </q-card>
</template>
<script>
import moment from "moment";
import "moment/locale/es";
export default {
  name: "card-rejected",
  props: [
    "id_pedido",
    "des_auxiliar",
    "piso_especialidad",
    "area",
    "detalle",
    "color",
    "estado_pedido",
    "total",
    "fecha_pedido",
    "hora_pedido",
  ],
  data() {
    return {
      step: 0,
      stars: 0,
      moment,
    };
  },
  computed: {
    nombreDia: function () {
  
         return moment(new Date(this.fecha_pedido)).format("dddd");
    },
  },
  methods: {
    
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

.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>