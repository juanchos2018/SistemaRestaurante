<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-form action="https://some-url.com" method="post" @submit.prevent="Validate">
          <q-card-section>
            <div class="text-h6">Agregar Producto</div>
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
                <q-input dense autogrow outlined class="full-width" label="Descripcion *" v-model="modelo.descripcion" />
              </q-item>
            </div>
            <div class="col-6">
              <q-item>
                <q-input dense outlined class="full-width" type="number" label="Precio Venta" v-model="modelo.precio_producto" />
              </q-item>
            </div>
            <div class="col-6">
              <q-item>
                <q-checkbox v-model="Estado" label="Estado" />
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
import Vue from "vue";

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
      contador: 0,
      CodeMetodologia: "M",
      codigo: "",
      nombre: "",
      Estado: false,
      isLoading: false,
      Show: this.DialogoTareaEditar,
      id_miembro: "",
      fecha_inicio: "",
      fecha_termino: "",
      miembroreponsableID: "",
      urlevidencia: "",
      rango: this.porcentaje,
      fecha_actual: moment().format("DD/MM/YYYY"),
      hora_actual: moment().format("HH:mm:ss"),
      estado_tarea: "",
      disabled: false,
      descripcion_avance: "",
      speed: 40,


      validate: false,
      modelo: {
        id_producto: 0,
        nombre_producto: "",
        descripcion: "",
        id_categoria: 0,
        precio_producto: 0,
        estado: 1,
        cantidad_producto: 1,
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
    //    this.rango=this.porcentaje;
  },
  watch: {
    DialogoAddProducto() {
      this.Show = this.DialogoAddProducto;
    },
    porcentaje() {
      this.rango = this.porcentaje;
    },
  },
  created() {},
  computed: {},
  methods: {
    Store() {
      let me = this;
      let url =
        "http://localhost/ApiCafeteria/Controller/ProductoController.php";

      me.modelo.id_categoria = me.id_categoria;
      let data = me.modelo;
      this.$axios({
        method: "POST",
        url: url,
        data: data,
      })
        .then(function (response) {
          //  console.log(response);
          let result = response.data.resultado;
          if (result == "Registrado") {
            // alert("Registrado");
            me.Limpiar();
            me.ListarProductos(me.modelo.id_categoria);
            me.CerrarModal();
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
    onChange(value) {
      console.log("change: ", value);
    },
    onAfterChange(value) {
      console.log("afterChange: ", value);
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
            title: 'Mensaneje',
            message: 'Desea Registrar?',
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