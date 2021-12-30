<template>
  <q-page class="q-pa-sm">
    <q-btn
      position="right"
      class="float-right"
      color="primary"
      label="Nuevo Producto"
      @click="AddCategoria"
    />
    <br />
    <br />
    <br />
    <div class="row q-col-gutter-sm">
      <div
        class="col-md-4 col-lg-4 col-sm-12 col-xs-12"
        v-for="item in itemProducto"
        :key="item.id"
      >
        <card-producto
          :id_producto="item.id_producto"
          :nombre="item.nombre_producto"
        ></card-producto>
      </div>
    </div>


       <dialogo-add-producto @CerrarModal="CerrarModal" :DialogoAddProducto="DialogoAddProducto" v-bind:id_categoria="id_categoria" ></dialogo-add-producto>


  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "Tables",
  props: ["id_categoria"],
  components: {
    CardProducto: defineAsyncComponent(() =>
      import("components/cards/CardProducto")
    ),
     DialogoAddProducto: defineAsyncComponent(() =>
      import("./DialogoAddProducto")
    ),
  },
  data() {
    return {
      itemProducto: [],
      modelo: {
        id_categoria: 0,
        nombre_categoria: "",
        estado: 1,
      },
     DialogoAddProducto:false,

    };
  },
  mounted() {
    this.Get();
  },
  methods: {
    AddCategoria() {
        this.DialogoAddProducto=true;
    },
    Store(nombre) {
      let me = this;
      me.modelo.nombre_categoria = nombre;
      let url =
        "http://localhost/ApiCafeteria/Controller/CategoriaController.php";
      const data = me.modelo;
      this.$axios({
        method: "POST",
        url: url,
        data: data,
      })
        .then(function (response) {
          // console.log(response);
          let result = response.data.resultado;
          if (result == "Regigstrado") {
            alert("Registrado");
            me.Get();
          } else {
            me.Existe();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Get() {
      this.$axios
        .get(
          "http://localhost/ApiCafeteria/Controller/ProductoController.php?id_categoria=1"
        )
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
      CerrarModal(){
            this.DialogoAddProducto=false;
      }
  },
});
</script>

<style>
</style>
