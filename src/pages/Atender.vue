<template>
  <q-page class="q-pa-sm">
    <q-layout
      view="lhh LpR lfr"
      container
      style="height: 89vh"
      class="shadow-2 rounded-borders"
    >
      <q-drawer
        side="right"
        v-model="drawerRight"
        bordered
        :width="400"
        :breakpoint="500"
        class="bg-grey-3"
      >
        <!-- <q-scroll-area class="fit"> -->
        <div class="q-pa-sm">
          <q-table
            color="green-6"
            card-class="bg-blue-grey-9 text-white"
            table-class="bg-green-6 text-white"
            table-header-class="bg-grey-7 text-white "
            bordered
            title="Total"
            :rows="getData3"
            :columns="columns"
            hide-header
            virtual-scroll
            :pagination.sync="pagination"
            :hide-pagination="false"
          >
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
                      <q-btn icon="fas fa-minus" size="sm" flat dense />
                      <q-item-label style="margin: 5px;" >{{ props.row.cantidad }}</q-item-label>
                      <q-btn
                        icon="fas fa-plus"
                        size="sm"
                        class="q-ml-sm"
                        flat
                        dense
                        @click="MoreProduct(props.row.id)"
                      />
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
                        <!-- <q-icon name="delete"  color="red" size="20px" ></q-icon>  ['xs', 'sm', 'md', 'lg', 'xl']"
-->
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

            <!-- <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense/>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense/>
          </q-td>
        </template> -->
          </q-table>
          <q-banner
            dense
            class="bg-primary text-white"
            style="position: absolute; bottom: 5px; right: 10px;width:100%"
          >
           
            <template v-slot:action>
              <q-btn color="primary" glossy push label="Enviar" />

              <q-btn color="deep-orange" push label="Cancelar" />
            </template>
          </q-banner>
          <!-- <q-footer>           
         
           <h5 color="teal">hola we</h5>
                   <q-btn push color="teal" text-color="white" label="Procesar" />

           </q-footer> -->

          <!-- <q-pagination
                    side="bottom"
                    v-model="page"
                    color="teal"
                    :min="current"
                    :max="Math.ceil(cantfilas.length/totalPages)"              
                    :ellipses="false"
                    :boundary-numbers="false"
                    />  -->
        </div>
        <!-- </q-scroll-area> -->
      </q-drawer>

      <q-page-container>
        <q-page style="padding-top: 60px" class="q-pa-md">
          <div>
            <q-card class="no-border no-shadow bg-transparent">
              <q-card-section class="q-pa-sm">
                <q-input
                  rounded
                  v-model="search"
                  outlined
                  placeholder="Buscar Producto"
                >
                  <template v-slot:append>
                    <q-icon v-if="search === ''" name="search" />
                    <q-icon
                      v-else
                      name="clear"
                      class="cursor-pointer"
                      @click="search = ''"
                    />
                  </template>
                </q-input>
              </q-card-section>
            </q-card>
          </div>
          <div class="row q-col-gutter-sm">
            <div
              class="col-md-4 col-lg-4 col-sm-12 col-xs-12"
              v-for="item in data"
              :key="item.id"
            >
              <card-product :data="item" v-on:additem="additem"></card-product>
            </div>        
          </div>

          <q-page-sticky position="top" expand class="bg-accent text-white">
            <q-toolbar>
              <q-btn flat round dense icon="map" />
              <q-toolbar-title>Bebidas</q-toolbar-title>
            </q-toolbar>
          </q-page-sticky>
        </q-page>
      </q-page-container>

      <q-footer>
        <q-card dark bordered>
          <q-card-section class="row q-pa-sm">
            <q-virtual-scroll :items="comidas" virtual-scroll-horizontal>
              <template v-slot="{ item, index }">
                <div :key="index">
                  <div>
                    <q-btn color="blue-grey-9" push class="q-pa-sm q-ml-md">
                      <div class="row items-center no-wrap q-pa-sm">
                        <i class="fas fa-cocktail fa-4x"></i>
                      </div>
                    </q-btn>
                    <br />
                    <div style="text-align: center">
                      <label for=""> {{ item.nombre }}</label>
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
  { name: "Producto", label: "Producto", field: "Producto", align: "left" ,style: 'white-space: pre-line'},
  { name: "Cantidad", field: "Cantidad", label: "Cantidad" },

  { name: "precio", label: "precio", field: "precio" },

  { name: "icon", label: "icon", field: "icon" },
];

const comidas = [
  {
    id: 1,
    nombre: "Bebidas",
  },
  {
    id: 2,
    nombre: "Platos",
  },
  {
    id: 3,
    nombre: "Desayunos",
  },
  {
    id: 4,
    nombre: "Almuerzos",
  },
  {
    id: 5,
    nombre: "Cenas",
  },
];

const rows = [
  { id: 1, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 2, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 3, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 4, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 5, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 6, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 7, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 8, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 9, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 10, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 11, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 12, producto: "producto1", cantidad: 1, precio: 12 },
  { id: 13, producto: "producto 13", cantidad: 1, precio: 12 },
];



const maxSize = 30;
const heavyList = [];

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: "Option " + (i + 1),
  });
}

const data = [
  {
    id: 1,
    title: "plato comida",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 2,
    amount: "30",
    img: require("../assets/products/c-d-x-PDX_a_82obo-unsplash.jpg"),
    chip: "Discount 90%",
    chip_color: "grey-4",
    chip_class: "text-blue absolute-top-right",
  },
  {
    id: 2,
    title: "patatas ",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "15",
    img: require("../assets/products/frankie-valentine-VghbBAYqUJ0-unsplash.jpg"),
  },
  {
    id: 3,
    title: "producto 3",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 1,
    amount: "50",
    img: require("../assets/products/giorgio-trovato-K62u25Jk6vo-unsplash.jpg"),
    chip: "Sold Out",
    chip_color: "grey-8",
    chip_class: "text-white absolute-top-right",
  },
  {
    id: 4,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 5,
    amount: "70",
    img: require("../assets/products/jeroen-den-otter-iKmm0okt6Q4-unsplash.jpg"),
    chip: "Discount 50%",
    chip_color: "grey-4",
    chip_class: "text-blue absolute-top-right",
  },
  {
    id: 5,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 2,
    amount: "50",
    img: require("../assets/products/john-fornander-m2WpKnlLcEc-unsplash .jpg"),
  },
  {
    id: 6,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "30",
    img: require("../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg"),
  },
  {
    id: 7,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "30",
    img: require("../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg"),
  },
  {
    id: 8,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "30",
    img: require("../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg"),
  },
  {
    id: 9,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "30",
    img: require("../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg"),
  },
  {
    id: 10,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "30",
    img: require("../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg"),
  },
  {
    id: 11,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "30",
    img: require("../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg"),
  },
  {
    id: 12,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "30",
    img: require("../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg"),
  },
  {
    id: 13,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "30",
    img: require("../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg"),
  },
  {
    id: 14,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "30",
    img: require("../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg"),
  },
  {
    id: 15,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "30",
    img: require("../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg"),
  },
  {
    id: 16,
    title: "Our Changing Planet 16",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "30",
    img: require("../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg"),
  },
];
import { provide, defineComponent, defineAsyncComponent } from "vue";
//import {ref} from 'vue'

export default {
  name: "Footer",
  components: {
    CardProduct: defineAsyncComponent(() =>
      import("components/cards/CardProduct")
    ),
  },

  setup() {
    let itemRefs = [];
    const AgregarCarrito = () => {};
    const arrayvacio = ref([]);
    provide("arrayvacio", arrayvacio);
    const search = ref("");
    return {
      heavyList,
      comidas,
      data,
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
        rowsPerPage: 6, // current rows per page being displayed
      },
    };
  },

  methods: {
    getData() {
      return this.arrayvacio;
    },
    additem(id, title, cant, preci) {

      this.rows.push({
        id: id,
        producto: title,
        cantidad: cant,
        precio: preci,
      });
      alert("areg")
      // this.itemRefs.push({id:id,producto:title,cantidad:cant,precio:preci})
      console.log(id, title, cant, preci);
    },
    DeleteItem(id){
     // alert(id)
      // this.arrayvacio.splice(id, 1);  
        this.arrayvacio.splice(this.arrayvacio.find(x=>x.id==id), 1);
       console.log(id)
    },
    MoreProduct(id){
         let obj  = this.arrayvacio.find(x=>x.id==id);
         let position = this.arrayvacio.findIndex(x=>x.id==id);
         let cantidad =obj.cantidad
          let precio =obj.precio;
         this.arrayvacio[position].cantidad =cantidad+1
          //  this.arrayvacio[position].precio =precio+parseInt(preci)
        // arrayva.value[position].precio =precio+parseInt(preci)
        // console.log(obj);
    }
  },
  computed: {
    getData2() {
      return this.getData().slice(
        (this.page - 1) * this.totalPages,
        (this.page - 1) * this.totalPages + this.totalPages
      );
    },
    getData3() {
      return this.getData().slice(
        (this.page - 1) * this.cantfilas.length,
        (this.page - 1) * this.cantfilas.length + this.cantfilas.length
      );
    },
    cantfilas() {
      return this.arrayvacio;
    },
    SumTotal() {
   
      var result = this.arrayvacio.reduce(function (acc, obj) {
        return acc + obj.precio;
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
