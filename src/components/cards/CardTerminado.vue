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
        <!-- <q-item-section side top class="text-green-9 text-bold">
         ENTREGADO
        </q-item-section>     -->
        <q-item-section side top class="text-green-9 text-bold">            
           <span class="text-weight-medium" v-if="estado==0"> NUEVO</span>
           <span class="text-weight-medium" v-else-if="estado==1"> PROCESO</span>
           <span class="text-weight-medium" v-else-if="estado==2"> LISTO</span>
           <span class="text-weight-medium" v-else-if="estado==3"> ENTREGADO</span>
           <span class="text-weight-medium" v-else-if="estado==4"> ANULADO</span>
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
                 <q-item-label>Total: S/ {{ totalpedido }}</q-item-label>    
              </q-item-section>
       <q-item-section side top>              
                <q-btn v-if="estadopago==0 && tipopago=='efectivo'"      
                size="12px"              
                dense              
                label=" Pagar  "
                color="primary"
                @click="mensajePagar(totalpedido,id_pedido)"      
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
  props: ["id_pedido","des_auxiliar", "piso_especialidad","area", "detalle","color","estado","totalpedido", "hora_pedido", "fecha_pedido","tipopago",
    "estadopago"],
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
  methods:{
       mensajePagar(totalpago,id_pedido){          
        let datos={
          id_pedido:id_pedido,
          totalpago:totalpago        
        }
        this.$emit("modalPagosCocina",datos);      
      },
  }
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