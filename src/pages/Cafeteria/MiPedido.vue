<template> 
  <q-page class="q-pa-sm">  
    <q-tabs v-model="tab"  inline-label  shrink  stretch  align="left" class="bg-dark text-white"  active-color="red-1" :breakpoint="0">
      <q-tab name="mails" icon="alarm" label="Proceso" />
      <q-tab name="success" icon="fas fa-check" label="Recibido" />    
      <q-tab name="alarms" icon="fas fa-exclamation-triangle" label="Rechazado" />
    </q-tabs>

     <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails">
         <q-btn-dropdown color="red" :label="nombreDia+' - '+date" dropdown-icon="change_history"   class="float-right"  >
               <q-date
                  v-model="date"     
                  :events="events"
                  event-color="red"
                  mask="DD-MM-YYYY" 
                  @update:model-value="ChangeDate($event)"
                />
              </q-btn-dropdown>  
          <br><br><br>
       <div class="row q-col-gutter-sm">     
            <div v-if="!itemCocina.length">              
              <label for="">SIN PEDIDO PARA EL DIA DE HOY</label>
            </div>
          <div
            class="col-md-3 col-lg-4 col-sm-12 col-xs-12"
            v-for="item in itemCocina"
            :key="item.id_pedido"
          >
            <card-mi-pedido
              :id_pedido="item.id_pedido"
              :des_auxiliar="item.des_auxiliar"
              :piso_especialidad="item.piso_especialidad"
              :area="item.area"
              :color="item.color"
              :detalle="item.detalle"
              :estado_pedido="item.estado_pedido"
              :fecha_pedido="item.fecha_pedido"
              :hora_pedido="item.hora_pedido"
              :total="item.totalpedido"
              :tipopago="item.tipopago"
              :estadopago="item.estadopago"
              v-on:anularPedido="anularPedido"
              v-on:modalPagos="showModel"    
            ></card-mi-pedido>
          </div>
        </div>
      </q-tab-panel>
       <q-tab-panel name="success"> 
        <div class="row q-col-gutter-sm">
          <div class="col-md-3 col-lg-4 col-sm-12 col-xs-12" v-for="item in itemSucess" :key="item.id_pedido">
            <card-success 
            :id_pedido="item.id_pedido"
            :des_auxiliar="item.des_auxiliar"
            :piso_especialidad="item.piso_especialidad"
            :area="item.area" :color="item.color"
            :detalle="item.detalle"
            :estado="item.estado_pedido"
            :fecha_pedido="item.fecha_pedido"
            :hora_pedido="item.hora_pedido"
            :total="item.totalpedido"
            :tipopago="item.tipopago"
            :estadopago="item.estadopago"
            v-on:updateStart="UpdateStart"
            v-on:modalPagos="showModel"
              >
            </card-success>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="alarms">    
        <div class="row q-col-gutter-sm">
          <div class="col-md-3 col-lg-4 col-sm-12 col-xs-12" v-for="item in itemRejected" :key="item.id_pedido">
            <card-rejected  :id_pedido="item.id_pedido"
            :des_auxiliar="item.des_auxiliar"
            :piso_especialidad="item.piso_especialidad"
            :area="item.area" :color="item.color"
            :detalle="item.detalle"
            :estado="item.estado_pedido"
            :fecha_pedido="item.fecha_pedido"
            :hora_pedido="item.hora_pedido"
            :total="item.totalpedido">
            </card-rejected>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>    

    <q-dialog v-model="confirm" persistent>     
      <q-card class="bg-red text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Su sesion a Caducado</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        Vuelva a iniciar sesion.
      </q-card-section>    
    </q-card>
  </q-dialog>

  <q-dialog v-model="modalpago" persistent >
      <q-card style="width: 400px;height: 80%  " class="no-padding text-center" >           
          <iframe id="inlineFrameExample"
             title="Inline Frame Example"        
             width="100%"  
             height="90%"
            :src="linkIframe"
            @load="load">             
       </iframe>             
        <q-card-actions align="right" class="text-primary no-margin">        
          <q-btn flat label="Cerrar" v-close-popup  @click="cerrar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref,reactive } from "vue";
import CardMiPedido from "components/cards/CardMiPedidos.vue";
import CardRejected from "components/cards/CardRejected.vue";
import CardSuccess from "components/cards/CardSuccess.vue";
import { mapState } from "vuex";

import moment from "moment";
import "moment/locale/es";

import { QSpinnerGears } from 'quasar'
export default defineComponent({
  name: "MiPedido",
  components: {CardMiPedido,CardRejected,CardSuccess},
  setup() {
    const done1 = ref(false);
    const done2 = ref(false);
    const done3 = ref(false);
    let itemCocina = ref([]);
    let itemRejected = ref([]);
    let itemSucess = ref([]);
    const modelo = reactive({ COD_AUXILIAR: "", DES_AUXILIAR: "" });
    const  fecha_actual= ref(moment(new Date()).format("YYYY/MM/DD"));
    const  modelUser =  reactive({
        tipo:'Store',
        fecha_pedido: "",
        hora_pedido: "",
        estado_pedido: 0,
        cod_auxiliar: "",
        especialidad: "",
        area: "",
        piso_especialidad: "",
        des_auxiliar: "",
        detallePedido: [],
        TotalPedido: 0,
        color: "bg-positive",
        token:'' });  
    return {
      date: ref(moment(new Date()).local().format("DD-MM-YYYY")), 
      tab: ref("mails"),
      itemRejected,
      itemCocina,    
      itemSucess,
      step:ref(0),
      fecha_actual,    
      done1,
      done2,
      done3,      
      modelo,
      conn:null,
      events: [],
      nombreDia:ref(''),   
      modelUser ,
      confirm: ref(false),
      modalpago:ref(false),
      linkIframe:ref(''),
      visiblecarga:ref(false)          
    };
   },
   created(){ 
      let existe = this.$q.sessionStorage.has("Qsesion");    
      this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd');
      if (existe==false) {
         this.$router.push({ path: "/" });
      }
   },
   mounted() {
    //   let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;    
      let existe = this.$q.sessionStorage.has("Qsesion");     
      if (existe==true) {
          let obj = this.$q.sessionStorage.getItem("Qsesion");
          this.modelo.DES_AUXILIAR = obj.DES_AUXILIAR;
          this.modelo.COD_AUXILIAR = obj.COD_AUXILIAR;
          this.modelUser.des_auxiliar = obj.DES_AUXILIAR;
          this.modelUser.cod_auxiliar = obj.COD_AUXILIAR;    
          this.modelUser.token = obj.token;  
      } 
      this.conn= new WebSocket(this.$q.platform.is.mobile==true?this.url_socket2+'?token='+this.modelUser.token:this.url_socket+'?token='+this.modelUser.token );
      this.conn.onopen = (e) => {     
          this.$q.loading.show({           
             spinnerColor: 'red',
          })
          this.polling = setInterval(() => {		        
            clearInterval(this.polling)
            let {currentTarget}  =e;    
            this.$q.loading.hide()
            if (currentTarget.readyState==3) {
             this.alertSesion();
            }else{
              console.log("conectado WebSocket");
            }
	      	}, 400)     
       };
      this.get();   
      this.getSucess();
      this.getrecjected();
      this.getCalendar();
  
     this.conn.onmessage = (e) => {
         this.rcv(e.data);
         let recibe =   JSON.parse(e.data);     
         let es =  recibe.estado_pedido;
         let cod_auxiliar=recibe.cod_auxiliar;         
         if (es=="2" && cod_auxiliar==this.modelo.COD_AUXILIAR) {  
             this.check();
         }   
     };
  },
  computed: {
   ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2"]),
    nombreDia: function () {
      return moment(this.fecha_pedido).format("dddd");
    },
  },
  methods: {   
    check(){
      this.$q.notify({
          position: "top",
          type: 'positive',
          message: 'Tu Pedido ya esta Listo :)'             
        });
    },
    get(){
      let tipo="mio";
      let url="/Controller/PedidoController.php?tipo="+tipo+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      this.$axios
        .get(url_b+url)
        .then((response) => {      
          this.itemCocina = response.data;         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },    
    getrecjected(){
      let tipo="rejected";
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      let url="/Controller/PedidoController.php?tipo="+tipo+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;
      this.$axios
        .get(url_b+url)
        .then((response) => {         
            this.itemRejected = response.data;         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    getSucess(){
      let tipo="success";
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      let url="/Controller/PedidoController.php?tipo="+tipo+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;
      this.$axios
        .get(url_b+url)
        .then((response) => {       
            this.itemSucess = response.data;         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    getCalendar() {
      let tipo = "calendarcli";
       let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      let url = "/Controller/PedidoController.php?tipo=" + tipo+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;
      this.$axios
        .get(url_b + url)
        .then((response) => {    
          this.events = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
     },
     ChangeDate(e){
       let tipo = "getmiroder";   
       if (e==null) {      
           let array =this.fecha_actual.split('/');
          let dia =array[2];
          let mes =array[1];
          let anio=array[0];
          let fecha1 =dia+'-'+mes+'-'+anio;
          let fechaSql=anio+'-'+mes+'-'+dia;    
          this.date=fecha1      
          this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd');      
          this.get();
       }else{           
          let array =e.split('-');
          let dia =array[0];
          let mes =array[1];
          let anio=array[2];
          let fecha1 =anio+'/'+mes+'/'+dia;
          let fechaSql=anio+'-'+mes+'-'+dia;
          this.nombreDia =moment(new Date(fecha1)).format('dddd');         
          let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
          let url = "/Controller/PedidoController.php?tipo=" + tipo+"&fecha="+fechaSql+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;;
          this.$axios
          .get(url_b + url)
          .then((response) => {    
              this.itemCocina = response.data;
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => {});  
      }
    },
    UpdateStart(obj){ 
      let me = this;
      let tipo="start"
      let url ="/Controller/PedidoController.php";   
      let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;      
      let data = obj;     
      this.$axios({
        method: "PUT",
        url: url_b+url,
        data: data,
      })
        .then(function (response) {
           console.log(response);
          let result = response.data;
          me.get();
              me.$q.notify({
              message: "Calificado ",
              color: "accent",
              position: "top",
        });        
        })
        .catch((error) => {
          console.log(error);
        });
    },
   alertSesion(){
       this.confirm=true;
       let percentage = 0
       this.polling = setInterval(() => {
		        this.confirm=false;  
            clearInterval(this.polling)
            this.logoutNotify();
	    	}, 2000)      
    },
    logoutNotify() {
      this.$router.push({ path: "/" });
      this.$q.sessionStorage.remove("Qsesion");
      this.$q.sessionStorage.clear();
      localStorage.removeItem("Qsesion");
      localStorage.removeItem('token');
    },
    showModel(modelo){     
      this.$q.loading.show({
          spinner: QSpinnerGears,
          spinnerColor: 'red',
          message: 'Cargando Metodo de Pago...'
        })
      let mobile=this.$q.platform.is.mobile;
      if (mobile==true) {
          this.linkIframe="http://161.132.198.54/ApiCafeteria/pasarela/popin2.php?id_pedido="+modelo.id_pedido+"&total="+modelo.totalpago
          this.modalpago=true;
      }else{
          this.linkIframe="http://192.168.3.219/ApiCafeteria/pasarela/popin.php?id_pedido="+modelo.id_pedido+"&total="+modelo.totalpago
          this.modalpago=true;
      }    
    },
    cerrar(){
      this.get();   
      this.getSucess();
    },
    load(){    
      this.$q.loading.hide()
    },
    anularPedido(id_pedido){  
      let me = this;
      let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;
      let url ="/Controller/PedidoController.php";   
      let lista=[];
      //  cod_auxiliar:this.modelo.COD_AUXILIAR,
      let data ={
          tipo:'Update',
          id_pedido:id_pedido,        
          estado_pedido:4,
          lista:lista
      }
      this.conn.send(JSON.stringify(data));
      this.get();   
      this.getSucess();
      this.getrecjected();
      this.getCalendar();
      
      // this.$axios({
      //   method: "PUT",
      //   url: me.url_base+url,
      //   data: data,
      // })
      //   .then(function (response) {
      //    //  console.log(response);
      //     let result = response.data;
      //     if (result.editado=='si') {
      //             me.get();
      //             me.$q.notify({
      //             message: result.mensaje,
      //             color: "accent",
      //             position: "top",
      //         });
      //     }else{
      //          me.$q.notify({
      //             message:  result.mensaje,
      //             color: "accent",
      //             position: "top",
      //           });
      //     }    
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

    },
    rcv(str) {
       this.get();
       this.getrecjected();
       this.getSucess();
    },
  },
});
</script>

<style >
.q-pa-sm {
    padding: 2px 2px;
}
.q-stepper__step-content {
  display: none !important;
}
</style>
