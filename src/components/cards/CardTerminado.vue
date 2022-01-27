<template>
  <q-card  class="my-card colorborde">  
     <q-item>
      <q-item-section>
        <q-item-label lines="1">
          <span class="text-weight-medium"
            >{{ area }}- Piso {{ piso_especialidad }}</span>       
        </q-item-label>
        <q-item-label
          lines="1"
          class="text-weight-bold text-primary text-uppercase"
        >
          <span class="cursor-pointer">{{ des_auxiliar }}</span>
        </q-item-label>
        <q-item-label caption lines="1">
          <span class="text-bold">
            {{ diaEntrega }} - {{ fecha_pedido }} / a :
            {{ hora_pedido }}</span
          >
        </q-item-label>
      </q-item-section>
        <q-item-section side top class=" text-green-9 text-bold">
         ENTREGADO
        </q-item-section>    
    </q-item>
    <q-separator></q-separator>
     <q-list bordered padding>
      <q-item v-for="item in detalle" :key="item.id_pedido_detalle">
        <q-item-section avatar>
          <q-icon color="primary" :name="item.logo" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.nombre_producto }}</q-item-label>
          <q-item-label caption lines="2">{{ item.descripcion }}</q-item-label>
          <q-item-label caption lines="1"> Cant.: {{ item.cantidad_pedido }}</q-item-label>
          <q-item-label caption lines="">con : {{ item.entrada }}</q-item-label>
        </q-item-section>

        <q-item-section side top>       
          <q-rating
            size="18px"
            v-model="item.estrellas"
            :max="5"
            color="yellow"
            readonly
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-section class="col-5 flex flex-left text-bold">
      <div>Total: S/ {{ totalpedido }}</div>
    </q-card-section>   
  </q-card>
</template>
<script>
import moment from "moment";
import "moment/locale/es";
export default {
  props: ["id_pedido","des_auxiliar", "piso_especialidad","area", "detalle","color","estado","totalpedido", "hora_pedido",  "fecha_pedido"],
  data(){
    return{   
      step: 0,
      done1 : false,
      done2 : false,
      done3 :false,
   
    }
  },
  methods: {
  
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
};
</script>

<style>
.q-stepper__step-content {
  display:none !important
}

.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>