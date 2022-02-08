<template>
  <q-page class="q-pa-sm">
     <q-btn-dropdown color="red" :label="nombreDia+' - '+date" dropdown-icon="change_history"   class="float-right "  >
        <q-date
          v-model="date"   
          event-color="red"
          mask="DD-MM-YYYY" 
          @update:model-value="ChangeDate($event)"
          class="colorborde"
        />
      </q-btn-dropdown>  
        <br>
        <br>
        <br>
       <div class="row q-col-gutter-sm">     
          <div
            class="col-md-3 col-lg-4 col-sm-12 col-xs-12"
            v-for="item in itemhistory"
            :key="item.id_pedido"
          >
            <card-history            
              :id_pedido="item.id_pedido"
              :des_auxiliar="item.des_auxiliar"
              :piso_especialidad="item.piso_especialidad"
              :area="item.area"
              :color="item.color"
              :fecha_pedido="item.fecha_pedido"
              :hora_pedido="item.hora_pedido"
              :detalle="item.detalle"
              :estado_pedido="item.estado_pedido"
              :total="item.totalpedido"   
              :tipopago="item.tipopago"
              :estadopago="item.estadopago"
              v-on:updateStart="UpdateStart"
              v-on:modalPagos="showModel"         
            ></card-history>
          </div>
        </div>  
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
import CardHistory from "components/cards/CardHistory.vue";
import { QSpinnerGears } from 'quasar'
import { mapState } from "vuex";
import moment from "moment";
import "moment/locale/es";


export default defineComponent({
  name: "MiPedido",
  components: {CardHistory},
  setup() {
    let itemhistory = ref([]);
    const modelo = reactive({ COD_AUXILIAR: "", DES_AUXILIAR: "" });
    const fecha_actual= ref(moment(new Date()).format("YYYY/MM/DD"));
    const fecha_sql = ref(moment(new Date()).format("YYYY-MM-DD"));
    let nombreDia = ref("");
    return {          
      itemhistory,
      fecha_actual,
      fecha_sql,
      step: ref(0),      
      nombreDia,       
      modelo,
      visible:ref(true),
      modalpago:ref(false),
      conn:null,     
      moment,
      date: ref(moment(new Date()).local().format("DD-MM-YYYY")),
    };
   },
   created(){ 
      let existe = this.$q.sessionStorage.has("Qsesion");    
      if (existe==false) {
         this.$router.push({ path: "/" });
      }    
   },
   mounted() {
      this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd'); 
      let existe = this.$q.sessionStorage.has("Qsesion");     
      if (existe==true) {
          let obj = this.$q.sessionStorage.getItem("Qsesion");
          this.modelo.DES_AUXILIAR = obj.DES_AUXILIAR;
          this.modelo.COD_AUXILIAR = obj.COD_AUXILIAR;
      } 
     this.get();
   },
  computed: {
   ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2"]),
  },
  methods: {      
    get(){
      let tipo2="history";
      let tipo = "mioday";
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
     // let url="/Controller/PedidoController.php?tipo="+tipo+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;
      let url =  "/Controller/PedidoController.php?tipo=" + tipo + "&fecha=" + this.fecha_sql+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;
      this.$axios
        .get(url_b+url)
        .then((response) => {      
          this.itemhistory = response.data;         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },   
    ChangeDate(e) {
      let tipo = "mioday"; 
      if (e == null) {
        this.nombreDia = moment(new Date(this.fecha_actual)).format("dddd");
          let array =this.fecha_actual.split('/');
          let dia =array[2];
          let mes =array[1];
          let anio=array[0];
          let fecha1 =dia+'-'+mes+'-'+anio;
          let fechaSql=anio+'-'+mes+'-'+dia;     
         this.date=fecha1      
         this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd');
         this.get();
      } else {
        let array = e.split("-");
        let dia = array[0];
        let mes = array[1];
        let anio = array[2];
        let fecha1 = anio + "/" + mes + "/" + dia;
        let fechaSql = anio + "-" + mes + "-" + dia;
        this.nombreDia = moment(new Date(fecha1)).format("dddd");       
        let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;       
        let url = "/Controller/PedidoController.php?tipo=" + tipo+"&fecha="+fechaSql+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;

       this.$axios
            .get(url_b + url)
            .then((response) => {              
              this.itemhistory = response.data;             
            })
            .catch(function (error) {
              console.log(error);
            })
            .finally(() => {});
      }
    },      

    listarFechaUpdate(e){
        let tipo = "mioday";
        let array = e.split("-");
        let dia = array[0];
        let mes = array[1];
        let anio = array[2];
        let fecha1 = anio + "/" + mes + "/" + dia;
        let fechaSql = anio + "-" + mes + "-" + dia;
        this.nombreDia = moment(new Date(fecha1)).format("dddd");       
        let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;       
        let url = "/Controller/PedidoController.php?tipo=" + tipo+"&fecha="+fechaSql+"&cod_auxiliar="+this.modelo.COD_AUXILIAR;

       this.$axios
            .get(url_b + url)
            .then((response) => {              
              this.itemhistory = response.data;             
            })
            .catch(function (error) {
              console.log(error);
            })
            .finally(() => {});
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
    load(){    
      this.$q.loading.hide()
    },
    UpdateStart(obj){  
      let me = this;
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      let url ="/Controller/PedidoController.php";         
      let data = obj;
      this.$axios({
        method: "PUT",
        url: url_b+url,
        data: data,
      })
        .then(function (response) {     
          let result = response.data;
         // me.get();
             me.listarFechaUpdate(obj.fecha_pedido);
              me.$q.notify({
              message: "Calificado ",
              color: "accent",
              position: "top",
          });        
        })
        .catch((error) => {
          console.log(error);
        });
     }
  },
});
</script>

<style >
.q-stepper__step-content {
  display: none !important;
}
</style>
