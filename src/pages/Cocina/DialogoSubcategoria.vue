<template>
  <div class="q-pa-md q-gutter-sm">
   <q-dialog v-model="Show"  @hide="CerrarModal" >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Sub Categoria</div>
          <!-- <p>{{id_categoria}}</p> -->
        </q-card-section>
        <q-card-section class="q-pt-none">         
        <q-input dense autogrow outlined class="full-width" label="Nombre de sub Categoria *" v-model="modelo.nombre_subcategoria" />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Registrar" v-close-popup  @click="Store"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import moment from "moment";
import { ref } from 'vue'

import { mapState } from "vuex";

export default {
  name: "dialogo-sub-categoria",
  props: {
    DialogoSubCategoria: {
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
      Show: this.DialogoSubCategoria,
      fecha_actual: moment().format("DD/MM/YYYY"),
      hora_actual: moment().format("HH:mm:ss"),
      validate: false,
      dia_uno: ref(true),
      dia_dos: ref(true),
      dia_tres: ref(true),
      dia_cuatro: ref(true),
      dia_cinco: ref(true),
      dia_seis: ref(true),
      modelo: {
        id_subcategoria: 0,
        id_categoria: 0,
        nombre_subcategoria: ""              
      },
      errors: {
        nombre_producto: false,
        descripcion: false,
        precio_producto: false      
      },
      model: ref(null),     
    };
  },
  mounted() {
    this.modelo.id_categoria=this.id_categoria;
  },
  watch: {
    DialogoSubCategoria() {
      this.Show = this.DialogoSubCategoria;
    },   
  },
  created() {},
  computed: {
     ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2"]),  
  },
  methods: {      
    Store() {
      let me = this;
      me.modelo.id_categoria=me.id_categoria;
      if (me.modelo.nombre_subcategoria=="") {
          me.$q.dialog({
              dark: true,
              title: 'Ups',
              message: 'Campo nombre no puede ir vacio'
            }).onOk(() => {            
            }).onCancel(() => {       
            }).onDismiss(() => {             
            })
      }else{
              let url ="/Controller/SubCategoriaController.php";
              let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;    
              let data = me.modelo;
              me.$axios({
                method: "POST",
                url: url_b+ url,
                data: data,
              })
                .then(function (response) {
                  console.log(response);
                  let result = response.data.resultado;
                  if (result == "Registrado") {
                    // alert("Registrado");
                    me.Limpiar();
                    me.ListarSubcategoria();
                //   me.ListarProductos(me.modelo.id_categoria);
                    me.CerrarModal();
                    me.$q.notify({
                      message: "Subcategoria Agregado!",
                      color: "accent",
                      position: "top",
                    });  
                  } else {
                    /// me.Existe();
                  }
                    me.Limpiar();
                })
                .catch((error) => {
                  console.log(error);
                });
      }
     
    },
    ListarSubcategoria() {
      this.$emit("getsubcategoria",this.id_categoria);
    },    
    CerrarModal() {
      this.$emit("CerrarModalsub");
    },
    Limpiar() {
      this.modelo.nombre_subcategoria = "";
  
      // this.modelo.nombre_producto="";
    },
    Validate() {   
      this.errors.nombre_producto = this.modelo.nombre_producto == "" ? true : false;
      this.errors.descripcion = this.modelo.descripcion == "" ? true : false;
      this.errors.precio_producto = this.modelo.precio_producto == null? true : false;
      this.errors.precio_producto = this.modelo.precio_producto == '0.00'? true : false;

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