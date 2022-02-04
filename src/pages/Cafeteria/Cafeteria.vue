<template>
  <q-page class="q-pa-sm">
    <q-layout view="lhh LpR lfr" container style="height: 88vh" class="shadow-2 rounded-borders">
      <q-drawer side="right" show-if-above v-model="rightDrawerOpen" bordered :breakpoint="500" :width="drawerWidth" class="no-margin no-padding">
        <div class="q-pa-sm no-margin no-padding">    
          <q-bar style="min-width: 250px;" class="bg-teal text-white rounded-borders">
            <div class="cursor-pointer non-selectable">
              Mi Pedido           
            </div>
            <q-space />
            <label for="" style="font-size: 20px">S/ {{  parseFloat(SumTotal).toFixed(2) }}</label>
          </q-bar>         
          <br>
          <q-list class="no-margin no-padding" separator v-for="item in getDatas" :key="item.id_producto">
            <q-item>
              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-weight-medium">{{ item.producto }}</span>
                </q-item-label>
                 <q-item-label v-if="item.descripcion==''" caption lines="1">
                 <q-icon name="fas fa-edit" size="12px" /> Click Aqui para tu detalle                     
                </q-item-label>
                <q-item-label v-else caption lines="1">
                  {{ item.descripcion }}
                </q-item-label>
                 <q-item-label  caption lines="1">
                 con {{ item.entrada }}
                </q-item-label>
                 <!-- <q-item-label  caption lines="1">
                    {{ item.fecha_peruana }}
                </q-item-label> -->
                <q-popup-edit v-model="item.descripcion" :title="item.producto" auto-save v-slot="scope">
                  <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                </q-popup-edit>
                <q-item-label lines="1" class="
                    q-mt-xs
                    text-body2 text-weight-bold text-primary text-uppercase
                  ">
                  <span class="cursor-pointer">S/ {{ item.precio }} x {{ item.cantidad_pedido }}</span>
                </q-item-label>
              </q-item-section>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn size="12px" flat dense round icon="fas fa-minus" @click="MinusProduct(item.id_producto,item.stock,item.fecha_pedido,item.entrada,item.usasubcategoria)" />
                  <q-btn size="12px" flat dense round icon="fas fa-plus" @click="MoreProduct(item.id_producto,item.stock,item.usastock,item.fecha_pedido,item.entrada,item.usasubcategoria)" />
                  <q-btn size="12px" flat dense round icon="delete" @click="DeleteItem(item.id_producto,item.entrada)" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
          <div class="q-pa-lg flex flex-center" v-if="getDatas.length>5">            
            <q-pagination    v-model="page" :min="current" :max="Math.ceil(arrayvacio.length / totalPages)" :input="true" input-class="text-orange-10">
            </q-pagination>
          </div>
          <q-banner inline-actions class="text-white bg-red absolute-bottom">
            <q-btn color="bg-positive" glossy push label="Enviar" @click="MensajeEnviar" />
            <template v-slot:action>
              <q-btn color="deep-orange" push label="Cancelar" @click="Cancelar" />
            </template>
          </q-banner>
        </div>
        <div class="absolute" style="top: 27px; left: -12px">
          <q-btn dense round unelevated color="accent" icon="chevron_right" @click="toggleRightDrawer" />
        </div>
      </q-drawer>
      <q-page-container>
        <q-page style="padding-top: 55px" class="q-pa-sm">
             <!-- <q-btn flat label="Cancelar" @click="confirm=true"/> -->
           <!-- <p>{{modelUser}}</p> -->
            <!-- <q-banner  v-if="visibleAnunio"  inline-actions rounded class="bg-orange text-white" v-model="visibleAnunio">
                Parrillada 
            <q-spinner-grid color="red"   size="2em"/>
                <template v-slot:action> 
                  <q-btn flat label="Dismiss" @click="ocultar"/>
                </template>
              </q-banner> -->        
          <div>    
      <q-item style="
    min-height: 48px;
    padding: 1px 1px;
    color: inherit;
    transition: color 0.3s, background-color 0.3s;"
>
      <q-item-section>
        <q-item-label
          lines="1"
          class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
        >
          <span class="cursor-pointer">Hasta: {{hora_limite}}</span>
        </q-item-label>
             </q-item-section>
              <q-item-section top side>
        <div class=" q-gutter-xs">
          <!--  class="gt-xs" -->
           <q-btn-dropdown color="red" :label="nombreDia+' - '+date" dropdown-icon="change_history"     class="float-right"  >
               <q-date
                  v-model="date"     
                  mask="DD-MM-YYYY" 
                  :options="optionsFn"
                  @update:model-value="ChangeDate($event)"
                  class="colorborde"
                />
              </q-btn-dropdown>  
        </div>
      </q-item-section>
    </q-item>            
          </div>         
          <div class="row q-col-gutter-sm">                 
            <div v-if="!itemProducto.length">
              <h5>SIN PRODUCTOS</h5>
            </div>
              <!-- <q-banner class="bg-primary text-white">
                Unfortunately, the credit card did not go through, please try again.
                <template v-slot:action>
                  <q-btn flat color="white" label="Dismiss" />
                  <q-btn flat color="white" label="Update Credit Card" />
                </template>
              </q-banner> -->
            <div class="col-md-3 col-lg-3 col-sm-6 col-xs-6" v-for="item in itemProducto" :key="item.id_producto">
              <card-product :data="item"  v-on:AgregarCarrito="AgregarCarrito" ></card-product>
            </div>
          </div>
          <q-page-sticky position="top" expand class="bg-dark text-white">
            <!-- <p>{{itemCategoria}}</p> -->
            <q-toolbar>            
               <q-tabs                   
                  inline-label
                  shrink
                  stretch
                  active-color="red-1"
                  v-model="tab"
                >
               <q-tab v-for="item in itemCategoria" :key="item.id_categoria"  :label="item.nombre_categoria"  :name="item.nombre_categoria" :icon="item.logo"   @click="
                      GetProduct(item.id_categoria, item.nombre_categoria,item.horalimite)" />
                </q-tabs>                 
              <q-space />
              <div class="q-gutter-sm row items-center no-wrap">
                <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
              </div>
            </q-toolbar>
          </q-page-sticky>
                <br>
                <br>
             <!-- Comentado para despues -->
              <!-- <q-btn
                v-morph:btn:mygroup:300.resize="morphGroupModel"
                class="absolute-bottom-left q-ma-md"
                fab
                color="red"
                size="lg"
                @click="nextMorph"
              >
                <q-spinner-pie color="yellow" size="1em" />
              </q-btn>

              <q-card
                v-morph:card1:mygroup:500.resize="morphGroupModel"
                class="absolute-bottom-left q-ma-md  text-white"
                style=" background: radial-gradient(circle, #35a2ff 0%, #014a88 100%) ;position: absolute;width: 300px; border-bottom-left-radius: 2em"
              >
                <q-card-section class="text-h6"> Nueva  Actividad </q-card-section>

                <q-card-section class="text-subtitle1">
                  Se realizara una parrilada el dia 12 de enero a las 14:30.                   
                </q-card-section>
               <q-card-actions align="around">
                  <q-btn  label="Ir a Ver" color="red"/>
                    <q-btn flat label="Cerrar" @click="nextMorph" />
                </q-card-actions>             
              </q-card>      -->
            
        </q-page>
      </q-page-container>
    </q-layout>

    <q-dialog v-model="prompt" persistent>
      <q-card >
        <q-card-section>
          <div class="text-h6">{{modelo.DES_AUXILIAR}}</div>      
        </q-card-section>
        <div class="row">
          <div class="col-6">
            <q-item>
              <q-input dense outlined class="full-width" type="number" max='9' label="Piso " maxlength="1" v-model="modelUser.piso_especialidad"  :rules="[ val => val < 10 || 'piso no existe']"/>
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-input dense outlined class="full-width" label="Area" v-model="modelUser.area" />
            </q-item>          
          </div>   
          <div class="col-6">           
            <q-item>        
               <q-input dense outlined class="full-width" v-model="timeactual"  type="time" mask="HH*mm"    format24h hint="Hora de recepcion" />   
            </q-item>          
          </div>   
          <div class="col-6">
            <q-item>          
              <q-input bottom-slots   dense outlined class="full-width"  v-model="fechaPeruana"  readonly >
                <template v-slot:hint>
                  <q-badge outline color="secondary" :label="nombreDia" />
                  </template>
              </q-input>       
            </q-item>          
          </div>   

         <div class="col-12">           
            <q-item>     
               <q-item-section>
              <q-item-label>Se pagara con: </q-item-label>
                <q-item-label>  <q-radio name="shape" v-model="modelUser.tipopago" val="efectivo" label="Efectivo" />
                <q-radio name="shape"   v-model="modelUser.tipopago" val="iziPay" label="IziPay" /></q-item-label>                
              </q-item-section>                    
           </q-item>          
          </div>           
          <!-- <div class="col-6">     
            <q-item v-if="modelUser.tipopago=='iziPay'">   
                <q-input dense outlined class="full-width" label="Correo" v-model="modelUser.correo" />               
           </q-item>          
          </div>    -->
        </div>  
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Enviar Pedido" @click="StorePedido" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
    <modal-complementos  @CerrarModal="CerrarModalcomplemento" :ModalComplemento="ModalComplemento"  v-on:AddEntrada="AddEntrada" ref="modalcomplemento"  > </modal-complementos>
  </q-page>
</template>

<script>
const columns = [
  {
    name: "Producto",
    label: "Producto",
    field: "Producto",
    align: "left",
    style: "white-space: pre-line",
  },
  { name: "Cantidad", field: "Cantidad", label: "Cantidad" },
  { name: "icon", label: "icon", field: "icon" },
];
const nextMorphStep = {
  btn: "card1",
  card1: "btn"  
};

import { provide, defineAsyncComponent, ref,reactive } from "vue";
import { mapState } from "vuex";
import { useQuasar,QSpinnerGears,QSpinnerGrid } from "quasar";

import moment from 'moment'
import "moment/locale/es";
export default {
  name: "Cafeteria",
  components: {
    CardProduct: defineAsyncComponent(() =>
      import("components/cards/CardProduct")
    ),
    ModalComplementos: defineAsyncComponent(() =>
      import("./ModalComplementos")
    ),
  },

  setup() {     
    let itemRefs = [];
    const $q = useQuasar();
    const arrayvacio = ref([]);
    const itemCategoria = ref([]);
    const itemProducto = ref([]);
    let id_categoria=ref(0);   
    provide("arrayvacio", arrayvacio);
    const search = ref("");
    let rightDrawerOpen = ref(false);
    const drawerWidth = ref(340);
    const otherValue = $q.sessionStorage.getItem("Qsesion");
    const modelo = reactive({ COD_AUXILIAR: "", DES_AUXILIAR: "" });    
    const date2 = ref(moment(new Date()).local().format("DD/MM/YYYY"))
    const proxyDate = ref(moment(new Date()).local().format("DD-MM-YYYY"))
    const fecha_hora=ref(moment(new Date()).local().format("DD-MM-YYYY"));
    let  fecha_actual= ref(moment(new Date()).format("YYYY/MM/DD"));
    let  fecha_actual2= ref(moment(new Date()).format("YYYY/MM/DD"));
    let  fecha_sql= ref(moment(new Date()).format("YYYY-MM-DD"));  
    let todaysDate = new Date();
    const morphGroupModel = ref('btn')
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
        token:'',
        correo:'',
        tipopago:'efectivo',
        estadopago:0 });   
       
    return {
      date: ref(moment(new Date()).local().format("DD-MM-YYYY")),      
      timeactual:ref(moment().format('HH:mm')),     
      timeWithSeconds: ref('14:56:00'),
      optionsFn (fecha_actual) {
        return fecha_actual>= moment(new Date()).format('YYYY/MM/DD')
      },      
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      nextMorph () {
        morphGroupModel.value = nextMorphStep[ morphGroupModel.value ]
      },
      save () {
        fecha_hora.value = proxyDate.value
      },       
      showLoading () {
        $q.loading.show();     
        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 2000)
      },
      fecha_actual,
      fecha_actual2,
      fecha_sql,
      datehoy : Date.now(),     
      morphGroupModel, 
      fecha_hora,
      todaysDate,   
      date1: ref('2019/02/01'),        
      Token:ref(''),
      modelUser,
      index_categoria:0,
      id_categoria,   
      horaActual:'',
      conn:null,
      rightDrawerOpen,
      otherValue,
      drawerWidth,
      itemCategoria,
      itemProducto,
      nombrecategoria: ref(""),
      drawerLeft: ref(false),
      drawerRight: ref(true),
      prompt: ref(false),
      address: ref(""),
      Estado: ref(false),    
      page: ref(1),
      current: ref(1),
      nextPage: ref(null),
      totalPages: ref(6),
      itemRefs,
      arrayvacio,
      search,
      columns,
      tab:ref(''),
      proxyDate,
      date2,
      modelo,
      nombreDiados:'',
      nombreDia:ref(''),
      NombreDiaComprobar:'',
      time: ref(''),
      pagination: {
        rowsPerPage: 6,
      },   
      ModalComplemento:ref(false),
      confirm: ref(false),  
      polling: ref(null),
      visibleAnunio:ref(true),
      mobileData: ref(false),
      bluetooth: ref(false) ,
      hora_limite:ref('10:00'),
      shape: ref('efectivo'),

    };
  },
  created() {
    let existe = this.$q.sessionStorage.has("Qsesion"); 
    if (existe==false) {       
         this.$router.push("/")      
    }
  },
  mounted() { 
    this.GetCategoria();
    this.setTime();
    this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd');
    let existe = this.$q.sessionStorage.has("Qsesion"); 
    if (existe==true) {     
        let obj = this.$q.sessionStorage.getItem("Qsesion");
        this.modelo.DES_AUXILIAR = obj.DES_AUXILIAR;
        this.modelo.COD_AUXILIAR = obj.COD_AUXILIAR;
        this.modelUser.des_auxiliar = obj.DES_AUXILIAR;
        this.modelUser.cod_auxiliar = obj.COD_AUXILIAR;    
        this.modelUser.token = obj.token;    
        const datoscli = localStorage.getItem("Qsesion");
        let objd = JSON.parse(datoscli);    
        // this.modelUser.piso_especialidad = objd.Piso;       
        //console.log(obj);
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
    this.conn.onmessage = (e) => {
        this.rcv(e.data);   
       /// console.log(e.data);      
        let json = JSON.parse(e.data);   
        if (json.tipo == "updateProducto") {       
              this.GetProduct(json.id_categoria, json.nombre_categoria,json.horalimite);
        }else{
            //this.Error();
        } 
    };    
  },
  computed: {
    ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2"]),
    getData3() {
      return this.getData().slice(
        (this.page - 1) * this.cantfilas.length,
        (this.page - 1) * this.cantfilas.length + this.cantfilas.length
      );
    },
    getDatas() {
      return this.arrayvacio.slice(
        (this.page - 1) * this.totalPages,
        (this.page - 1) * this.totalPages + this.totalPages
      );
    },
    FilterList() {
      return this.itemProducto.filter((item) => {
        return item.nombre_producto
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
    cantfilas() {
      return this.arrayvacio;
    },
    SumTotal() {      
       if (this.arrayvacio.length>0) {
           this.rightDrawerOpen=true;
       }
       var result = this.arrayvacio.reduce(function (acc, obj) {         
        return acc + obj.total;
      }, 0);
      return result;
    },
    fechaPeruana(){   
        let fechas =this.date.split('-');
        let anio =fechas[2];
        let mes =fechas[1];       
        let dia =fechas[0];      
        let fecha_sql =anio+'-'+mes+'-'+dia;
        this.modelUser.fecha_pedido=fecha_sql;
        let fechape=dia+'-'+mes+'-'+anio;    
        return  fechape;
    },
    diaEntrega: function () {     
        let fechas =this.fecha_hora.split('-');
        let dia =fechas[0];
        let mes =fechas[1];
        let anio =fechas[2];
        let fecha_sql =anio+'-'+mes+'-'+dia;
        this.modelUser.fecha_pedido=fecha_sql;    
        return  moment(fecha_sql).format('dddd');
    }   
  },  
  methods: {  
    CerrarModalcomplemento(){
      this.ModalComplemento=false;
    },
    ListarCarroState(){
        console.log("de state");
        //console.log(this.carrito);
    },
    GetCategoria() {
      let tipo="lista";
      // let url = "/Controller/CategoriaController.php?tipo="+tipo;
      // this.$axios
      //   .get(this.url_base + url)
      //   .then((response) => {
      //     this.itemCategoria = response.data;
      //     // console.log(response.data)
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   })
      //   .finally(() => {});

      let url = "/Controller/CategoriaController.php?tipo="+tipo;
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      this.$axios
        .get(url_b + url)
        .then((response) => {       
            let array=response.data;
            array.forEach((element) => {
              if (element.estado==1) {
                this.itemCategoria.push({
                id_categoria: element.id_categoria,
                nombre_categoria: element.nombre_categoria,
                estado: element.estado,
                logo: element.logo,
                horalimite:element.horalimite
              });
              }              
           });
          this.GetProduct(this.itemCategoria[0].id_categoria,this.itemCategoria[0].nombre_categoria,this.itemCategoria[0].horalimite);    
          this.tab=  this.itemCategoria[0].nombre_categoria;
          this.nombrecategoria = this.itemCategoria[0].nombre_categoria;
          this.id_categoria=this.itemCategoria[0].id_categoria;
          this.hora_limite=this.itemCategoria[0].horalimite;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    GetProduct(id_categoria, nombre,horalimite) {
      if (this.NombreDiaComprobar=='domingo') {
          this.itemProducto = [];
      }else{
         // this.fecha_sql= moment(new Date()).format("YYYY-MM-DD");
          this.nombrecategoria = nombre;
          this.hora_limite=horalimite;
          this.tab=  nombre;
          this.id_categoria=id_categoria;        
          let tipo="dia";
          let url = "/Controller/ProductoController.php?tipo="+tipo+"&dia=" +this.nombreDia+"&id_categoria="+this.id_categoria+"&fecha_sql="+this.fecha_sql;           
          let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
          this.$axios
            .get(url_b + url)
            .then((response) => {          
              this.itemProducto = response.data;
            })
            .catch(function (error) {
              console.log(error);
            })
            .finally(() => {});
       }     
    },
    GetProducto2(){
       //   this.nombrecategoria = nombre;
    //  let tipo="categoria";
    //  let url = "/Controller/ProductoController.php?tipo="+tipo+"&id_categoria=" + this.id_categoria;
      let tipo="dia";
      let url = "/Controller/ProductoController.php?tipo="+tipo+"&dia=" +this.nombreDia+"&id_categoria="+this.id_categoria+"&fecha_sql="+this.fecha_sql;
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
    this.$axios
        .get(url_b + url)
        .then((response) => {
          this.itemProducto = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    rcv(data){
      this.GetProducto2();
    },
    ChangeDate(e){    
      if (e==null) {  
          let array =this.fecha_actual.split('/');
          let dia =array[2];
          let mes =array[1];
          let anio=array[0];
          let fecha1 =dia+'-'+mes+'-'+anio;
          let fechaSql=anio+'-'+mes+'-'+dia;
          this.fecha_sql=fechaSql;   
         this.date=fecha1;      
         this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd');           
         this.GetProducto2();
      }else{              
          this.arrayvacio=[];        
          let array =e.split('-');
          let dia =array[0];
          let mes =array[1];
          let anio=array[2];
          let fecha1 =anio+'/'+mes+'/'+dia;
          let fechaSql=anio+'-'+mes+'-'+dia;
          this.fecha_sql=fechaSql;
          this.nombreDia =moment(new Date(fecha1)).format('dddd'); 
          let tipo="dia";      
                 
        if (this.nombreDia=='domingo') {
           //console.log('no entra a la peticion ');
           this.NombreDiaComprobar='domingo'
           this.itemProducto = [];
        }else{
          if (this.nombreDia=="" || this.nombreDia ==null ) {        
             // console.log("datos nulos");
        }else{      
          this.NombreDiaComprobar='libre';
          let url = "/Controller/ProductoController.php?tipo="+tipo+"&dia=" +this.nombreDia+"&id_categoria="+this.id_categoria+"&fecha_sql="+ this.fecha_sql;
          let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
          this.$axios
          .get(url_b + url)
          .then((response) => {
            this.itemProducto = response.data;
          //  console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => {});
          }  
        }              
      }
    },
    Cancelar() {
      this.arrayvacio = [];
    },
    getData() {
      return this.arrayvacio;
    },
    DeleteItem(id_producto,entrada) {
      const indx = this.arrayvacio.findIndex((v) => v.id_producto === id_producto && v.entrada==entrada);
      this.arrayvacio.splice(indx, 1);
    },
    MoreProductPorFechas(id_producto,stock,usastock,fecha_sql){
            let obj2 =this.arrayvacio.find((x) => x.fecha_pedido == fecha_sql && x.id_producto==id_producto);
            let position2 = this.arrayvacio.findIndex((x) => x.fecha_pedido == fecha_sql && x.id_producto==id_producto);
            let cantidad_pedido = obj2.cantidad_pedido;
            let fecha_pedido = obj2.fecha_pedido;
            let id_produc = obj2.id_producto;
            let precio = obj2.precio;
            this.arrayvacio[position2].cantidad_pedido = cantidad_pedido + 1;
            this.arrayvacio[position2].total =  precio * this.arrayvacio[position2].cantidad_pedido;
            this.arrayvacio[position2].stock = stock;    

    },
    MoreProduct(id_producto,stock,usastock,fecha_sql,entrada,subcategoria) {      
     
    //  if (usastock==1) {
      // const indx = this.arrayvacio.findIndex((v) => v.id_producto === id_producto && v.entrada==entrada);
          if (subcategoria==1) {
             let obj = this.arrayvacio.find((x) => x.id_producto == id_producto && x.entrada==entrada);
             let position = this.arrayvacio.findIndex((x) => x.id_producto == id_producto && x.entrada==entrada );
             let cantidad_pedido = obj.cantidad_pedido;         
              let precio = obj.precio;
              let producto =obj.producto;
              this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
              this.arrayvacio[position].total =
              precio * this.arrayvacio[position].cantidad_pedido;
              this.AgregaoItem(producto);
          }else{
               let obj = this.arrayvacio.find((x) => x.id_producto == id_producto );
             let position = this.arrayvacio.findIndex((x) => x.id_producto == id_producto );
             let cantidad_pedido = obj.cantidad_pedido;         
              let precio = obj.precio;
              let producto =obj.producto;
              this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
              this.arrayvacio[position].total =
              precio * this.arrayvacio[position].cantidad_pedido;
              this.AgregaoItem(producto);
          }

            // let obj = this.arrayvacio.find((x) => x.id_producto == id_producto && x.entrada==entrada);
            // let position = this.arrayvacio.findIndex((x) => x.id_producto == id_producto && x.entrada==entrada );
            // let cantidad_pedido = obj.cantidad_pedido;        
            // let precio = obj.precio;
            // let producto =obj.producto;
            // this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
            // this.arrayvacio[position].total =
            // precio * this.arrayvacio[position].cantidad_pedido;
            // this.AgregaoItem(producto);


         //   }
      // }else{  
      //     let obj = this.arrayvacio.find((x) => x.id_producto == id_producto);
      //       let position = this.arrayvacio.findIndex(
      //         (x) => x.id_producto == id_producto
      //       );
      //         let cantidad_pedido = obj.cantidad_pedido;           
      //         let precio = obj.precio;
      //         let producto =obj.producto;
      //         this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
      //         this.arrayvacio[position].total =
      //         precio * this.arrayvacio[position].cantidad_pedido;
      //         this.AgregaoItem(producto);            
      // }     
     
    },
    MoreProductAnterior(id_producto,stock,usastock,fecha_sql) {      
      if (usastock==1) {
            let obj2 =this.arrayvacio.find((x) => x.fecha_pedido == fecha_sql && x.id_producto==id_producto);
            let position2 = this.arrayvacio.findIndex((x) => x.fecha_pedido == fecha_sql && x.id_producto==id_producto);
            let cantidad_pedido = obj2.cantidad_pedido;
            let fecha_pedido = obj2.fecha_pedido;
            let id_produc = obj2.id_producto;
            let precio = obj2.precio;
            this.arrayvacio[position2].cantidad_pedido = cantidad_pedido + 1;
            this.arrayvacio[position2].total =  precio * this.arrayvacio[position2].cantidad_pedido;
            this.arrayvacio[position2].stock = stock;    
            // let obj = this.arrayvacio.find((x) => x.id_producto == id_producto);
            // let position = this.arrayvacio.findIndex( (x) => x.id_producto == id_producto);
            // let cantidad_pedido = obj.cantidad_pedido;
            // if (cantidad_pedido==stock) {
            //     this.Mucho();
            // }else{
            //   let precio = obj.precio;
            //   let producto =obj.producto;
            //   this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
            //   this.arrayvacio[position].total =
            //   precio * this.arrayvacio[position].cantidad_pedido;
            //   this.AgregaoItem(producto);
            // }

      }else{  
              let obj = this.arrayvacio.find((x) => x.id_producto == id_producto);
              let position = this.arrayvacio.findIndex((x) => x.id_producto == id_producto);
              let cantidad_pedido = obj.cantidad_pedido;           
              let precio = obj.precio;
              let producto =obj.producto;
              this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
              this.arrayvacio[position].total = precio * this.arrayvacio[position].cantidad_pedido;
              this.AgregaoItem(producto);            
      }     
     
    },   
    MinusProduct(id_producto,stock,fecha_sql,entrada,subcategoria) {
      console.log(subcategoria)
         if (subcategoria==1) {
              let obj = this.arrayvacio.find((x) => x.id_producto == id_producto && x.entrada==entrada);
              let position = this.arrayvacio.findIndex(
                (x) => x.id_producto == id_producto  && x.entrada==entrada
              );
              let cantidad_pedido = obj.cantidad_pedido;
              if (cantidad_pedido == 1) {
              } else {
                cantidad_pedido = cantidad_pedido - 1;
                this.arrayvacio[position].cantidad_pedido = cantidad_pedido;
                let precio = obj.precio;
                this.arrayvacio[position].total =
                  precio * this.arrayvacio[position].cantidad_pedido;
              }
           }else{
               let obj = this.arrayvacio.find((x) => x.id_producto == id_producto );
              let position = this.arrayvacio.findIndex(
                (x) => x.id_producto == id_producto 
              );
              let cantidad_pedido = obj.cantidad_pedido;
              if (cantidad_pedido == 1) {
              } else {
                cantidad_pedido = cantidad_pedido - 1;
                this.arrayvacio[position].cantidad_pedido = cantidad_pedido;
                let precio = obj.precio;
                this.arrayvacio[position].total =
                  precio * this.arrayvacio[position].cantidad_pedido;
              }
           }
    },
    AgregaoItem(title){
       this.$q.notify({
              message: "Agregado "+ title,
              color: "accent",
              position: "top",
              actions: [
                {
                  label: "X",
                  color: "white",
                  handler: () => {                   
                  },
                },
              ],
        });
    },
    StorePedido() {
    this.modelUser.hora_pedido=this.timeactual;
    let valifecha =this.modelUser.fecha_pedido;   
     if ( this.modelUser.hora_pedido=="") {
        this.TipoMensaje('hora');
     }
     else if(this.modelUser.fecha_pedido==""){
        this.TipoMensaje('fecha');
     }  
     else if(this.modelUser.fecha_pedido=="undefined-undefined-"){
        this.TipoMensaje('fecha');
     }   
     else if(this.modelUser.area==""){
        this.TipoMensaje('area');
     }  
     else if(this.modelUser.piso_especialidad==""){
        this.TipoMensaje('piso');
     }     
     else{   
        let fechas =this.fecha_hora.split('/');
        let dia =fechas[0];
        let mes =fechas[1];
        let anio =fechas[2];
        let fechaenviar =anio+'/'+mes+'/'+dia;
        let lista = [];
        this.modelUser.TotalPedido = this.SumTotal;
       // let obj = this.$q.sessionStorage.getItem("Qsesion");
       //  obj.Piso=this.modelUser.piso_especialidad;
        const datoscli = localStorage.getItem("Qsesion");
        const objd = JSON.parse(datoscli);
        objd.Piso = this.modelUser.piso_especialidad;
        const updateo = JSON.stringify(objd);
        localStorage.setItem("Qsesion", updateo);
  
        this.arrayvacio.forEach((element) => {
          lista.push({
            id_categoria: element.id_categoria,
            id_producto: element.id_producto,
            cantidad_pedido: element.cantidad_pedido,
            descripcion: element.descripcion,
            usastock: element.usastock,
            fecha_pedido: element.fecha_pedido,
            entrada: element.entrada,
          });
        });   
        this.modelUser.detallePedido = lista;
        let data = this.modelUser;
        //console.log(data);               
        //envia al socket  php no borrar  
        this.conn.send(JSON.stringify(data));
        this.Enviado();
        this.prompt = false;
        this.Cancelar();
      }       
    },
    MensajeToken(){
         const dialog = $q.dialog({
            title: 'Uploading...',
            dark: true,
            message: '0%',
            progress: {
              spinner: QSpinnerGears,
              color: 'amber'
            },
            persistent: true, // we want the user to not be able to close it
            ok: false // we want the user to not be able to close it
          })

      // we simulate some progress here...
     
      
    },     
    TipoMensaje(campo){
        this.$q
          .dialog({
            dark: true,
            title: "Ups",
            message: "Falta llenar el campo "+campo,
            class:"colorborde"
          })
          .onOk(() => {       
          })
          .onCancel(() => {           
          })
          .onDismiss(() => { });
          
    },
    LastOrder(){
      let tipo="lastorder";
      let url = "/Controller/PedidoController.php?tipo="+tipo+"&cod_auxiliar=" +this.modelUser.cod_auxiliar;
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
     this.$axios
        .get(url_b + url)
        .then((response) => {           
           let existe= response.data.EXISTE         
           if (existe=="Si" ) {
              let piso=response.data.piso_especialidad;
              this.modelUser.piso_especialidad=piso;             
           }else{
              this.modelUser.piso_especialidad="1";
           }           
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    MensajeEnviar() {
      this.fecha_pedido=this.fecha_hora;
      this.timeactual=ref(moment().format('HH:mm'));
      if (this.arrayvacio.length > 0) {
        this.LastOrder();
        this.prompt = true;
      } else {
        this.$q
          .dialog({
            dark: true,
            title: "Ups",
            message: "No tienes nada de Pedido",
            class:"colorborde"
          })
          .onOk(() => {            
          })
          .onCancel(() => {           
          })
          .onDismiss(() => {           
          });
      }
    },
    AgregarCarrito(modelo){   
    //  console.log(modelo);
      if (modelo.estado==0) {
           this.$q
          .dialog({
            dark: true,
            title: "Ups",
            message: "Producto no Disponible",
            class:"colorborde"
          })
          .onOk(() => {            
          })
          .onCancel(() => {           
          })
          .onDismiss(() => {           
          });
      }else{
        if (modelo.usasubcategoria==1) {
          this.$refs.modalcomplemento.GetComplementos(modelo.id_categoria,this.nombreDia);   
          this.ModalComplemento=true;      
          this.$refs.modalcomplemento.RecibeModelo(modelo);
      }else{
         let obj = this.arrayvacio.find((x) => x.id_producto == modelo.id_producto);
         if (obj) {
            let position = this.arrayvacio.findIndex((x) => x.id_producto == modelo.id_producto );
            let cantidad_pedido = obj.cantidad_pedido;          
            let precio = obj.precio;
            this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
            this.arrayvacio[position].total =  precio * this.arrayvacio[position].cantidad_pedido;
            this.arrayvacio[position].stock = modelo.stock;         
         } else{
            this.arrayvacio.push(modelo);           
         }
         this.AgregaoItem(modelo.producto);
      }  
      }
         
    },
    AddEntrada(modelo){
         let obj = this.arrayvacio.find((x) => x.id_producto == modelo.id_producto);
         if (obj) {            
            let obj2 =this.arrayvacio.find((x) => x.id_producto == modelo.id_producto && x.entrada==modelo.entrada);
            if (obj2) {
              let position = this.arrayvacio.findIndex((x) => x.id_producto == obj2.id_producto  && x.entrada==obj2.entrada);
              let cantidad_pedido = obj2.cantidad_pedido;          
              let precio = obj2.precio;
              this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
              this.arrayvacio[position].total =  precio * this.arrayvacio[position].cantidad_pedido;
              this.arrayvacio[position].stock = modelo.stock;              
            }else{
                 this.arrayvacio.push(modelo); 
            }
         } else{
            this.arrayvacio.push(modelo);   
         }
         this.AgregaoItem(modelo.producto);
    },
    StorePedido2() {
      let lista = [];    
      this.arrayvacio.forEach((element) => {
        lista.push({
          id_categoria: element.id_categoria,
          id_producto: element.id_producto,
          cantidad_pedido: element.cantidad_pedido,
          descripcion: element.descripcion,
        });
      });
      this.modelUser.detallePedido = lista;
      this.modelUser.TotalPedido = this.SumTotal;
      let url = "/Controller/PedidoController.php";
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      const data = this.modelUser;
      this.$axios({
        method: "POST",
        url: url_b + url,
        data: data,
      })
        .then(function (response) {
          let result = response.data.resultado;       
          if (result == "Registrado") {
             alert("Registrado");
            this.Cancelar();
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Enviado() {
      this.$q
        .dialog({
          title: "Mensaje",
          message: "Se ha Enviado tu Pedido",
          class:"colorborde"
        })
        .onOk(() => {          
        })
        .onCancel(() => {         
        })
        .onDismiss(() => {        
        });
    },
    Error(){
       this.$q
        .dialog({
          dark: true,
          title: "Perdon ",
          message: "tu  pedido no se registro algun error con el servidor llama a (Central de datos)",
        })
        .onOk(() => {         
        })
        .onCancel(() => {        
        })
        .onDismiss(() => {          
        });
    },
    Mucho(){
       this.$q
        .dialog({
          dark: true,
          title: "Ups",
          message: "No tenemos Tanto Stock :(",
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    GenerarPago(){
        let me =this;            
        let url ="/GenerarPago.php";
        let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;
        const data={
          amount:50,
          currency:'PE'
           }
            this.$axios({
            method: "POST",
            url: url_b+ url,
            data:data,              
          })
            .then(function(response) {     
            //  console.log(response);
              me.prompt = true;
              me.Token=response.data.token;
        })
        .catch((error) => {
          console.log(error); 
              
        }); 
    },
    setTime () {
				setInterval(() => {      
					this.horaActual= moment().format('LTS')
        
				}, 1000)
		},
    validateToken(token){
    },
    logoutNotify() {
      this.$router.push({ path: "/" });
      this.$q.sessionStorage.remove("Qsesion");
      this.$q.sessionStorage.clear();
      localStorage.removeItem("Qsesion");
      localStorage.removeItem('token');
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
    setTime() {
				setInterval(() => {      
					this.horaActual2= moment().format('LTS')
				}, 1000)
		 },   
     ocultar(){      
        this.visibleAnunio=false
        console.log( this.visibleAnunio)
     },
     consultaEstado(){
     } 
  },  
};
</script>
<style scoped>
.footer2 {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>
