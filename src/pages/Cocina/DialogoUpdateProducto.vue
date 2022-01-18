<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-form  @submit.prevent="Validate">
          <q-card-section>
            <div class="text-h6">Modificar Producto</div>
            <p>{{modelo}}</p>
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
                <q-input dense autogrow outlined class="full-width" label="Descripcion *" v-model="modelo.descripcion" />
              </q-item>
            </div>
             <div class="col-8">
              <q-item>    
                         <!-- :value="modelo.id_subcategoria" -->
                <q-select   bottom-slots  dense autogrow outlined class="full-width" v-model="modelo.id_subcategoria" :options="itemSubcategoria" :value="modelo.nombre_subcategoria"   
                   label="Sub Categoria" :readonly="subcategoriabool==true ? false : true"   >
                  
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
                <q-input dense outlined class="full-width" type="number" label="Stock" v-model="modelo.stock"  min="1" :readonly="Stock==true ? false : true"/>                 
              </q-item>
            </div>
            <div class="col-4">
              <q-item>
              <q-input
                  filled
                  v-model="modelo.precio_venta"
                  label="Precio"
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                  dense
                  autogrow
                  input-class="text-right"
                />                  </q-item>
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
                <q-checkbox v-model="Estado" :label="Estado==true? 'Activo':'Inactivo'" />
              </q-item>
            </div>
          </div>
          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
            <q-btn color="primary" label="Guardar" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import moment from "moment";
//import Vue from "vue";
import { mapState } from "vuex";
import { useQuasar } from 'quasar'
import { ref } from 'vue'


export default {
  name: "dialogo-add-producto",
  props: {
    DialogoEditProducto: {
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
      Estado: false,
      Stock:false,
      isLoading: false,
      Show: this.DialogoEditProducto, 
      id_subcategoria: ref(null),
      fecha_actual: moment().format("DD/MM/YYYY"),
      hora_actual: moment().format("HH:mm:ss"),
      itemSubcategoria:[],
      subcategoriabool:ref(true),
      validate: false,
      modelo: {
        id_producto: 0,
        nombre_producto: "",
        descripcion: "",
        id_categoria: 0,
        id_subcategoria: 0,
        nombre_subcategoria:ref(null),
        precio_venta: 0,
        estado: 1,
        stock: 1,
        fecha: "",
        imagen: "",
        usastock:0,
        estrellas:0,
        dia_uno:0,
        dia_dos:0,
        dia_tres:0,
        dia_cuatro:0,
        dia_cinco:0,
        dia_seis:0
      },
      dia_uno: true,
      dia_dos: true,
      dia_tres: true,
      dia_cuatro: true,
      dia_cinco: true,
      dia_seis: true,
      errors: {
        nombre_producto: false,
        descripcion: false,
        precio_producto: false      
      }

    };
  },
  mounted(){
    this.getsubcategoria( this.id_categoria)
  },
  watch: {
    DialogoEditProducto() {
      this.Show = this.DialogoEditProducto;      
    }, 
  },
  created() {},
  computed: {
    ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2","id_categoria_store"]),
  },
  methods: {   
    getsubcategoria(id_categoria){
      let me = this;
      me.itemSubcategoria=[];      
      let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;  
      let tipo="lista";
      let url =  "/Controller/SubCategoriaController.php?tipo="+tipo+"&id_categoria=" + id_categoria;
       //   console.log(url);
      me.$axios
        .get(url_b + url)
        .then((response) => {
          ///console.log(response);
          let elementos=[];
          elementos=response.data;
        // this.itemSubcategoria = response.data;
            if (elementos.length>0) {
              // console.log(elementos.length)
          //               console.log("eentra daqui 2"); 
                      elementos.map(function(x){
                            me.itemSubcategoria.push({label: x.nombre_subcategoria,value:x.id_subcategoria});
                }); 
            }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    
    },
    View(id) {
      let me = this;
      let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;  
      let url ="/Controller/ProductoControllerCo.php?id_producto="+id;
      this.$axios({
        method: "GET",
        url: url_b+url,      
      })
        .then(function (response) {            
            me.modelo={...response.data};     
            me.Estado=me.modelo.estado==1?true:false;   
            me.Stock =me.modelo.usastock==1?true:false;    
            me.dia_uno=me.modelo.dia_uno==1?true:false;
            me.dia_dos=me.modelo.dia_dos==1?true:false; 
            me.dia_tres=me.modelo.dia_tres==1?true:false; 
            me.dia_cuatro=me.modelo.dia_cuatro==1?true:false; 
            me.dia_cinco=me.modelo.dia_cinco==1?true:false; 
            me.dia_seis=me.modelo.dia_seis==1?true:false;  
             
           // me.modelo.id_subcategoria=me.modelo.dia_seis==1?true:false;   
        

                     
          })
        .catch((error) => {
          console.log(error);
        });
        me.getsubcategoria(me.id_categoria);
    },
    Update(){     
      let me = this;
      let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;  
      let url ="/Controller/ProductoController.php?tipo=editpro";   
       me.modelo.estado=me.Estado==true?1:0;   
       me.modelo.usastock = me.Stock==true?1:0;
       me.modelo.dia_uno=me.dia_uno==true?1:0;
       me.modelo.dia_dos=me.dia_dos==true?1:0; 
       me.modelo.dia_tres=me.dia_tres==true?1:0; 
       me.modelo.dia_cuatro=me.dia_cuatro==true?1:0; 
       me.modelo.dia_cinco=me.dia_cinco==true?1:0; 
       me.modelo.dia_seis=me.dia_seis==true?1:0;   

       me.modelo.id_subcategoria=me.id_subcategoria.value;

      let data = me.modelo;
       console.log(data);
      // this.$axios({
      //   method: "PUT",
      //   url: url_b+url,
      //   data: data,
      // })
      //   .then(function (response) {
      //      console.log(response);
      //     let result = response.data;
      //     if (result.afect>0) {
      //       me.ListarProductos(me.modelo.id_categoria);
      //       me.CerrarModal();
      //       me.$q.notify({
      //         message: "Producto Editado!",
      //         color: "accent",
      //         position: "top",
      //       });        
      //     } else {
          
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
   
    },
    ListarProductos(id_categoria) {
      this.$emit("GetProductos", id_categoria);
    },  
    toggleCheckboxes(event){    
      if (this.stock==false) {        
      }else{
       this.modelo.stock=0;
      }
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
    Validate() {
   
      this.errors.nombre_producto = this.modelo.nombre_producto == "" ? true : false;
      this.errors.descripcion = this.modelo.descripcion == "" ? true : false;
      this.errors.precio_producto = this.modelo.precio_producto == 0? true : false;

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
              message: 'Falta Llenar campos'
            }).onOk(() => {            
            }).onCancel(() => {       
            }).onDismiss(() => {             
            })
          return false;
        } else {
          this.validate = false;
        }
        if (this.Stock==true && this.modelo.stock==0 ) {
             this.validate = true;
          this.$q.dialog({
              dark: true,
              title: 'Ups',
              message: 'Falta Llenar El Stock !'
            }).onOk(() => {            
            }).onCancel(() => {       
            }).onDismiss(() => {             
            })
          return false;
        }else{
             this.validate = false;
        }

        if (!this.validate) {
           this.$q.dialog({        
            title: 'Mensaje',
            message: 'Desea Editar ?',
            cancel: true,
            persistent: true
          }).onOk(() => {
            // console.log('>>>> OK')
           this.Update();
            //alert("modificado");
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