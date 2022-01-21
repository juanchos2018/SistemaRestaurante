<template>
  <q-page class="q-pa-sm">
    <br />
    <br />
    <q-splitter v-model="splitterModel" >
      <template v-slot:before >   
           <br><br>             
        <q-tabs v-model="tab" vertical   >
          <q-tab name="producto" icon="mail" label="producto"  />
          <q-tab
            name="alarms"
            icon="alarm"
            :label="item.nombre_subcategoria"
            v-for="item in itemSubCategorias"
            :key="item.id_subcategoria"
            @click="onChanges(item.id_subcategoria,item.nombre_subcategoria)"
          />
        </q-tabs>        
      </template>    

      <template v-slot:after>     
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="producto">
            <q-btn-group push>
              <q-btn push icon="fas fa-id-card" @click="TipoVista = true" />
              <q-btn push icon="fas fa-table" @click="TipoVista = false" />
            </q-btn-group>
            <q-btn
              position="right"
              class="float-right"
              color="primary"
              label="Nuevo Producto"
              @click="AddProducto"
            />
            <br />
            <br />

            <div v-if="TipoVista">
              <div class="row q-col-gutter-sm">
                <div
                  class="col-md-4 col-lg-4 col-sm-12 col-xs-12"
                  v-for="item in itemProducto"
                  :key="item.id"
                >
                  <card-producto
                    :id_producto="item.id_producto"
                    :nombre_producto="item.nombre_producto"
                    :descripcion="item.descripcion"
                    :precio_venta="item.precio_ventas"
                    :nombre_categoria="item.nombre_categoria"
                    :logo="item.logo"
                    :stock="item.stock"
                    :usastock="item.usastock"
                    :photo="item.imagen"
                    :lunes="item.dia_uno"
                    :martes="item.dia_dos"
                    :miercoles="item.dia_tres"
                    :jueves="item.dia_cuatro"
                    :viernes="item.dia_cinco"
                    :sabado="item.dia_seis"
                    v-on:updateProduct="UpdateProduct"
                    @getproduct="getproduct"
                  ></card-producto>
                </div>
              </div>
            </div>
            <div v-else>
              <tables-basic
                :data="itemProducto"
                v-on:UpdateProduct="UpdateProduct"
              ></tables-basic>
            </div>
          </q-tab-panel>
          <q-tab-panel name="alarms">
             <q-btn
              position="right"
              class="float-right"
              color="primary"
              :label="nombre_boton"
              @click="Addcomplemento"
            />
            <!-- TipoVistados -->
            <!-- <div class="text-h5 q-mb-md">{{nombre_tipo}}</div> -->
             <q-btn-group push>
              <q-btn push icon="fas fa-id-card" @click="TipoVistados = true" />
              <q-btn push icon="fas fa-table" @click="TipoVistados = false" />
            </q-btn-group>
<br />
            <br />

            <div v-if="TipoVistados==true">
                <div class="row q-col-gutter-sm">
                <div
                  class="col-md-4 col-lg-4 col-sm-12 col-xs-12"
                  v-for="item in itemComplemento"
                  :key="item.id_complemento"
                >
                  <card-complemento
                    :id_complemento="item.id_complemento"
                    :id_subcategoria="item.id_subcategoria"
                    :nombre_subcategoria="item.nombre_subcategoria"
                    :descripcion="item.descripcion"   
                    :lunes="item.dia_uno"
                    :martes="item.dia_dos"
                    :miercoles="item.dia_tres"
                    :jueves="item.dia_cuatro"
                    :viernes="item.dia_cinco"
                    :sabado="item.dia_seis"
                    @updateComplemento="updateComplemento"
                  ></card-complemento>
                </div>
              </div>
            </div>
            <div v-else>
              <table-basic-complemento
                :data="itemComplemento"
                v-on:updateComplemento="updateComplemento"
              ></table-basic-complemento>
            </div>

            
         
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
<!-- v-bind:subcategoria="modelo.subcategoria" -->
    <dialogo-add-producto   @CerrarModal="CerrarModal" :DialogoAddProducto="DialogoAddProducto"    v-bind:id_categoria="modelo.id_categoria"  v-bind:subcategoria="modelo.subcategoria"  v-on:GetProductos="Get" v-on:subcategoria="subcategoria"   ref="dialogaddproducto"></dialogo-add-producto>
    <dialogo-update-producto @CerrarModal="CerrarModal" :DialogoEditProducto="DialogoEditProducto" v-bind:id_categoria="modelo.id_categoria"    v-on:GetProductos="Get" ref="dialogoupdaute"></dialogo-update-producto>
  
   <!--
    <dialogo-subcategoria   @CerrarModalsub="CerrarModalsub" :DialogoSubCategoria="DialogoSubcategoria" v-bind:id_categoria="modelo.id_categoria"  v-on:getsubcategoria="getsubcategoria" ></dialogo-subcategoria>
  -->
    <dialogo-add-complemento   @CerrarModal="CerrarModalcomplemento" :DialogoAddComplemento="DialogoComplemento"  v-on:getComplemnentos="GetComplemento" ref="dialogcomplemento" ></dialogo-add-complemento>

    <dialogo-update-complemento @CerrarModal="CerrarModal" :DialogoEditComplemento="DialogoEditComplemento"     ref="dialogoupdatecomplemento"></dialogo-update-complemento>

  </q-page>
</template>

<script>

import { defineComponent, defineAsyncComponent, ref } from "vue";
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
    DialogoAddComplemento: defineAsyncComponent(() =>
      import("./DialogoAddComplemento")
    ),
    TablesBasic: defineAsyncComponent(() =>
      import("components/tables/TableBasic")
    ),
    TableBasicComplemento: defineAsyncComponent(() =>
      import("components/tables/TableBasicComplemento")
    ),
    CardComplemento: defineAsyncComponent(() =>
      import("components/cards/CardComplemento")
    ),
     DialogoUpdateComplemento: defineAsyncComponent(() =>
      import("./DialogoUpdateComplemento")
    )  
   
  },
  data() {
    return {     
  
      DialogoAddProducto: false,
      DialogoSubcategoria: false,
      DialogoComplemento: false,
      DialogoEditProducto:false,
      DialogoEditComplemento:false,
      nombre_boton:'NUEVO PRODUCTO',
      nombre_tipo:'',
      itemProducto: [],
      itemSubcategoria: [],
      itemSubCategorias: [],
      itemComplemento: [],
      TipoVista: true,
      TipoVistados:true,
      id_producto: 0,
      modelo: {
        id_categoria: 0,
        nombre_categoria: "",
        estado: 1,
        subcategoria: 0,
      },
      tab: ref("producto"),
      splitterModel: ref(9),
      subcategorias: [],
      datos:{
          id_subcategoria:0,
          nombre_subcategoria:''
      }    
    };
  },
  computed: {
    ...mapState([
      "url_base",
      "url_base2",
      "url_izipay",
      "url_socket",
      "url_socket2",
    ]),
  },
  mounted() {
    //console.log("iid es :" + this.id_categoria);
    this.modelo.id_categoria = parseInt(this.id_categoria);
    this.Get(this.modelo.id_categoria);
    this.InfoCategoria();
    this.GetSubcategorias();
  },
  methods: {
    subcategoria() {
      this.DialogoSubcategoria = true;
    },
    AddProducto() {
      this.DialogoAddProducto = true;
    },
    Addcomplemento(){ 
      // this.$refs.dialogaddproducto.getsubcategoria(id);
      this.$refs.dialogcomplemento.Datos(this.datos);
      this.DialogoComplemento=true;
    },
    onChanges(value,label){
      console.log(value);
      this.datos.id_subcategoria=value;
      this.datos.nombre_subcategoria=label;
      this.nombre_boton="NUEVO "+label;
      this.GetComplemento(value);
      this.nombre_tipo=label;

    },
    GetSubcategorias() {
      //console.log("SubCategoriaCocinaController")
      let tipo = "lista";
      let url =
        "/Controller/SubCategoriaCocinaController.php?tipo=" +
        tipo +
        "&id_categoria=" +
        this.id_categoria;
      let url_b =
        this.$q.platform.is.mobile == true ? this.url_base : this.url_base2;
      this.$axios
        .get(url_b + url)
        .then((response) => {
          console.log(response);
          this.itemSubCategorias = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    Get(idcategoria) {
      let url =
        "/Controller/ProductoControllerCo.php?id_categoria=" + idcategoria;
      let url_b =
        this.$q.platform.is.mobile == true ? this.url_base : this.url_base2;
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
    GetComplemento(id_subcategoria){
      let tipo="lista"
       let url_b =  this.$q.platform.is.mobile == true ? this.url_base : this.url_base2;
      let url =     "/Controller/ComplementoController.php?tipo=" +tipo+"&id_subcategoria="+id_subcategoria;
      this.$axios
        .get(url_b + url)
        .then((response) => {
          //console.log(response);
          this.itemComplemento = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    getproduct() {
      //console.log("desde ihjo")
      let url_b =
        this.$q.platform.is.mobile == true ? this.url_base : this.url_base2;
      let url =
        "/Controller/ProductoControllerCo.php?id_categoria=" +
        this.modelo.id_categoria;
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
    getsubcategoria(id) {
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
    InfoCategoria() {
      let tipo = "view";
      let url_b =
        this.$q.platform.is.mobile == true ? this.url_base : this.url_base2;
      let url =
        "/Controller/CategoriaController.php?tipo=" +
        tipo +
        "&id_categoria=" +
        this.id_categoria;
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
      this.DialogoEditProducto = false;
      this.DialogoEditComplemento=false;

    },
    UpdateProduct(id) {
      this.$refs.dialogoupdaute.View(id);
      //console.log(id);
      this.DialogoEditProducto = true;
    },
    updateComplemento(id_complemento){
       this.$refs.dialogoupdatecomplemento.View(id_complemento);    
       this.DialogoEditComplemento = true;
    },
    CerrarModalsub() {
      this.DialogoSubcategoria = false;
    },
    CerrarModalcomplemento(){
       
        this.DialogoComplemento = false;
    } 
  },
});
</script>

<style>
.q-splitter__panel q-splitter__before {
  width: 10%;
}
.q-splitter__panel-element.style {
  width: 10%;
}

.q-stepper__step-content_aaaa {
  display: none !important;
}
</style>
