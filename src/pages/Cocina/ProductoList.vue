<template>
  <q-page class="q-pa-sm">
      <q-btn-group push>
      <q-btn push  icon="fas fa-table" />
      <q-btn push icon="fas fa-id-card" />
    </q-btn-group>

    <q-btn position="right" class="float-right" color="primary" label="Nuevo Producto" @click="AddProducto" />
    <br />
    <br />
    <br />
    <div class="row q-col-gutter-sm">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="item in itemProducto" :key="item.id">
        <card-producto :id_producto="item.id_producto" :nombre_producto="item.nombre_producto" :descripcion="item.descripcion" :precio_producto="item.precio_producto" :nombre_categoria="item.nombre_categoria" v-on:UpdateProduct="UpdateProduct"></card-producto>
      </div>
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
  },
  data() {
    return {
      itemProducto: [],
      TipoVista:false,
      modelo: {
        id_categoria: 0,
        nombre_categoria: "",
        estado: 1,
      },
      DialogoAddProducto: false,
      DialogoEditProducto: false,
      id_producto:0,
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
