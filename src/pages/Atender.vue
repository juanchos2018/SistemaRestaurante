<template>
  <q-page class="q-pa-sm">
    <q-layout view="lhh LpR lfr" container style="height: 89vh" class="shadow-2 rounded-borders">
      <q-drawer side="right" v-model="drawerRight" bordered :width="400" :breakpoint="500" class="bg-grey-3">
        <div class="q-pa-sm">
          <q-table color="green-6" card-class="bg-blue-grey-9 text-white" table-class="bg-green-6 text-white" table-header-class="bg-grey-7 text-white " bordered title="Total" :rows="getData3" :columns="columns" hide-header virtual-scroll :pagination.sync="pagination" :hide-pagination="false">
            <template v-slot:body-cell-Producto="props">
              <q-td :props="props" style="max-width: 100px">
                <q-item>
                  <q-item-section>
                    <q-item-label>{{ props.row.producto }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-td>
            </template>
            <template v-slot:body-cell-Cantidad="props">
              <q-td :props="props" style="max-width: 100px">
                <q-item>
                  <q-item-section>
                    <div style="display:flex;">
                      <q-btn icon="fas fa-minus" size="sm" flat dense @click="MinusProduct(props.row.id_producto)" />
                      <q-item-label style="margin: 5px;">{{ props.row.cantidad_pedido }}</q-item-label>
                      <q-btn icon="fas fa-plus" size="sm" class="q-ml-sm" flat dense @click="MoreProduct(props.row.id_producto)" />
                      <q-chip outline square color="deep-orange" text-color="white">
                        S/ {{ props.row.total }}
                      </q-chip>
                    </div>
                  </q-item-section>
                </q-item>
              </q-td>
            </template>
            <template v-slot:body-cell-icon="props">
              <q-td :props="props">
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      <span class="text-blue">
                        <q-btn icon="delete" size="md" color="red" flat @click="DeleteItem(props.row.id)" />
                      </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-td>
            </template>

            <template v-slot:top-right>
              <label for="" style="font-size: 20px">{{ SumTotal }}</label>
            </template>
          </q-table>
          <q-banner dense class="bg-primary text-white" style="position: absolute; bottom: 5px; right: 10px;width:100%">

            <template v-slot:action>
              <q-btn color="primary" glossy push label="Enviar" @click="StorePedido" />
              <q-btn color="deep-orange" push label="Cancelar" @click="Cancelar" />
            </template>
          </q-banner>
        </div>
      </q-drawer>
      <q-page-container>
        <q-page style="padding-top: 60px" class="q-pa-md">
          <div>          
            <q-card class="no-border no-shadow bg-transparent">
              <q-card-section class="q-pa-sm">
                <q-input rounded v-model="search" outlined placeholder="Buscar Producto">
                  <template v-slot:append>
                    <q-icon v-if="search === ''" name="search" />
                    <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
                  </template>
                </q-input>
              </q-card-section>
            </q-card>
          </div>
          <div class="row q-col-gutter-sm">
            <div v-if="!itemProducto.length">
              <center>
                <h5>SIN PRODUCTOS</h5>
              </center>

            </div>
            <div class="col-md-3 col-lg-4 col-sm-12 col-xs-12" v-for="item in FilterList" :key="item.id_producto">
              <card-product :data="item" v-on:additem="additem"></card-product>

            </div>
          </div>

          <q-page-sticky position="top" expand class="bg-accent text-white">
            <q-toolbar>
              <q-btn flat round dense icon="map" />
              <q-toolbar-title>{{nombrecategoria}}</q-toolbar-title>
            </q-toolbar>
          </q-page-sticky>
        </q-page>
      </q-page-container>

      <q-footer>
        <q-card dark bordered>
          <q-card-section class="row q-pa-sm">
            <q-virtual-scroll :items="itemCategoria" virtual-scroll-horizontal>
              <template v-slot="{ item, index }">
                <div :key="index">
                  <div>
                    <q-btn color="blue-grey-9" push class="q-pa-sm q-ml-md" @click="GetProduct(item.id_categoria,item.nombre_categoria)">
                      <div class="row items-center no-wrap q-pa-sm">
                        <i class="fas fa-cocktail fa-3x"></i>
                      </div>
                    </q-btn>
                    <br />
                    <div style="text-align: center">
                      <label for=""> {{ item.nombre_categoria }}</label>
                    </div>
                  </div>
                </div>
              </template>
            </q-virtual-scroll>
          </q-card-section>
        </q-card>
      </q-footer>
    </q-layout>
  </q-page>
</template>

<script>
import { ref } from "vue";

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

const rows = [
  { id: 1, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 2, producto: "producto1", cantidad: 1, precio: 12 },
];

const maxSize = 30;
const heavyList = [];

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: "Option " + (i + 1),
  });
}

import { provide, defineComponent, defineAsyncComponent } from "vue";
//import {ref} from 'vue'
export default {
  name: "Atender",
  components: {
    CardProduct: defineAsyncComponent(() =>
      import("components/cards/CardProduct")
    ),
  },

  setup() {
    let itemRefs = [];
    const AgregarCarrito = () => {};
    const arrayvacio = ref([]);
    const itemCategoria = ref([]);
    const itemProducto = ref([]);
    provide("arrayvacio", arrayvacio);
    const search = ref("");
    return {
      conn: new WebSocket('ws://localhost:8090'), 
      itemCategoria,
      itemProducto,
      nombrecategoria:ref(""),
      drawerLeft: ref(false),
      drawerRight: ref(true),

      columns,
      rows,
      page: ref(1),
      current: ref(1),
      nextPage: ref(null),
      totalPages: ref(5),
      itemRefs,
      AgregarCarrito,
      arrayvacio,
      search,
      pagination: {
        rowsPerPage: 6,
      },
   
    modelUser:{
      fecha_pedido:'',
      hora_pedido:'10f4',
      estado_pedido:1,
      cod_auxiliar:'024107', 
      especialidad:'especi',
      piso_especialidad:'2',    
      des_auxiliar:'juan', 
      detallePedido:[],
      TotalPedido:0,
    }

    };
  },

  mounted() {
    this.GetCategoria();
    this.conn.onopen=(e)=>{
       console.log("conectado we");
    }
    this.conn.onmessage=(e)=>{
      // this.rcv(e.data);
       //this.noti2();
     }
  },

  methods: {
    GetCategoria() {
      this.$axios
        .get("http://localhost/ApiCafeteria/Controller/CategoriaController.php")
        .then((response) => {
          this.itemCategoria = response.data;
          this.GetProduct(this.itemCategoria[0].id_categoria);
          this.nombrecategoria=this.itemCategoria[0].nombre_categoria;

        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    GetProduct(id_categoria,nombre) {
      this.nombrecategoria=nombre;
      this.$axios
        .get(
          "http://localhost/ApiCafeteria/Controller/ProductoController.php?id_categoria=" +
            id_categoria
        )
        .then((response) => {
          this.itemProducto = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    Cancelar() {
      this.arrayvacio = [];
    },
    getData() {
      return this.arrayvacio;
    },
    additem(id, title, cant, preci) {
      alert("areg");
      this.rows.push({
        id: id,
        producto: title,
        cantidad: cant,
        precio: preci,
      });    
      console.log(id, title, cant, preci);
    },
    DeleteItem(id_producto) {
      const indx = this.arrayvacio.findIndex((v) => v.id_producto === id_producto);
      this.arrayvacio.splice(indx, 1);
    },
    MoreProduct(id_producto) {
      let obj = this.arrayvacio.find((x) => x.id_producto == id_producto);
      let position = this.arrayvacio.findIndex((x) => x.id_producto == id_producto);
      let cantidad_pedido = obj.cantidad_pedido;
      let precio = obj.precio;
      this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
      this.arrayvacio[position].total =
        precio * this.arrayvacio[position].cantidad_pedido;
    },
    MinusProduct(id_producto) {
      let obj = this.arrayvacio.find((x) => x.id_producto == id_producto);
      let position = this.arrayvacio.findIndex((x) => x.id_producto == id_producto);
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
    StorePedido(){
       let lista =[];
       this.arrayvacio.forEach(element => {     
           lista.push({id_categoria:element.id_categoria,id_producto:element.id_producto,cantidad_pedido:element.cantidad_pedido})
        });
        this.modelUser.detallePedido= lista ;
        this.modelUser.TotalPedido=this.SumTotal;

        let data =this.modelUser;
      
      	this.conn.send(JSON.stringify(data));
        alert("Registrado");
        this.Cancelar();
     },
     StorePedido2(){
       let lista =[];
       this.arrayvacio.forEach(element => {     
           lista.push({id_categoria:element.id_categoria,id_producto:element.id_producto,cantidad_pedido:element.cantidad_pedido})
        });
        this.modelUser.detallePedido= lista ;
        this.modelUser.TotalPedido=this.SumTotal;
   
       let url ="http://localhost/ApiCafeteria/Controller/PedidoController.php";
       const data = this.modelUser;
        this.$axios({
        method: "POST",
        url: url,
        data: data,       
      })
        .then(function(response) {  
          let result =response.data.resultado;
          console.log(response)
          if (result=="Registrado") {
               alert("Registrado");
               this.Cancelar();
             
          }else{          
           
          }          
        })
        .catch((error) => {
          console.log(error);         
        });
     
    },

  },
  computed: {
    getData3() {
      return this.getData().slice(
        (this.page - 1) * this.cantfilas.length,
        (this.page - 1) * this.cantfilas.length + this.cantfilas.length
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
