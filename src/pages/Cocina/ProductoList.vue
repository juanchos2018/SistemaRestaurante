<template>
  <q-page class="q-pa-sm">
     <q-btn-group push>
        <q-btn push icon="fas fa-id-card" @click="TipoVista=true" />
      <q-btn push  icon="fas fa-table"  @click="TipoVista=false"/>      
    </q-btn-group>
    
    <q-btn position="right" class="float-right" color="primary" label="Nuevo Producto" @click="AddProducto" />
    <br />
    <br />
    <br />

    <div v-if="TipoVista">
       <div class="row q-col-gutter-sm">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="item in itemProducto" :key="item.id">
        <card-producto :id_producto="item.id_producto" :nombre_producto="item.nombre_producto" :descripcion="item.descripcion" :precio_venta="item.precio_ventas" :nombre_categoria="item.nombre_categoria" :logo="item.logo" :stock="item.stock"  :usastock="item.usastock" :photo="item.imagen" v-on:UpdateProduct="UpdateProduct" @getproduct="getproduct"></card-producto>
      </div>
    </div>
    </div>   
    <div v-else > 
        <tables-basic :data="itemProducto"  v-on:UpdateProduct="UpdateProduct"></tables-basic>
    </div>   
    <dialogo-add-producto   @CerrarModal="CerrarModal" :DialogoAddProducto="DialogoAddProducto" v-bind:id_categoria="modelo.id_categoria" v-on:GetProductos="Get"></dialogo-add-producto>
    <dialogo-update-producto @CerrarModal="CerrarModal" :DialogoEditProducto="DialogoEditProducto"  ref="dialogoupdaute" v-on:GetProductos="Get"></dialogo-update-producto>

  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "ProductoList",
  props: {
    id_categoria: {
      type: String,
      required: true,
      default: 0,
    },
  },
  components: {
    CardProducto: defineAsyncComponent(() =>
      import("components/cards/CardProducto")
    ),
    DialogoAddProducto: defineAsyncComponent(() =>
      import("./DialogoAddProducto")
    ),
    DialogoUpdateProducto: defineAsyncComponent(() =>
      import("./DialogoUpdateProducto")
    ),
    TablesBasic: defineAsyncComponent(() => import('components/tables/TableBasic'))

  },
  data() {
    return {     
      DialogoEditProducto: false,      
      DialogoAddProducto: false,     
      itemProducto: [],
      TipoVista:true,   
      id_producto:0,
      modelo: {
        id_categoria: 0,
        nombre_categoria: "",
        estado: 1,
      },
    };
  },
  computed: {
    ...mapState(["url_base"]),
  },
  mounted() {  
    //console.log("iid es :" + this.id_categoria);
      this.modelo.id_categoria = parseInt(this.id_categoria);
      this.Get(this.modelo.id_categoria);
  },
  methods: {
    AddProducto() {
      this.DialogoAddProducto = true;
    },
    Get(idcategoria) {
      let url =
        "/Controller/ProductoController.php?id_categoria=" + idcategoria;
      this.$axios
        .get(this.url_base + url)
        .then((response) => {
         // console.log(response);
          this.itemProducto = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    getproduct() {
      //console.log("desde ihjo")
      let url =
        "/Controller/ProductoController.php?id_categoria=" + this.modelo.id_categoria;
      this.$axios
        .get(this.url_base + url)
        .then((response) => {
          //console.log(response);
          this.itemProducto = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    Existe() {
      this.$q
        .dialog({
          dark: true,
          title: "Ups",
          message: "Nombre de categoria ya existe",
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
    CerrarModal() {
      this.DialogoAddProducto = false;
      this.DialogoEditProducto=false;
    },
    UpdateProduct(id){      
        this.$refs.dialogoupdaute.View(id);
        this.DialogoEditProducto = true;    
    }
  },
});
</script>

<style>
</style>
