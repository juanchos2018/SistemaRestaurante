<template>
  <q-card class="my-card colorborde">
     <q-item>
      <q-item-section>
        <q-item-label>{{tipoEnvio}} {{ diaEntrega }} - {{ fecha_pedido }}</q-item-label>
        <q-item-label >
         {{ hora_pedido }}
        </q-item-label>
         <q-item-label >
       T.Pago :  {{ tipopago }}
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
            <q-btn            
            size="12px"
            flat
            dense
            round
            icon="delete"
            @click="Mensaje"         
          />
           <q-item-label  class="text-green text-bold">
              Nº {{id_pedido}}
           </q-item-label>
        </q-item-section>      
    </q-item>
    <q-separator />
    <div class="row">
      <div class="col-7">
        <q-list class="rounded-borders q-pt-xs">       
          <q-item v-for="item in detalle" :key="item.id_pedido_detalle" class="no-margin " >
            <q-item-section avatar  class="no-margin">
              <q-icon color="primary" :name="item.logo" size="xs" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.nombre_producto }} </q-item-label>
              <q-item-label caption lines="2">{{item.descripcion}}</q-item-label>
              <q-item-label caption lines="1">
                Cant. : {{ item.cantidad_pedido }} x    <span class="text-green text-bold"> {{item.precio_venta}}</span>
               </q-item-label
              >
              <q-item-label caption lines="">con : {{ item.entrada }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
         <q-separator />
        <q-card-section class=" no-padding"  >         
           <q-item>
              <q-item-section class=" text-green text-bold">
                 <q-item-label>Total: S/ {{ total }}</q-item-label>    
              </q-item-section>

              <q-item-section side top>              
                <q-btn v-if="estadopago==0 && tipopago=='iziPay' "      
                size="12px"              
                dense              
                label="Pagar"
                color="primary"
                @click="MensajePagar(total,id_pedido)"         
               />
              <q-icon v-else-if="estadopago==0 && tipopago=='efectivo'" color="red" name="fas fa-money-bill-wave-alt" size="sm" />        
              <q-icon v-else-if="estadopago==1" color="red" name="fas fa-check-circle" size="sm" />
              </q-item-section> 
            </q-item>         
          </q-card-section>
      </div>

      <div class="col-5">
        <q-stepper
          v-model.number="estado_pedido"
          vertical
          animated
          style="
            border-style: none;
            border-style: hidden;
            margin-left: auto;
            height: 100%;
          "
          class="text-red no-padding no-margin"
        >
          <q-step
            :name="0"
            title="Recibido"
            icon="settings"
            :done="estado_pedido > 0"
            class="no-marginno-margin no-padding"
          >
          </q-step>
          <q-step
            :name="1"
            title="Proceso"
            icon="settings"
            :done="estado_pedido > 1"
          >
          </q-step>
          <q-step
            :name="4"
            title="Listo"
            icon="settings"
            :done="estado_pedido > 1"
          >
          </q-step>
        </q-stepper>
      </div>
    </div>
  </q-card>
</template>
<script>
import moment from "moment";
import "moment/locale/es";
import { ref} from "vue";
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
  setup() {
     const  fecha_actual= ref(moment(new Date()).format("YYYY/MM/DD"));
     let tipoEnvio=ref('');
    return {
      step: 0,
      done1: false,
      done2: false,
      done3: false,
      tipoEnvio,
      fecha_actual
    };
  },
   computed: {
    nombreDia: function () {         
        return moment(new Date(this.fecha_pedido)).format("dddd");
    },
    diaEntrega: function () {     
        let fechas =this.fecha_pedido.split('-');
        let dia =fechas[0];
        let mes =fechas[1];
        let anio =fechas[2];
        let fecha_sql =anio+'-'+mes+'-'+dia;
        let nombre_dia_hoy = moment(new Date(this.fecha_actual)).format("dddd");
        let nombre_dia_envio =moment(fecha_sql).format('dddd');
        if (nombre_dia_hoy==nombre_dia_envio) {
            this.tipoEnvio="Para Hoy "
        }else{
           this.tipoEnvio="Para El "
        }
        return  moment(fecha_sql).format('dddd');
    },
  },
  methods: {
    MensajePagar(totalpago,id_pedido){
      console.log("clcikl")
      let datos={
        id_pedido:id_pedido,
        totalpago:totalpago        
      }
       this.$emit("modalPagos",datos)
    },
    Mensaje(){  
      if (this.estado_pedido==0) {
           this.$q.dialog({
            title: 'Confirmar',
            message: 'Desea Anular este Pedido',
            cancel: true,
            persistent: true,
            class:'colorborde'
          }).onOk(() => {
            // console.log('>>>> OK')
            this.$emit('anularPedido',this.id_pedido);
          }).onOk(() => {
            // console.log('>>>> second OK catcher')
          }).onCancel(() => {
            // console.log('>>>> Cancel')
          }).onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          })
      }else{
          this.$q.dialog({
            title: 'Mensaje',
            message: 'Este  pedido ya estan en Proceso !'
          }).onOk(() => {
            // console.log('OK')
          }).onCancel(() => {
            // console.log('Cancel')
          }).onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          })
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
.q-item__section--avatar {
    color: inherit;
    min-width: 8px;
}
.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>