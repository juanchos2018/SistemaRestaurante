<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-form  @submit.prevent="Validate">
          <q-card-section>
            <div class="text-h6">Agregar Producto</div>
            <!-- <p>{{itemSubcategoria}}</p>
            <p>{{id_categoria}}</p> -->
            <!-- <p>{{modelo}}</p> -->
          </q-card-section>
          <q-separator />         
          <div class="row">
            <div class="col-12">
              <q-item>
                <q-input dense autogrow outlined class="full-width" label="Nombre de Producto *" v-model="modelo.nombre_producto" />
              </q-item>
            </div>
            <div class="col-12">
              <q-item>
                <q-input  dense autogrow outlined class="full-width" label="Descripcion *" v-model="modelo.descripcion"  >                
                </q-input>
              </q-item>
            </div>
            
            <div class="col-8">
              <q-item>
                <!-- <p>{{id_subcategoria.value}}</p> -->
                <q-select   bottom-slots  dense autogrow outlined class="full-width" v-model="id_subcategoria" :options="itemSubcategoria" label="Sub Categoria" :readonly="subcategoriabool==true ? false : true" >
                    <template v-slot:hint >
                      <q-badge outline color="primary" label="Agrega SubCategoria" @click="SubCategoria"  />
                    </template>
                </q-select>
              </q-item>
            </div>
            <div class="col-4">
              <q-item>
                  <q-checkbox v-model="subcategoriabool" label="Subcategoria" color="red" />
              </q-item>
            </div>
            <div class="col-3">
              <q-item>
                <q-checkbox v-model="Stock" :label="Stock==true ? 'Usar/Stock':'No/Stock'"  @click="toggleCheckboxes($event)"  />
              </q-item>
            </div>
            <div class="col-4">
              <q-item>                 
                <!-- disable readonly  -->
                <q-input dense outlined class="full-width" type="number" label="Stock" v-model="modelo.stock"  min="1" :readonly="Stock==true ? false : true"/>                 
              </q-item>
            </div>
            <div class="col-4">
              <q-item>
                  <q-input
                  filled
                  v-model="modelo.precio_producto"
                  label="Precio *"
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                  dense
                  autogrow
                  input-class="text-right"
                />    
              </q-item>
            </div>
             
             <div class="col-12">
                 <q-item>
                 <div class="q-gutter-sm">
                <q-checkbox v-model="dia_uno" label="Lu" color="red" />
                <q-checkbox v-model="dia_dos" label="Ma" color="red" />
                <q-checkbox v-model="dia_tres" label="Mi" color="red" />
                <q-checkbox v-model="dia_cuatro" label="Ju" color="red" />
                 <q-checkbox v-model="dia_cinco" label="Vi" color="red" />
                <q-checkbox v-model="dia_seis" label="Sa" color="red" />
              </div>
                 </q-item>
             </div>
            <div class="col-4">
              <q-item>
                <q-checkbox v-model="Estado" :label="Estado==true ? 'Activo':'Inactivo'" />
              </q-item>
            </div>
          </div>
          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
            <q-btn color="primary" label="Registrar" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import moment from "moment";
import { ref } from 'vue'

import { mapState } from "vuex";

export default {
  name: "dialogo-add-producto",
  props: {
    DialogoAddProducto: {
      type: Boolean,
      required: true,
      default: false,
    },
    id_categoria: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {    
      Estado: true,
      Stock:false,
      NombreEstado:'Activo',
      isLoading: false,
      Show: this.DialogoTareaEditar,
      fecha_actual: moment().format("DD/MM/YYYY"),
      hora_actual: moment().format("HH:mm:ss"),
      subcategoriabool:ref(false),
      validate: false,
      dia_uno: ref(true),
      dia_dos: ref(true),
      dia_tres: ref(true),
      dia_cuatro: ref(true),
      dia_cinco: ref(true),
      dia_seis: ref(true), 
      modelo: {
        id_producto: 0,
        nombre_producto: "",
        descripcion: "",
        id_categoria: 0,
        id_subcategoria: 0,
        precio_producto: null,
        estado: 1,
        stock: 0,
        fecha: "",
        imagen: "",
        usastock:0,
        estrellas:0,
        dia_uno:1,
        dia_dos:1,
        dia_tres:1,
        dia_cuatro:1,
        dia_cinco:1,
        dia_seis:1
      },
      errors: {
        nombre_producto: false,
        descripcion: false,
        precio_producto: false      
      },
      itemSubcategoria:[],
      id_subcategoria: ref(null),
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    };
  },
  mounted: function () {
    this.modelo.id_categoria = this.id_categoria;   
    this.getsubcategoria( this.id_categoria);
///    console.log(this.id_categoria_store)
     
  },
  watch: {
    DialogoAddProducto() {
      this.Show = this.DialogoAddProducto;
    },
    porcentaje() {
      this.rango = this.porcentaje;
    },
  },
  created() {
     this.modelo.id_categoria = this.id_categoria;   
  },
 computed: {
     ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2","id_categoria_store"]),
    estadoStock: function () {
       if (this.Stock) {
          return this.modelo.stock=0
       }else{
          return this.estadoStock
       }
    }
  },
  methods: {
    toggleCheckboxes(event){    
      if (this.stock==false) {
          //this.modelo.stock=0;
      }else{
        this.modelo.stock=0;
      }
    },
    SubCategoria(){     
      if (this.subcategoriabool) {
         this.$emit('subcategoria',true)
      }    
    },
    Store() {
      let me = this;
      let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;  
      let url ="/Controller/ProductoController.php";
      me.modelo.id_categoria = me.id_categoria;      
      me.modelo.estado = me.Estado==true?1:0;
      me.modelo.usastock = me.Stock==true?1:0;      
      if (me.subcategoriabool==true) {
          me.modelo.id_subcategoria = me.id_subcategoria.value;
      }else{
          me.modelo.id_subcategoria = 0;
      }    
      //console.log(me.modelo);  
      let data = me.modelo;
      this.$axios({
        method: "POST",
        url: url_b+ url,
        data: data,
      })
        .then(function (response) {    
          let result = response.data.resultado;
          if (result == "Registrado") {            
            me.Limpiar();
            me.ListarProductos(me.modelo.id_categoria);
            me.CerrarModal();
             me.$q.notify({
              message: "Producto Agregado!",
              color: "accent",
              position: "top",
            });  
          } else {
           
          }
           me.Limpiar();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ListarProductos(id_categoria) {
      this.$emit("GetProductos", id_categoria);
    },    
    CerrarModal() {
      this.$emit("CerrarModal");
    },
    Limpiar() {
      this.modelo.nombre_producto = "";
      this.modelo.descripcion = "";
      this.modelo.precio_producto = 0;
      // this.modelo.nombre_producto="";
    },
    getsubcategoria(id_categoria){
      let me = this;
      me.itemSubcategoria=[];
      if (id_categoria==0) {
      //  console.log("viene vacio we ");
        id_categoria=me.id_categoria_store;

      let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;  
      let tipo="lista";
      let url =  "/Controller/SubCategoriaController.php?tipo="+tipo+"&id_categoria=" + id_categoria;
      me.$axios
        .get(url_b + url)
        .then((response) => {
          console.log(response);
          let elementos=[];
          elementos=response.data;
         // this.itemSubcategoria = response.data;
          elementos=response.data;   
                  elementos.map(function(x){
                        me.itemSubcategoria.push({label: x.nombre_subcategoria,value:x.id_subcategoria});
            }); 
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});

        
      }else{
     
      let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;  
      let tipo="lista";
      let url =  "/Controller/SubCategoriaController.php?tipo="+tipo+"&id_categoria=" + id_categoria;
      me.$axios
        .get(url_b + url)
        .then((response) => {
          console.log(response);
          let elementos=[];
          elementos=response.data;
         // this.itemSubcategoria = response.data;
          elementos=response.data;   
                  elementos.map(function(x){
                        me.itemSubcategoria.push({label: x.nombre_subcategoria,value:x.id_subcategoria});
            }); 
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
      }
   
    },
    Validate() {   
      this.errors.nombre_producto = this.modelo.nombre_producto == "" ? true : false;
      this.errors.descripcion = this.modelo.descripcion == "" ? true : false;
      this.errors.precio_producto = this.modelo.precio_producto == null? true : false;
      this.errors.precio_producto = this.modelo.precio_producto == '0.00'? true : false;
    //0.00
        if (this.errors.nombre_producto) {
            this.validate = true;
            this.$q.dialog({
              dark: true,
              title: 'Ups',
              message: 'Falta Llenar campos'
            }).onOk(() => {            
            }).onCancel(() => {       
            }).onDismiss(() => {             
            })
          return false;
        } else {
          this.validate = false;
        }

         if (this.errors.descripcion) {
          this.validate = true;
          this.$q.dialog({
              dark: true,
              title: 'Ups',
              message: 'Falta Llenar campos'
            }).onOk(() => {            
            }).onCancel(() => {       
            }).onDismiss(() => {             
            })
          return false;
        } else {
          this.validate = false;
        }


          if (this.errors.precio_producto) {
          this.validate = true;
          this.$q.dialog({
              dark: true,
              title: 'Ups',
              message: 'El Campo Precio debe ser mayor a cero'
            }).onOk(() => {            
            }).onCancel(() => {       
            }).onDismiss(() => {             
            })
          return false;
        } else {
          this.validate = false;
        }
   
        if (!this.validate) {
           this.$q.dialog({        
            title: 'Agregar',
            message: 'Desea Registrar ?',
            cancel: true,
            persistent: true
          }).onOk(() => {
            // console.log('>>>> OK')
            this.Store();
          }).onOk(() => {
            // console.log('>>>> second OK catcher')
          }).onCancel(() => {
            // console.log('>>>> Cancel')
          }).onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          })
        }

    },
  },
};
</script>