<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card class="colorborde" >
        <q-form  @submit.prevent="Validate">
          <q-card-section>
            <div class="text-h6">Modificar Entrada</div>        
             <!-- <p>{{itemSubcategorias}}</p> -->
          </q-card-section>
          <q-separator />
          <div class="row">
            <div class="col-12">
              <q-item>
                <q-input dense autogrow outlined class="full-width" label="Nombre de Producto *" v-model="modelo.descripcion" />
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
import { mapState } from "vuex";
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  name: "dialogo-add-producto",
  props: {
    DialogoEditComplemento: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  data() {
    return { 
      model: ref(null),
      Estado: false,
      Stock:false,
      isLoading: false,
      Show: this.DialogoEditProducto, 
      id_subcategoria: ref(null),
      fecha_actual: moment().format("DD/MM/YYYY"),
      hora_actual: moment().format("HH:mm:ss"),
      itemSubcategorias:[],
      subcategoriabool:ref(true),
      validate: false,
      estadoPrecio:false,
      modelo: {
        id_complemento: 0,
        id_subcategoria: "",
        nombre_subcategoria: "",
        descripcion: '',
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
        descripcion: false       
      }
    };
  },
  mounted(){    
  },
  watch: {
    DialogoEditComplemento() {
      this.Show = this.DialogoEditComplemento;      
    }, 
  },
  created() {},
  computed: {
     ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2","id_categoria_store"]),  
  },
  methods: {       
    View(id_complemento) {
      console.log("compoennte");
    //  console.log(id);
      let me = this;
      let tipo="view";
      let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;  
      let url ="/Controller/ComplementoController.php?tipo="+tipo+"&id_complemento="+id_complemento;
      this.$axios({
        method: "GET",
        url: url_b+url,      
      })
        .then(function (response) {    
            console.log(response);        
            me.modelo={...response.data};    
            me.dia_uno=me.modelo.dia_uno==1?true:false;
            me.dia_dos=me.modelo.dia_dos==1?true:false; 
            me.dia_tres=me.modelo.dia_tres==1?true:false; 
            me.dia_cuatro=me.modelo.dia_cuatro==1?true:false; 
            me.dia_cinco=me.modelo.dia_cinco==1?true:false; 
            me.dia_seis=me.modelo.dia_seis==1?true:false;    
          })
        .catch((error) => {
          console.log(error);
        });     
    },   
    Update(){     
      let me = this;
      let url_b=me.$q.platform.is.mobile==true?me.url_base:me.url_base2;  
      let url ="/Controller/ComplementoController.php?tipo=editcompmento";       
       me.modelo.dia_uno=me.dia_uno==true?1:0;
       me.modelo.dia_dos=me.dia_dos==true?1:0; 
       me.modelo.dia_tres=me.dia_tres==true?1:0; 
       me.modelo.dia_cuatro=me.dia_cuatro==true?1:0; 
       me.modelo.dia_cinco=me.dia_cinco==true?1:0; 
       me.modelo.dia_seis=me.dia_seis==true?1:0;   

      let data = me.modelo;
 
      this.$axios({
        method: "PUT",
        url: url_b+url,
        data: data,
      })
        .then(function (response) {
          // console.log(response);
          let result = response.data;
          if (result.afect>0) {
            me.Get(me.modelo.id_subcategoria);
           // me.ListarProductos(me.modelo.id_categoria);
            me.CerrarModal();
            me.$q.notify({
              message: "Producto Editado!",
              color: "accent",
              position: "top",
            });        
          } else {
          
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
      this.modelo.descripcion = "";
    },
    Get(id_subcategoria){
      this.$emit("getComplemnentos",id_subcategoria)
    },
    Validate() {  
       this.errors.descripcion = this.modelo.descripcion == "" ? true : false;
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

<style>
.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>