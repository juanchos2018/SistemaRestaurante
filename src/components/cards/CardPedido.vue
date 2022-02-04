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
         <q-item-label
          lines="1"
          class="text-weight-bold text-primary text-uppercase"
        >
          <span class="cursor-pointer">{{ des_auxiliar }}</span>
        </q-item-label>
        <q-item-label lines="1">
          <span class="text-weight-medium"
            >{{ area }}- Piso {{ piso_especialidad }}</span
          >    
        </q-item-label>      
        <q-item-label caption lines="1">
          <span class="text-bold">
            {{ diaEntrega }} - {{ fecha_pedido }} / a las:
            {{ hora_pedido }}</span
          >
        </q-item-label>
         <q-item-label  lines="1">
        T.Pago:  {{ tipopago }}   
        </q-item-label>
        
      </q-item-section>
      <q-item-section top side>
        <div class=" q-gutter-xs">      
          <q-btn           
            size="12px"
            flat
            dense
            round
            icon="delete"
            @click="Editar(4)"
          /> 
             
        </div>
        <q-chip square :color="colorCurrent" text-color="white" style="float:bottom; bottom:0; position:absolute;" >
            {{hours}}   : {{minutes}} - min
            </q-chip>
      </q-item-section>
      
    </q-item>
    <q-separator></q-separator>
    <q-list>
      <q-item clickable v-for="item in detalle" :key="item.id_pedido_detalle">
        <q-item-section avatar class="no-margin">
          <q-icon color="primary" :name="item.logo"  size="xs"/>
        </q-item-section>
        <q-item-section>
          <q-item-label :style="item.estado_detalle==0?'text-decoration: line-through red':''">{{ item.nombre_producto }}</q-item-label>
          <q-item-label caption lines="2">{{ item.descripcion }}</q-item-label>
          <q-item-label caption lines="1">          Cant.: {{ item.cantidad_pedido }} x S/
            <span class="text-bold">
              {{ item.precio_venta }}</span></q-item-label>
         <q-item-label caption lines="">con : {{ item.entrada }}</q-item-label>
        </q-item-section>
         <q-item-section top side>
          <div class="q-gutter-xs">
            <!--  class="gt-xs"    v-if="detalle.length>1"   <i class="fas fa-ban"></i> -->
            <!-- <q-btn       
             v-if="detalle.length>1"
              @click="EditState(item.id_pedido_detalle,item.id_pedido,item.precio_venta,item.estado_detalle)"
              size="12px"
              flat
              dense
              round
              icon="fas fa-ban"    
            />   -->
            <!-- <q-icon color="primary" name="fas fa-ban"  size="xs" @click="EditState"/>  -->
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- <q-card-section class="flex flex-left text-bold">
      <div>Total: S/ {{ total }}</div>      
    </q-card-section> -->
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
                @click="mensajePagar(total,id_pedido)"      
               />
              <q-icon v-else-if="estadopago==0 && tipopago=='iziPay'" color="red" name="far fa-credit-card" size="sm" />        
              <q-icon v-else-if="estadopago==1" color="red" name="fas fa-check-circle" size="sm" />
      </q-item-section> 
    </q-item>   
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
    "visible" ,
    "tipopago",
    "estadopago"
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
      currentHora:'',
      currentHora2:'',
      colorCurrent:'secondary',
      minutes:0,
      hours:0,
      horava:0
     
    };
  },
  mounted(){
      this.setCurrentTime();
      
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
    setCurrentTime(){

     //  if (this.fecha_pedido == this.fecha_actual2) {
            setInterval(() => { 
                this.currentHora    = moment();  
                this.currentHora2    = moment().format('LTS');  
                let arrayhora2= this.currentHora2.split(":");
                let hora2=arrayhora2[0];
                let minute2 =arrayhora2[1]
               /// console.log("ora: "+hora2);
              if (this.fecha_pedido == this.fecha_actual2) {              
                let arrayhoira =this.hora_pedido.split(":");
                let hora = arrayhoira[0];            
                let minute =arrayhoira[1];
                //console.log(hora2);
                //  if (hora<=hora2   ) { 
                if (hora<=hora2   && minute<=minute2) {                 
                  let unionDateTime   = moment(this.fecha_actual+'T'+this.hora_pedido); 
                  const diff =  this.currentHora.diff(unionDateTime);
                  const diffDuration = moment.duration(diff);  
                  this.minutes=diffDuration.minutes();
                  this.hours=diffDuration.hours();

                  if (diffDuration.minutes()>5 &&  diffDuration.minutes() <10 ) {
                      this.colorCurrent="amber";
                  }  
                  if (diffDuration.minutes()>=10) {
                      this.colorCurrent="red";
                  }
                }
              }
          }, 1000);
     // }    
    },
    EditState(id_pedido_detalle,id_pedido,precio,estado_detalle){   
      if (estado_detalle==1) {
           let dataState={
            tipo:'Updatestate',
            id_pedido_detalle:id_pedido_detalle,
            id_pedido:id_pedido,
            precio:precio,
            cod_auxiliar:this.cod_auxiliar,
            estado_detalle:0
          }
          this.$emit("updateState", dataState);
      }     
    },
    mensajePagar(totalpago,id_pedido){          
      let datos={
        id_pedido:id_pedido,
        totalpago:totalpago        
      }
      this.$emit("modalPagosCocina",datos);      
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
            })
            .onCancel(() => {             
            })
            .onDismiss(() => {            
            });
        } else {        
          if (step == 4) {         
                    this.$q.dialog({
                      title: 'Confirmar',
                      message: 'Desea anular este pedido?',
                      cancel: true,
                      persistent: true
                    }).onOk(() => {                      
                    }).onOk(() => {                     
                         const datas = {
                            estado_pedido: step,
                            id_pedido: this.id_pedido,
                            lista: [],
                            tipo: "Update",
                            cod_auxiliar: this.cod_auxiliar,
                          };
                          this.$emit("update", datas);
                          this.$q.notify({
                            message: "Pedido Anulado",
                            color: "accent",
                            position: "top",
                          });

                    }).onCancel(() => {                     
                    }).onDismiss(() => {                      
                    })

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
.q-item__section--avatar {
    color: inherit;
    min-width: 8px;
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