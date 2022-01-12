<template>
  <q-page class="q-pa-sm">
    <q-layout view="lhh LpR lfr" container style="height: 90vh" class="shadow-2 rounded-borders">
      <q-drawer side="right" show-if-above v-model="rightDrawerOpen" bordered :breakpoint="500" :width="drawerWidth" class="no-margin no-padding">
        <div class="q-pa-sm no-margin no-padding">    
          <q-bar style="min-width: 250px;" class="bg-teal text-white rounded-borders">
            <div class="cursor-pointer non-selectable">
              Mi Pedido
               <!-- {{horaActual}} -->
            </div>
            <q-space />
            <label for="" style="font-size: 20px">S/ {{  parseFloat(SumTotal).toFixed(2) }}</label>
          </q-bar>
          <!-- <q-item-label header>Mi Pedido</q-item-label> -->
          <!-- <q-item-section header>
            <q-item-label >Mi Pedido</q-item-label>
            <q-item-label >5 min ago</q-item-label>
          </q-item-section> -->
          <br>
          <q-list class="no-margin no-padding" separator v-for="item in getDatas" :key="item.id_producto">
            <q-item>
              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-weight-medium">{{ item.producto }}</span>
                </q-item-label>
                 <q-item-label v-if="item.descripcion==''" caption lines="1">
                 Click Aqui para tu detalle
                </q-item-label>
                <q-item-label v-else caption lines="1">
                  {{ item.descripcion }}
                </q-item-label>
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
                  <q-btn size="12px" flat dense round icon="fas fa-minus" @click="MinusProduct(item.id_producto,item.stock)" />
                  <q-btn size="12px" flat dense round icon="fas fa-plus" @click="MoreProduct(item.id_producto,item.stock,item.usastock)" />
                  <q-btn size="12px" flat dense round icon="delete" @click="DeleteItem(item.id_producto)" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
          <div class="q-pa-lg flex flex-center">
            <q-pagination v-model="page" :min="current" :max="Math.ceil(arrayvacio.length / totalPages)" :input="true" input-class="text-orange-10">
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
          <div>                   
             <q-btn-dropdown color="red" :label="nombreDia+' - '+date" dropdown-icon="change_history"     class="float-right"  >
               <q-date
                  v-model="date"     
                  @update:model-value="ChangeDate($event)"
                />
              </q-btn-dropdown>  
          </div>
          <br>
          <br>
          <br>        
          <div class="row q-col-gutter-sm">
            <div v-if="!itemProducto.length">
              <h5>SIN PRODUCTOS</h5>
            </div>
            <div class="col-md-3 col-lg-3 col-sm-6 col-xs-6" v-for="item in itemProducto" :key="item.id_producto">
              <card-product :data="item"></card-product>
            </div>
          </div>
          <q-page-sticky position="top" expand class="bg-dark text-white">
            <q-toolbar>
              <!-- <q-btn flat round dense icon="map" />
              <q-toolbar-title>{{ nombrecategoria }}</q-toolbar-title> -->  
               <q-tabs                   
                  inline-label
                  shrink
                  stretch
                  active-color="red-1"
                >
               <q-tab v-for="item in itemCategoria" :key="item.id_categoria"  :label="item.nombre_categoria" :icon="item.logo"   @click="
                      GetProduct(item.id_categoria, item.nombre_categoria)" />
                </q-tabs>                 
              <q-space />
              <div class="q-gutter-sm row items-center no-wrap">
                <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
              </div>
            </q-toolbar>
          </q-page-sticky>
        </q-page>
      </q-page-container>
    </q-layout>
    <q-dialog v-model="prompt" persistent>
      <q-card >
        <q-card-section>
          <div class="text-h6">{{modelo.DES_AUXILIAR}}</div>
          <!-- <div class="text-subtitle2">Area</div> -->
        </q-card-section>
        <div class="row">
          <div class="col-6">
            <q-item>
              <q-input dense outlined class="full-width" type="number" max='9' label="Piso " v-model="modelUser.piso_especialidad" />
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-input dense outlined class="full-width" label="Area" v-model="modelUser.area" />
            </q-item>          
          </div>   
          <div class="col-6">
            <q-item>        
               <q-input dense outlined class="full-width" v-model="timeactual"  type="time" mask="HH*mm**ss" hint="Hora" />   
            </q-item>          
          </div>   

          <div class="col-6">
            <q-item>          
              <q-input bottom-slots   dense outlined class="full-width"  v-model="fechaPeruana"  readonly >
                <template v-slot:hint>
                  <q-badge outline color="secondary" :label="nombreDia" />
                  </template>
              </q-input>
              <!-- <q-input bottom-slots  dense outlined  class="full-width" v-model="fecha_hora"  readonly>   
                <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">               
                  <q-date v-model="proxyDate" mask="DD-MM-YYYY"    >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancel" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
                  <template v-slot:hint>
                  <q-badge outline color="secondary" :label="diaEntrega" />
                  </template>
              </q-input>       -->
            </q-item>          
          </div>            
        </div>  
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Enviar Pedido" @click="StorePedido" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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

import { provide, defineAsyncComponent, ref,reactive } from "vue";
import { mapState } from "vuex";
import { useQuasar } from "quasar";
import moment from 'moment'
import "moment/locale/es";
export default {
  name: "Cafeteria",
  components: {
    CardProduct: defineAsyncComponent(() =>
      import("components/cards/CardProduct")
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
        color: "bg-positive", });    
      //  let  fecha_hora=ref(moment(new Date()).format("DD/MM/YYYY"))
        let todaysDate = new Date();
        const date2 = ref(moment(new Date()).local().format("DD/MM/YYYY"))
        const proxyDate = ref(moment(new Date()).local().format("DD-MM-YYYY"))
        const fecha_hora=ref(moment(new Date()).local().format("DD-MM-YYYY"));
        let  fecha_actual= ref(moment(new Date()).format("YYYY/MM/DD"));
        let  fecha_actual2= ref(moment(new Date()).format("YYYY/MM/DD"));
    return {
      proxyDate,
      date2,
      modelo,
      nombreDiados:'',
      nombreDia:'',
      NombreDiaComprobar:'',
      time: ref(''),
      date: ref(moment(new Date()).local().format("YYYY/MM/DD")), 
      fecha_actual,

      timeactual:ref(moment.utc().add(7,'hours').format('hh:mm:ss') ),     
      datehoy : Date.now(),     
      fecha_hora,
      todaysDate,   
      date1: ref('2019/02/01'),
      optionsFn (fecha_hora) {
        return fecha_hora >= '2022/01/15' && fecha_hora <= '2022/01/20'
      },

      updateProxy () {
        //proxyDate.value = date2.value
      },
      save () {
        fecha_hora.value = proxyDate.value
      },    
        
      Token:ref(''),
      modelUser,
      index_categoria:0,
      id_categoria,   
      horaActual:'',
      conn:null,
      rightDrawerOpen,
      otherValue,
      drawerWidth,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      itemCategoria,
      itemProducto,
      nombrecategoria: ref(""),
      drawerLeft: ref(false),
      drawerRight: ref(true),
      prompt: ref(false),
      address: ref(""),
      Estado: ref(false),
      columns,
      page: ref(1),
      current: ref(1),
      nextPage: ref(null),
      totalPages: ref(6),
      itemRefs,
      arrayvacio,
      search,
      pagination: {
        rowsPerPage: 6,
      },   
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
    this.conn= new WebSocket(this.url_socket);
    let existe = this.$q.sessionStorage.has("Qsesion"); 
    if (existe==true) {     
        let obj = this.$q.sessionStorage.getItem("Qsesion");
        this.modelo.DES_AUXILIAR = obj.DES_AUXILIAR;
        this.modelo.COD_AUXILIAR = obj.COD_AUXILIAR;
        this.modelUser.des_auxiliar = obj.DES_AUXILIAR;
        this.modelUser.cod_auxiliar = obj.COD_AUXILIAR;
    } 
    
    this.conn.onopen = (e) => {
         console.log("conectado WebSocket");
    };
    this.conn.onmessage = (e) => {
       this.rcv(e.data);      
    };    
  },
  computed: {
    ...mapState(["url_base",'url_izipay','url_socket','carrito']),
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
      var result = this.arrayvacio.reduce(function (acc, obj) {
        return acc + obj.total;
      }, 0);
      return result;
    },
    fechaPeruana(){
        let fechas =this.date.split('/');
        let anio =fechas[0];
        let mes =fechas[1];       
        let dia =fechas[2];       

        let fecha_sql =anio+'-'+mes+'-'+dia;
        this.modelUser.fecha_pedido=fecha_sql;
        let fechape=dia+'-'+mes+'-'+anio;
    //    this.modelUser.fecha_pedido=fecha_sql; 
     ///   console.log(this.modelUser.fecha_pedido)
        return  fechape;
    },
    diaEntrega: function () {     
        let fechas =this.fecha_hora.split('-');
        let dia =fechas[0];
        let mes =fechas[1];
        let anio =fechas[2];
        let fecha_sql =anio+'-'+mes+'-'+dia;
        this.modelUser.fecha_pedido=fecha_sql; 
        console.log(this.modelUser.fecha_pedido)
        return  moment(fecha_sql).format('dddd');
    },
  },
  methods: {
    onItemClick(){

    },
    ListarCarroState(){
        console.log("de state");
        console.log(this.carrito);
    },
    GetCategoria() {
      let url = "/Controller/CategoriaController.php";
      this.$axios
        .get(this.url_base + url)
        .then((response) => {
           // this.itemCategoria = response.data;
            let array=response.data;
            array.forEach((element) => {
              if (element.estado==1) {
                this.itemCategoria.push({
                id_categoria: element.id_categoria,
                nombre_categoria: element.nombre_categoria,
                estado: element.estado,
                logo: element.logo,
              });
              }              
           });

          this.GetProduct(this.itemCategoria[0].id_categoria);
        //  this.index_categoria=0;
          this.nombrecategoria = this.itemCategoria[0].nombre_categoria;
          this.id_categoria=this.itemCategoria[0].id_categoria;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    GetProduct(id_categoria, nombre) {
      if (this.NombreDiaComprobar=='domingo') {
          this.itemProducto = [];
      }else{
          this.nombrecategoria = nombre;
          this.id_categoria=id_categoria;
          console.log(id_categoria)
          let tipo="dia";
          let url = "/Controller/ProductoController.php?tipo="+tipo+"&dia=" +this.nombreDia+"&id_categoria="+this.id_categoria;
        // let url = "/Controller/ProductoController.php?tipo="+tipo+"&id_categoria=" + id_categoria;
          this.$axios
            .get(this.url_base + url)
            .then((response) => {
              //console.log(response)
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
      let url = "/Controller/ProductoController.php?tipo="+tipo+"&dia=" +this.nombreDia+"&id_categoria="+this.id_categoria;
      this.$axios
        .get(this.url_base + url)
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
      // let fecha =e;
      //  console.log(e);
      // this.nombreDia=moment(new Date(e)).format('dddd');
      // console.log(this.nombreDia);
      // console.log(this.nombreDia);

      if (e==null) {       
        this.date=this.fecha_actual
        this.nombreDia=moment(new Date(this.fecha_actual)).format('dddd');
        this.GetProducto2();
      }else{           
        this.nombreDia=moment(new Date(e)).format('dddd');
        this.arrayvacio=[];
        console.log(this.nombreDia);
        let tipo="dia";       
        this.date=e;            
        if (this.nombreDia=='domingo') {
           console.log('no entra a la peticion ');
           this.NombreDiaComprobar='domingo'
           this.itemProducto = [];
        }else{
          if (this.nombreDia=="" || this.nombreDia ==null ) {
              this.id_categoria=9999999;
              console.log("datos nulos");
        }else{      
         this.NombreDiaComprobar='libre';
          let url = "/Controller/ProductoController.php?tipo="+tipo+"&dia=" +this.nombreDia+"&id_categoria="+this.id_categoria;
          this.$axios
          .get(this.url_base + url)
          .then((response) => {
            this.itemProducto = response.data;
            console.log(response)
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
    DeleteItem(id_producto) {
      const indx = this.arrayvacio.findIndex(
        (v) => v.id_producto === id_producto
      );
      this.arrayvacio.splice(indx, 1);
    },
    MoreProduct(id_producto,stock,usastock) {      
      if (usastock==1) {
            let obj = this.arrayvacio.find((x) => x.id_producto == id_producto);
            let position = this.arrayvacio.findIndex(
              (x) => x.id_producto == id_producto
            );
            let cantidad_pedido = obj.cantidad_pedido;
            if (cantidad_pedido==stock) {
                this.Mucho();
            }else{
              let precio = obj.precio;
              let producto =obj.producto;
              this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
              this.arrayvacio[position].total =
              precio * this.arrayvacio[position].cantidad_pedido;
              this.AgregaoItem(producto);
            }
      }else{  
          let obj = this.arrayvacio.find((x) => x.id_producto == id_producto);
            let position = this.arrayvacio.findIndex(
              (x) => x.id_producto == id_producto
            );
              let cantidad_pedido = obj.cantidad_pedido;           
              let precio = obj.precio;
              let producto =obj.producto;
              this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
              this.arrayvacio[position].total =
              precio * this.arrayvacio[position].cantidad_pedido;
              this.AgregaoItem(producto);            
      }     
     
    },
    AgregaoItem(title){
       this.$q.notify({
              message: "Agregado "+ title,
              color: "accent",
              position: "top",
        });
    },
    MinusProduct(id_producto) {
      let obj = this.arrayvacio.find((x) => x.id_producto == id_producto);
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
        /// console.log(array)
          let fechas =this.fecha_hora.split('/');
          let dia =fechas[0];
          let mes =fechas[1];
          let anio =fechas[2];
          let fechaenviar =anio+'/'+mes+'/'+dia;
      // this.modelUser.fecha_pedido =moment(new Date(fechaenviar)).format('YYYY/MM/DD');
       
        let lista = [];
        this.modelUser.TotalPedido = this.SumTotal;
       
        this.arrayvacio.forEach((element) => {
          lista.push({
            id_categoria: element.id_categoria,
            id_producto: element.id_producto,
            cantidad_pedido: element.cantidad_pedido,
            descripcion: element.descripcion,
            usastock: element.usastock,
          });
        });
        this.modelUser.detallePedido = lista;
        let data = this.modelUser;
        console.log(data);       
        //envia al socket  php no borrar  
        this.conn.send(JSON.stringify(data));
        this.Enviado();
        this.prompt = false;
        this.Cancelar();
     }
        

    },
    VerHora(){
      console.log(this.horaActual)
    },
    TipoMensaje(campo){
        this.$q
          .dialog({
            dark: true,
            title: "Ups",
            message: "Falta llenar el campo "+campo,
          })
          .onOk(() => {
            // console.log('OK')
          })
          .onCancel(() => {
            // console.log('Cancel')
          })
          .onDismiss(() => {  });
          
    },
    MensajeEnviar() {
      this.fecha_pedido=this.fecha_hora;
      if (this.arrayvacio.length > 0) {
        this.prompt = true;
      } else {
        this.$q
          .dialog({
            dark: true,
            title: "Ups",
            message: "No tienes nada de Pedido",
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
      }
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
      const data = this.modelUser;
      this.$axios({
        method: "POST",
        url: this.url_base + url,
        data: data,
      })
        .then(function (response) {
          let result = response.data.resultado;
          console.log(response);
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
        const data={
          amount:50,
          currency:'PE'
           }
            this.$axios({
            method: "POST",
            url: me.url_izipay+ url,
            data:data,              
          })
            .then(function(response) {     
              console.log(response);
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
  },
  
};
</script>

<style scoped>
.footer2 {
  position: fixed;

  bottom: 0;
  width: 100%;
}

</style>
