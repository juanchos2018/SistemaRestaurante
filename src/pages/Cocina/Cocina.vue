<template>
  <q-page class="q-pa-xs">
    <q-tabs
      v-model="tab"
      inline-label  shrink  stretch  align="left" class="bg-dark text-white"  active-color="red-1"
      :breakpoint="0"
    >
      <q-tab name="mails" icon="alarm" label="Nuevo" />
      <q-tab name="alarms" icon="fas fa-tasks" label="Enviado" />
      <q-tab
        name="reject"
        icon="fas fa-exclamation-triangle"
        label="Anulados"
      />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
       <q-tab-panel name="mails">
        <!-- <p>{{itemCocina}}</p> -->
               <!-- <div v-if="!itemCocina.length">
              <h6>SIN PEDIDO EL DIA DE HOY </h6>
        </div> -->
        <!-- :title="itemCocina.length>0?'Pedidos':' Sin  Pedidos el dia de hoy'" -->
        <q-table
          grid
          :card-container-class="cardContainerClass"
          :title="currentHora"
          :rows="itemCocina"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
          v-model:pagination="pagination"
          :rows-per-page-options="rowsPerPageOptions"
        >
          <template v-slot:top-right  >          
            <div class="no-padding no-margin">                   
             <q-btn-dropdown color="red" :label="nombreDia+' - '+date" dropdown-icon="change_history"   class="float-right "  >
               <q-date
                  v-model="date"     
                  :events="events"
                  event-color="red"
                  mask="DD-MM-YYYY" 
                  @update:model-value="ChangeDate($event)"
                  class="colorborde"
                />
              </q-btn-dropdown>  
          </div>       
          </template>
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <card-pedido
                :id_pedido="props.row.id_pedido"
                :des_auxiliar="props.row.des_auxiliar"
                :cod_auxiliar="props.row.cod_auxiliar"
                :piso_especialidad="props.row.piso_especialidad"
                :area="props.row.area"
                :color="props.row.color"
                :detalle="props.row.detalle"
                :fecha_pedido="props.row.fecha_pedido"
                :hora_pedido="props.row.hora_pedido"
                :estado_pedido="props.row.estado_pedido"
                :total="props.row.totalpedido" 
                :tipopago="props.row.tipopago"
                :estadopago="props.row.estadopago"
                :visible="visible"
                 v-on:update="modificar"
                 v-on:updateState="setUpdateState"
                 v-on:modalPagosCocina="modalPagosCocina"
              ></card-pedido>
            </div>
          </template>
        </q-table>     
      </q-tab-panel>
      <q-tab-panel name="alarms">
        <q-toolbar class="bg-secondary text-white q-my-xs shadow-2">        
           <q-item>
              <q-item-label class="text-white text-bold">   {{ nombreDia }} - {{ fecha_actual }}</q-item-label>
             </q-item>          
          <q-space />
          <q-item>
              <q-item-label class="text-white text-bold">   S/ {{ SumTotal }}</q-item-label>
             </q-item>         
        </q-toolbar>   
      <q-table
          grid
          :card-container-class="cardContainerClass2"
          title=" "
          :rows="itemTerminado"
          :columns="columns2"
          row-key="name"
          :filter="filter"
          hide-header
          v-model:pagination="pagination2"
          :rows-per-page-options="rowsPerPageOptions2"
        >         
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <card-terminado
              :id_pedido="props.row.id_pedido"
              :des_auxiliar="props.row.des_auxiliar"
              :piso_especialidad="props.row.piso_especialidad"
              :area="props.row.area"
              :color="props.row.color"
              :totalpedido="props.row.totalpedido"
              :detalle="props.row.detalle"
              :estado="props.row.estado_pedido"
              :fecha_pedido="props.row.fecha_pedido"
              :hora_pedido="props.row.hora_pedido"  
              :tipopago="props.row.tipopago"
              :estadopago="props.row.estadopago"
              v-on:modalPagosCocina="modalPagosCocina"
            ></card-terminado>
            </div>
          </template>
        </q-table>   
      </q-tab-panel>
      <q-tab-panel name="reject">
        <div class="row q-col-gutter-sm">
          <div
            class="col-md-3 col-lg-4 col-sm-12 col-xs-12"
            v-for="item in itemRejected"
            :key="item.id_pedido"
          >
            <card-anulado
              :id_pedido="item.id_pedido"
              :des_auxiliar="item.des_auxiliar"
              :piso_especialidad="item.piso_especialidad"
              :area="item.area"
              :color="item.color"
              :totalpedido="item.totalpedido"
              :detalle="item.detalle"
              :estado="item.estado_pedido"
              :fecha_pedido="item.fecha_pedido"
              :hora_pedido="item.hora_pedido"            
            ></card-anulado>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <br />
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
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import CardPedido from "components/cards/CardPedido.vue";
import CardTerminado from "components/cards/CardTerminado.vue";
import CardAnulado from "components/cards/CardAnulado.vue";
import useSound from "vue-use-sound";
import buttonSfx from "../../assets/timbre.mp3";
import { ref, watch, computed,reactive } from "vue";
import { mapState } from "vuex";
import moment from "moment";
import "moment/locale/es";

export default {
  name: "Cocina",
  components: {
    CardPedido,
    CardTerminado,
    CardAnulado,
  },
  setup() {
    const $q = useQuasar();
    let itemCocina = ref([]);
    let itemTerminado = ref([]);
    let itemRejected = ref([]);
    const [play] = useSound(buttonSfx);
    const otherValue = $q.sessionStorage.getItem("Qsesion");
    const  fecha_actual= ref(moment(new Date()).format("YYYY/MM/DD"));
    function getItemsPerPage() {
      if ($q.screen.lt.sm) {
        return 3;
      }
      if ($q.screen.lt.md) {
        return 6;
      }
      return 9;
    }
    const filter = ref("");
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage(),
    });
     const pagination2 = ref({
      page: 1,
      rowsPerPage: getItemsPerPage(),
    });
    watch(
      () => $q.screen.name,
      () => { pagination.value.rowsPerPage = getItemsPerPage(); },
      () => { pagination2.value.rowsPerPage = getItemsPerPage(); }
    );
     const  modelUser =  reactive({
        fecha_pedido: "",
        hora_pedido: "",
        estado_pedido: 0,
        cod_auxiliar: "",
        especialidad: "",
        area: "",
        piso_especialidad: "",
        des_auxiliar: "",  
        color: "bg-positive",
        token:'' }); 
    return {
      otherValue,
      nombreDia:'',    
      events: [],
      date: ref(moment(new Date()).local().format("DD-MM-YYYY")),     
      fecha_actual2: moment(new Date()).format("DD-MM-YYYY"),
      componentKey: 0,
      currentHora:ref(''),
      fecha_actual,
      confirm: ref(false),  
      modelUser,
      visible:ref(true),
      play,
      moment,
      con: null,
      msg: "Test  Meesage",
      name: "jkun",
      msgA: [],
      filter,
      pagination,
      pagination2,
      itemCocina,
      itemTerminado,
      itemRejected,
      type: "All",
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 4,
      tab: ref("mails"),
      cardContainerClass: computed(() => {
        return $q.screen.gt.xs
          ? "grid-masonry grid-masonry--" + ($q.screen.gt.sm ? "3" : "2")
          : null;
      }),
      cardContainerClass2: computed(() => {
        return $q.screen.gt.xs
          ? "grid-masonry grid-masonry--" + ($q.screen.gt.sm ? "3" : "2")
          : null;
      }),
      rowsPerPageOptions: computed(() => {
        return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
      }),
      rowsPerPageOptions2: computed(() => {
        return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
      }),
      columns: [
        { name: "des_auxiliar", label: "des_auxiliar", field: "des_auxiliar" },
        {
          name: "piso_especialidad",
          label: "Area",
          field: "piso_especialidad",
        },
      ],
      columns2: [
        { name: "des_auxiliar", label: "des_auxiliar", field: "des_auxiliar" },
        { name: "piso_especialidad", label: "Area", field: "piso_especialidad",
        },
      ],   
    };
  },
  created() {
    let existe = this.$q.sessionStorage.has("Qsesion");
    if (existe == false) {
      this.$router.push({ path: "/" });
    }
  },
  mounted() {
    this.setCurrentTime();  
    this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd'); 
    let existe = this.$q.sessionStorage.has("Qsesion"); 
    if (existe==true) {     
        let obj = this.$q.sessionStorage.getItem("Qsesion");
        this.modelUser.des_auxiliar = obj.DES_AUXILIAR;
        this.modelUser.cod_auxiliar = obj.COD_AUXILIAR;
        this.modelUser.area = obj.AREA;
    //    console.log(this.modelUser);

       
        this.modelUser.token = obj.token;   
      } 
      
    this.conn= new WebSocket(this.$q.platform.is.mobile==true?this.url_socket2+'?token='+this.modelUser.token:this.url_socket+'?token='+this.modelUser.token );
    this.get();
    this.getCalendar();
    this.getTerminados();
    this.getRjecteds();
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
    this.conn.onerror = function (errorEvent) {
				console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
		};
    this.conn.onmessage = (e) => {
      // console.log(e.data)
      let jsonre = JSON.parse(e.data);  
      if (jsonre.tipo == "Store") {
        if (this.modelUser.area=="COCINA") {
        //   console.log(e.data)
         //  console.log("sonido y notificacion")
             this.Sonido();
            this.noti2(jsonre.des_auxiliar);
           //  this.Sonido();
        }       
        this.rcv(e.data);
      } else if (jsonre.tipo == "Update") {
        this.get();
        this.getTerminados();
        this.getRjecteds();
    
      }    
       else if (jsonre.tipo == "Updatestate") {
        this.get();        
      }     
    };
  },
  computed: {
    ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2"]),
    getData2() {
      return this.getData().slice(
        (this.page - 1) * this.totalPages,
        (this.page - 1) * this.totalPages + this.totalPages
      );
    },
    SumTotal() {
      var result = this.itemTerminado.reduce(function (acc, obj) {
        return acc + parseFloat(obj.totalpedido);
      }, 0);
      return result.toFixed(2);
    },
    nombreDiayano: function () {
      return moment(this.fecha_actual).format("dddd");
    },
    esCocinero(){
       let existe = this.$q.sessionStorage.has("Qsesion");
        if (existe==true) {
            let datos = JSON.parse(localStorage.getItem('Qsesion'));
            console.log("sessionStorage "+ datos.AREA);
            return    datos.AREA=='COCINA';
        }      
    },
  },
  methods: {
    Detectar(){      
      //console.log(this.$q.screen.width );
      //console.log(this.$q.platform.is.mobile);
      let ismobile=this.$q.platform.is.mobile;
      //=== 1080 && this.$q.platform.is.mobile
      // let detector = new MobileDetect(window.navigator.userAgent)
      // console.log( "Mobile: " + detector.mobile());
      // console.log( "Phone: " + detector.phone());
      // console.log( "Tablet: " + detector.tablet());
      // console.log( "OS: " + detector.os());
      // console.log( "userAgent: " + detector.userAgent());
    },
    get() {
      let tipo = "nuevo";      
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      let url = "/Controller/PedidoController.php?tipo=" + tipo+"&fecha="+this.fecha_actual;
      this.$axios
        .get(url_b + url)
        .then((response) => {      
          this.itemCocina = response.data;
         // this.$refs.cardpedidos.setCurrentTime()
         // console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    getCalendar() {
      let tipo = "calendar";
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      let url = "/Controller/PedidoController.php?tipo=" + tipo;
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
         let tipo = "nuevo";   
         //this.componentKey += 1;
      if (e==null) {  
        // YYYY/MM/DD
          this.visible=true;
          let array =this.fecha_actual.split('/');
          let dia =array[2];
          let mes =array[1];
          let anio=array[0];
          let fecha1 =dia+'-'+mes+'-'+anio;
          let fechaSql=anio+'-'+mes+'-'+dia;
         //DD-MM-YYYY
         this.date=fecha1      
         this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd');      
         this.get();
        
      }else{          
          //  const  fecha_actual= ref(moment(new Date()).format("YYYY/MM/DD"));        
          let array =e.split('-');
          let dia =array[0];
          let mes =array[1];
          let anio=array[2];
          let fecha1 =anio+'/'+mes+'/'+dia;
          let fechaSql=anio+'-'+mes+'-'+dia;

          if (this.fecha_actual==fecha1) {
                this.visible=true;
          }
          else{
              this.visible=false;
          }
          this.nombreDia =moment(new Date(fecha1)).format('dddd');   
          let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;  
          let url = "/Controller/PedidoController.php?tipo=" + tipo+"&fecha="+fechaSql;
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
    getTerminados() {
      let tipo = "terminado";
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;  
      let url = "/Controller/PedidoController.php?tipo=" + tipo;
      this.$axios
        .get(url_b + url)
        .then((response) => {
          this.itemTerminado = response.data;    
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    setUpdateState(model){    
      this.conn.send(JSON.stringify(model));
      this.get();
      console.log(model);
    },    
    getRjecteds() {
      let tipo = "rejectedcock";
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;  
      let url = "/Controller/PedidoController.php?tipo=" + tipo;
      this.$axios
        .get(url_b + url)
        .then((response) => {
          this.itemRejected = response.data;       
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    rcv(str) {
      this.get();
      this.getRjecteds();
    },
    noti2(use) {
      this.$q.notify({
        group: false,
        message: "Nuevo Pedido de: "+use,
        color: "positive",
        position: "top-right",
      });
    },
    Sonido() {
      this.play();
    },
    getData() {
      if (this.type == "All") {
        return this.cards_data;
      } else {
        let self = this;
        return this.cards_data.filter(function (item) {
          return item.type.toLowerCase() == self.type.toLowerCase();
        });
      }
    },
    modificar(datos) {
      let indice = this.itemCocina.findIndex(
        (x) => x.id_pedido == datos.id_pedido
      );
      if (datos.estado_pedido == 4) {
        const array = this.itemCocina[indice].detalle.filter(function (
          element
        ) {
          return element.id_pedido == datos.id_pedido;
        });
        array.forEach((element) => {
          datos.lista.push({
            id_producto: element.id_producto,
            cantidad_pedido: element.cantidad_pedido,
            usastock: element.usastock,
          });
        });
      }    
      this.conn.send(JSON.stringify(datos));
      // this.get();
      // this.getTerminados();
      // this.getRjecteds();
     },
    logoutNotify() {
      this.$router.push({ path: "/" });
      this.$q.sessionStorage.remove("Qsesion");
      this.$q.sessionStorage.clear();
      localStorage.removeItem("Qsesion");
      localStorage.removeItem('token');
    },
    modalPagosCocina(objeto){  
       this.$q.dialog({
        title: 'Confirmar',
        message: 'Realizar pago de Pedido?',
        cancel: true,
        persistent: true,
        class:"colorborde"
      }).onOk(() => {        
        this.UpdateEstadoPago(objeto.id_pedido);
      }).onOk(() => {     
      }).onCancel(() => {       
      }).onDismiss(() => {        
     })
    },
    UpdateEstadoPago(id_pedido){  
      let me = this;
      let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;    
      let url ="/Controller/PedidoController.php";   
      let data ={
        tipo:'updatestatepago',
        id_pedido:id_pedido
      }
      me.$axios({
        method: "PUT",
        url: url_b+url,
        data: data,
      })
        .then(function (response) {        
          let result = response.data;   
          if (result.afect>0) {
               me.getTerminados();                 
          } else {
          
          }
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
     setCurrentTime(){
       setInterval(() => {  
            this.currentHora = moment().format("HH:mm:ss");            
          }, 1000);
     }   
  },
};
</script>

<style>

.q-pa-sm {
    padding: 2px 2px;
}
.q-tab-panel {
    padding: 8px;
}
.q-table__top {
    padding: 0px 0px;
}
.colorborde{
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
