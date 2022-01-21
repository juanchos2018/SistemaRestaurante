<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw" class="colorborde">
        <q-form @submit.prevent="Validate">
          <q-card-section>
           <div class="text-h6">Nueva</div>
          </q-card-section>
          <q-separator />
          <div class="row">
            <div class="col-12">
              <q-item>
                <q-input
                  dense
                  autogrow
                  outlined
                  class="full-width"
                  label="Nombre"
                  v-model="modelo.descripcion"
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

import { mapState } from "vuex";
import { ref } from 'vue'

export default {
  name: "dialogo-add-complemento",
  components: {},
  props: {
    DialogoAddComplemento: {
      type: Boolean,
      required: true,
      default: false,
    }    
  },
  data() {
    return {
      modelo: {
        id_complemento: 0,
        id_subcategoria: 0,
        nombre_subcategoria: "",
        descripcion: "",     
      },
      dia_uno: ref(true),
      dia_dos: ref(true),
      dia_tres: ref(true),
      dia_cuatro: ref(true),
      dia_cinco: ref(true),
      dia_seis: ref(true), 
      Show: this.DialogoAddComplemento, 
    };
  },
  created() {},
  watch: {
    DialogoAddComplemento() {
      this.Show = this.DialogoAddComplemento;
    },    
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
  },
  methods: { 
    CerrarModal() {
        this.$emit("CerrarModal");
    },
    Validate() {
      if (this.modelo.descripcion == "") {
        this.$q
          .dialog({
            dark: true,
            title: "Ups",
            message: "Falta Llenar campos",
          })
          .onOk(() => {})
          .onCancel(() => {})
          .onDismiss(() => {});
      } else {
        this.Store();
      }
    },
    Datos(modelo){
        this.modelo.id_subcategoria = modelo.id_subcategoria;
        this.modelo.nombre_subcategoria = modelo.nombre_subcategoria;   
    },
    Store() {
      let me = this;   
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      let url = "/Controller/ComplementoController.php";
       me.modelo.dia_uno=me.dia_uno==true?1:0;
       me.modelo.dia_dos=me.dia_dos==true?1:0; 
       me.modelo.dia_tres=me.dia_tres==true?1:0; 
       me.modelo.dia_cuatro=me.dia_cuatro==true?1:0; 
       me.modelo.dia_cinco=me.dia_cinco==true?1:0; 
       me.modelo.dia_seis=me.dia_seis==true?1:0; 

      const data = me.modelo;      
      this.$axios({
        method: "POST",
        url: url_b + url,
        data: data,
      })
        .then(function (response) {
         console.log(response);
          let result = response.data.resultado;
          if (result == "Registrado") {
            me.Mensaje();
            me.Get();
            me.modelo.descripcion = "";
          } else {
            //me.Existe();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Get(){
      this.$emit("getComplemnentos",this.modelo.id_subcategoria)
    },
    Mensaje() {
      this.$q.notify({
        message: "Registrado",
        color: "accent",
        position: "top",
      });
    },
  },
};
</script>

<style>
.colorborde {
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>
