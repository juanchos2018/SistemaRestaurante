<template>
  <q-card class="my-card colorborde">
    <q-item>
      <q-item-section>
        <q-item-label>{{ nombreDia }} - {{ fecha_pedido }}</q-item-label>
        <q-item-label caption>
          {{ hora_pedido }}
        </q-item-label>
          <q-item-label >
           Pagar/c. :  {{ tipopago }}
        </q-item-label>         
      </q-item-section>
        <q-item-section side top>           
            <q-item-label v-if="estado_pedido==0">
              RECIBIDO
           </q-item-label>
            <q-item-label v-else-if="estado_pedido==1">
              PROCESO
           </q-item-label>
           <q-item-label v-else-if="estado_pedido==2" class="text-green text-bold">
              LISTO
           </q-item-label>
          <q-item-label v-else-if="estado_pedido==3" class="text-green text-bold">
              ENTREGADO
           </q-item-label>
            <!-- <q-btn            
            size="12px"
            flat
            dense
            round
            icon="delete"
            @click="Mensaje"         
          /> -->
            <q-item-label  class="text-green text-bold">
              Nº {{id_pedido}}
           </q-item-label>
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
        </q-item-section>
        <q-item-section side top>      
          <q-rating
            size="18px"
            v-model="item.estrellas"
            :max="5"
            color="yellow"
            @update:model-value="
              estrellas($event, item.id_pedido_detalle, item.id_producto,fecha_pedido)
            "
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-section class=" no-padding">
       <q-item>
          <q-item-section class=" text-green text-bold">
              <q-item-label>Total: S/ {{ total }}</q-item-label>    
          </q-item-section>
          <q-item-section side top>            
           <q-btn v-if="estadopago==0 && tipopago=='iziPay'"   
            size="12px"              
            dense              
            label="Pagar"
            color="primary"       
            @click="mensajePagar(total,id_pedido)"           
            />
           <q-icon v-else-if="estadopago==0 && tipopago=='efectivo'" color="red" name="fas fa-money-bill-wave-alt" size="sm" />        
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
  name: "card-mi-medidos",
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
    };
  },
  computed: {
    nombreDia: function () {
      let array = this.fecha_pedido.split("-");
        let dia = array[0];
        let mes = array[1];
        let anio = array[2];
        let fecha1 = anio + "/" + mes + "/" + dia;
        let fechaSql = anio + "-" + mes + "-" + dia;
      return moment(new Date(fecha1)).format("dddd"); 
    },
  },
  methods: {
    estrellas(start, id_detalle, id_producto,fecha) {
      let model = {
        id_pedido_detalle: id_detalle,
        id_producto: id_producto,
        estrellas: start,
        tipo: "start",
        fecha_pedido:fecha
      };
      this.$emit("updateStart", model);
    },
    mensajePagar(totalpago,id_pedido){          
      let datos={
        id_pedido:id_pedido,
        totalpago:totalpago        
      }
      this.$emit("modalPagos",datos);      
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

.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>