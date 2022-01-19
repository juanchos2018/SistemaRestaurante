<template>
  <q-page class="q-pa-sm">
    <label for="" class="text-h6">Producto de la Categoria  {{modelo.nombre_categoria}}</label>
    <br />
    <br />
     <q-btn-group push>
        <q-btn push icon="fas fa-id-card" @click="TipoVista=true" />
        <q-btn push  icon="fas fa-table"  @click="TipoVista=false"/>      
    </q-btn-group>    
    <q-btn position="right" class="float-right" color="primary" label="Nuevo Producto" @click="AddProducto" />
    <br />
    <br />    
    <div v-if="TipoVista">
       <div class="row q-col-gutter-sm">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="item in itemProducto" :key="item.id">
        <card-producto :id_producto="item.id_producto" :nombre_producto="item.nombre_producto" :descripcion="item.descripcion" :precio_venta="item.precio_ventas" :nombre_categoria="item.nombre_categoria" :logo="item.logo" :stock="item.stock"  :usastock="item.usastock" :photo="item.imagen" 
          :lunes="item.dia_uno"  :martes="item.dia_dos"   :miercoles="item.dia_tres"  :jueves="item.dia_cuatro" :viernes="item.dia_cinco" :sabado="item.dia_seis" v-on:updateProduct="UpdateProduct" @getproduct="getproduct"></card-producto>
      </div>
    </div>
    </div>   
    <div v-else > 
        <tables-basic :data="itemProducto"  v-on:UpdateProduct="UpdateProduct"></tables-basic>
    </div>      

    <dialogo-add-producto   @CerrarModal="CerrarModal" :DialogoAddProducto="DialogoAddProducto"    v-bind:id_categoria="modelo.id_categoria"  v-bind:subcategoria="modelo.subcategoria"  v-on:GetProductos="Get" v-on:subcategoria="subcategoria"   ref="dialogaddproducto"></dialogo-add-producto>
    <dialogo-update-producto @CerrarModal="CerrarModal" :DialogoEditProducto="DialogoEditProducto" v-bind:id_categoria="modelo.id_categoria"  v-bind:subcategoria="modelo.subcategoria"  v-on:GetProductos="Get" ref="dialogoupdaute"></dialogo-update-producto>
    <dialogo-subcategoria   @CerrarModalsub="CerrarModalsub" :DialogoSubCategoria="DialogoSubcategoria" v-bind:id_categoria="modelo.id_categoria"  v-on:getsubcategoria="getsubcategoria" ></dialogo-subcategoria>
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
    DialogoSubcategoria: defineAsyncComponent(() =>
      import("./DialogoSubcategoria")
    ),  
    TablesBasic: defineAsyncComponent(() => import('components/tables/TableBasic'))

  },
  data() {
    return {     
      DialogoEditProducto: false,      
      DialogoAddProducto: false,     
      DialogoSubcategoria: false,     
      itemProducto: [],
      itemSubcategoria: [],
      TipoVista:true,   
      id_producto:0,
      modelo: {
        id_categoria: 0,
        nombre_categoria: "",
        estado: 1,
        subcategoria:0

      },
    };
  },
  computed: {
      ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2"]),
  },
  mounted() {  
      //console.log("iid es :" + this.id_categoria);
      this.modelo.id_categoria = parseInt(this.id_categoria);
      this.Get(this.modelo.id_categoria);
      this.InfoCategoria();
  },
  methods: {
    subcategoria(){
       this.DialogoSubcategoria = true;
    },
    AddProducto() {
      this.DialogoAddProducto = true;
    },
    Get(idcategoria) {
      let url =
        "/Controller/ProductoControllerCo.php?id_categoria=" + idcategoria;
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;  
      this.$axios
        .get(url_b + url)
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
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;  
      let url =  "/Controller/ProductoControllerCo.php?id_categoria=" + this.modelo.id_categoria;
      this.$axios
        .get(url_b + url)
        .then((response) => {
          //console.log(response);
          this.itemProducto = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    getsubcategoria(id){
       console.log("regtorna");
       console.log(id);
       this.$refs.dialogaddproducto.getsubcategoria(id);

      // let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;  
      // let tipo="lista";
      // let url =  "/Controller/SubCategoriaController.php?tipo="+tipo+"&id_categoria=" + this.modelo.id_categoria;
      // this.$axios
      //   .get(url_b + url)
      //   .then((response) => {       
      //     this.itemSubcategoria = response.data;
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   })
      //   .finally(() => {});
    },
    InfoCategoria(){
        let tipo="view";
        let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;  
        let url = "/Controller/CategoriaController.php?tipo="+tipo+"&id_categoria="+this.id_categoria;
       this.$axios
        .get(url_b + url)
        .then((response) => {
          this.modelo = response.data;
          // console.log(response.data)
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
    },
    CerrarModalsub(){
        this.DialogoSubcategoria = false;
    }
  },
});
</script>

<style>
</style>
