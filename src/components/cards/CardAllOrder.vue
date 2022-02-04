<template>
  <q-card  class="my-card colorborde">  
     <q-item>
      <q-item-section>
         <q-item-label
          lines="1"
          class="text-weight-bold text-primary text-uppercase"
        >
          <span class="cursor-pointer">{{ des_auxiliar }}</span>
        </q-item-label>
        <q-item-label lines="1">
          <span class="text-weight-medium"
            >{{ area }}- Piso {{ piso_especialidad }}</span>       
        </q-item-label>       
        <q-item-label caption lines="1">
          <span class="text-bold">
            {{ diaEntrega }} - {{ fecha_pedido }} / a :
            {{ hora_pedido }}</span
          >
        </q-item-label>
         <q-item-label >
       T.Pago :  {{ tipopago }}
        </q-item-label>
      </q-item-section>     
        <q-item-section side top class="text-green-9 text-bold">            
           <span class="text-weight-medium" v-if="estado_pedido==0"> NUEVO</span>
           <span class="text-weight-medium" v-else-if="estado_pedido==1"> PROCESO</span>
           <span class="text-weight-medium" v-else-if="estado_pedido==2"> LISTO</span>
           <span class="text-weight-medium" v-else-if="estado_pedido==3"> ENTREGADO</span>
           <span class="text-weight-medium" v-else-if="estado_pedido==4"> ANULADO</span>
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
    <q-card-section class="no-padding">
      <q-item>
       <q-item-section class=" text-green text-bold">
                 <q-item-label>Total: S/ {{ total }}</q-item-label>    
              </q-item-section>
       <q-item-section side top>              
                <q-btn v-if="estadopago==0 && tipopago=='efectivo' "      
                size="12px"              
                dense              
                label=" Pagar  "
                color="primary"
                  
               />
              <q-icon v-else-if="estadopago==0 && tipopago=='iziPay'" color="red" name="far fa-credit-card" size="sm" />        
              <q-icon v-else-if="estadopago==1" color="red" name="fas fa-check-circle" size="sm" />
      </q-item-section> 
    </q-item> 
    </q-card-section>   
  </q-card>
</template>
<script>
import moment from "moment";
import "moment/locale/es";
export default {
  name: "card-all-order",
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
    "tipopago",
    "estadopago"
  ],
  data() {
    return {
      step: 0,
      stars: 0,
      moment,     
      done1: false,
      done2: false,
      done3: false,
      tipoEnvio: "",
      fecha_actual: moment(new Date()).format("YYYY-MM-DD"),
      fecha_actual2: moment(new Date()).format("DD-MM-YYYY"),
      currentHora:'',
      currentHora2:'',
      colorCurrent:'secondary',
      minutes:0,
      hours:0,
      horava:0
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
    nombreDia: function () {     
          
        //18-01-2022  
        let array = this.fecha_pedido.split("-");
        let dia = array[0];
        let mes = array[1];
        let anio = array[2];

        let fecha1 = anio + "/" + mes + "/" + dia;
        let fechaSql = anio + "-" + mes + "-" + dia;
      //  this.nombreDia = moment(new Date(fecha1)).format("dddd");
        return moment(new Date(fecha1)).format("dddd");
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