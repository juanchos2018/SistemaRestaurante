<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-form  @submit.prevent="Validate">
          <q-card-section>
            <div class="text-h6">Modificar Producto</div>
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
            <div class="col-4">
              <q-item>
              <q-input
                  filled
                  v-model="modelo.precio_venta"
                  label="2 decimales"
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                  dense
                  autogrow
                  input-class="text-right"
                />                  </q-item>
            </div>
            <div class="col-4">
              <q-item>                 
                <q-input dense outlined class="full-width" type="number" label="Stock" v-model="modelo.stock" />                 
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
            <q-btn color="primary" label="Editar" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import moment from "moment";
import Vue from "vue";
import { mapState } from "vuex";
import { useQuasar } from 'quasar'

export default {
  name: "dialogo-add-producto",
  props: {
    DialogoEditProducto: {
      type: Boolean,
      required: true,
      default: false,
    },  
  },
  data() {
    return { 
      Estado: false,
      isLoading: false,
      Show: this.DialogoEditProducto, 
  
      fecha_actual: moment().format("DD/MM/YYYY"),
      hora_actual: moment().format("HH:mm:ss"),

      validate: false,
      modelo: {
        id_producto: 0,
        nombre_producto: "",
        descripcion: "",
        id_categoria: 0,
        precio_venta: 0,
        estado: 1,
        stock: 1,
        fecha: "",
        imagen: "",
      },
      errors: {
        nombre_producto: false,
        descripcion: false,
        precio_producto: false      
      }

    };
  },
  mounted: function () {
  
  },
  watch: {
    DialogoEditProducto() {
      this.Show = this.DialogoEditProducto;      
    }, 
  },
  created() {},
  computed: {
    ...mapState(["url_base"]), 
  },
  methods: {   
    View(id) {
      let me = this;
      let url ="/Controller/ProductoController.php?id_producto="+id;
      this.$axios({
        method: "GET",
        url: me.url_base+url,      
      })
        .then(function (response) {
           // console.log(response);        
            me.modelo=response.data;     
            me.Estado=me.modelo.estado==1?true:false;   
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Update(){     
      let me = this;
      let url ="/Controller/ProductoController.php?tipo=editpro";   
      me.modelo.estado=me.Estado==true?1:0;   
      let data = me.modelo;

      this.$axios({
        method: "PUT",
        url: me.url_base+url,
        data: data,
      })
        .then(function (response) {
          // console.log(response);
          let result = response.data;
          if (result.afect>0) {             
          //  me.Limpiar();
            me.ListarProductos(me.modelo.id_categoria);
            me.CerrarModal();
            me.$q.notify({
              message: "Producto Editado!",
              color: "accent",
              position: "top",
            });        
          } else {
            /// me.Existe();
          }
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
   
        if (!this.validate) {
           this.$q.dialog({        
            title: 'Mensaje',
            message: 'Desea Editar ?',
            cancel: true,
            persistent: true
          }).onOk(() => {
            // console.log('>>>> OK')
            this.Update();
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