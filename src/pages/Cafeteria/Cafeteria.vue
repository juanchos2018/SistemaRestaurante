<template>
  <q-page class="q-pa-sm">
    <q-layout
      view="lhh LpR lfr"
      container
      style="height: 90vh"
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
              <!-- style="max-width: 100px" -->
              <q-td
                :props="props"
                class="no-margin no-padding"
                style="max-width: 150px"
              >
                <q-item>
                  <q-item-section>
                    <q-item-label>{{ props.row.producto }}</q-item-label>
                  </q-item-section>
                  <q-tooltip
                    anchor="center left"
                    self="center right"
                    class="bg-amber text-white shadow-4"
                    :offset="[10, 10]"
                  >
                    Agregar descripcion
                  </q-tooltip>
                </q-item>

                <q-popup-edit
                  v-model="props.row.descripcion"
                  :title="props.row.producto"
                  auto-save
                  v-slot="scope"
                >
                  <q-input
                    v-model="scope.value"
                    dense
                    autofocus
                    counter
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-td>
            </template>
            <template v-slot:body-cell-Cantidad="props">
              <!-- style="max-width: 100px" -->
              <q-td :props="props" class="no-margin">
                <q-item class="no-margin no-padding">
                  <q-item-section>
                    <div style="display: flex">
                      <q-btn
                        icon="fas fa-minus"
                        size="sm"
                        flat
                        dense
                        @click="MinusProduct(props.row.id_producto)"
                      />
                      <strong>
                        <q-item-label style="margin: 5px">{{
                          props.row.cantidad_pedido
                        }}</q-item-label></strong
                      >
                      <q-btn
                        icon="fas fa-plus"
                        size="sm"
                        class="q-ml-sm"
                        flat
                        dense
                        @click="MoreProduct(props.row.id_producto)"
                      />
                      <q-chip
                        outline
                        square
                        color="deep-orange"
                        text-color="white"
                      >
                        S/ {{ props.row.total }}
                      </q-chip>
                    </div>
                  </q-item-section>
                </q-item>
              </q-td>
            </template>
            <template v-slot:body-cell-icon="props">
              <q-td :props="props">
                <q-item class="no-margin no-padding">
                  <q-item-section>
                    <q-item-label>
                      <!-- <span class="text-blue">
                        <q-btn icon="fas fa-list" size="md" color="red" flat  />
                      </span> -->
                      <span class="text-blue">
                        <q-btn
                          icon="delete"
                          size="md"
                          color="red"
                          flat
                          @click="DeleteItem(props.row.id)"
                        />
                      </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-td>
            </template>
<!-- parseFloat(data.precio_producto).toFixed(2) -->
            <template v-slot:top-right>
              <label for="" style="font-size: 20px">{{  parseFloat(SumTotal).toFixed(2) }}</label>
            </template>
          </q-table>
          <q-banner
            dense
            class="bg-primary text-white"
            style="
              position: absolute;
              bottom: 0px;
              right: 10px;
              width: 100%;
              height: 112px;
            "
          >
            <template v-slot:action>
              <q-btn
                color="bg-positive"
                glossy
                push
                label="Enviar"
                @click="MensajeEnviar"
              />
              <q-btn
                color="deep-orange"
                push
                label="Cancelar"
                @click="Cancelar"
              />
            </template>
          </q-banner>
        </div>
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
            <div v-if="!itemProducto.length">
              <center>
                <h5>SIN PRODUCTOS</h5>
              </center>
            </div>
            <div
              class="col-md-3 col-lg-3 col-sm-12 col-xs-12"
              v-for="item in FilterList"
              :key="item.id_producto"
            >
              <card-product :data="item" v-on:additem="additem"></card-product>
            </div>
          </div>

          <q-page-sticky position="top" expand class="bg-accent text-white">
            <q-toolbar>
              <q-btn flat round dense icon="map" />
              <q-toolbar-title>{{ nombrecategoria }}</q-toolbar-title>
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
                    <q-btn
                      color="blue-grey-9"
                      push
                      class="q-pa-sm q-ml-md"
                      @click="GetProduct(item.id_categoria, item.nombre_categoria)"
                    >
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

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 390px">
        <q-card-section>
          <div class="text-h6">Juan Carlos Panty Sihuayro</div>
          <div class="text-subtitle2">Especialidad</div>
        </q-card-section>

        <div class="row">
          <div class="col-6">
            <q-item>
              <q-input
                dense
                outlined
                class="full-width"
                type="number"
                label="Piso Area"
                v-model="modelUser.piso_especialidad"
              />
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-input
                dense
                outlined
                class="full-width"
                label="Area"
                v-model="modelUser.area"
              />
            </q-item>
          </div>
        </div>
        <!-- <q-card-section class="q-pt-none">
          <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" placeholder="Piso" />
        </q-card-section> -->

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Enviar Pedido"  @click="StorePedido" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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


import { provide, defineComponent, defineAsyncComponent } from "vue";
//import {ref} from 'vue'

import { mapState } from "vuex";

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
      conn: new WebSocket("ws://192.168.3.219:8090"),
      itemCategoria,
      itemProducto,
      nombrecategoria: ref(""),
      drawerLeft: ref(false),
      drawerRight: ref(true),
      prompt: ref(false),
      address: ref(""),
      Estado: ref(false),

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

      modelUser: {
        fecha_pedido: "",
        hora_pedido: "10f4",
        estado_pedido: 0,
        cod_auxiliar: "024107",
        especialidad: "especi",
        area: "",
        piso_especialidad: "2",
        des_auxiliar: "juan",
        detallePedido: [],
        TotalPedido: 0,
        color:'bg-positive'
      },
    };
  },

  mounted() {
    this.GetCategoria();
    this.conn.onopen = (e) => {
      console.log("conectado we");
    };
    this.conn.onmessage = (e) => {
      // this.rcv(e.data);
      //this.noti2();
    };
  },

  methods: {
    GetCategoria() {
      let url ="/Controller/CategoriaController.php"
      this.$axios
        .get(this.url_base+url)
        .then((response) => {
          this.itemCategoria = response.data;
          this.GetProduct(this.itemCategoria[0].id_categoria);
          this.nombrecategoria = this.itemCategoria[0].nombre_categoria;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    GetProduct(id_categoria, nombre) {
      this.nombrecategoria = nombre;
      let url= "/Controller/ProductoController.php?id_categoria=" + id_categoria;
      this.$axios
        .get(this.url_base+url)
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
      const indx = this.arrayvacio.findIndex(
        (v) => v.id_producto === id_producto
      );
      this.arrayvacio.splice(indx, 1);
    },
    MoreProduct(id_producto) {
      let obj = this.arrayvacio.find((x) => x.id_producto == id_producto);
      let position = this.arrayvacio.findIndex(
        (x) => x.id_producto == id_producto
      );
      let cantidad_pedido = obj.cantidad_pedido;
      let precio = obj.precio;
      this.arrayvacio[position].cantidad_pedido = cantidad_pedido + 1;
      this.arrayvacio[position].total =
        precio * this.arrayvacio[position].cantidad_pedido;
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
      let lista = [];
      this.arrayvacio.forEach((element) => {
        lista.push({
          id_categoria: element.id_categoria,
          id_producto: element.id_producto,
          cantidad_pedido: element.cantidad_pedido,
          descripcion: element.descripcion
        });
      });
      this.modelUser.detallePedido = lista;
      this.modelUser.TotalPedido = this.SumTotal;

      let data = this.modelUser;
      //envia al socket  php
      console.log(data)
      this.conn.send(JSON.stringify(data));
      this.Enviado();
      this.prompt = false;
      this.Cancelar();
    },
    MensajeEnviar() {
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
        url: this.url_base+ url,
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
    Enviado(){
          this.$q.dialog({
        title: 'Mensaje',
        message: 'Se ha Enviado tu Pedido'
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  },
  computed: {
    ...mapState(["url_base"]),
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
