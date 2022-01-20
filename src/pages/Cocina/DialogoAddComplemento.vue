<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw" class="colorborde">
        <q-form @submit.prevent="Validate">
          <q-card-section>
            <p>{{ modelo }}</p>

            <div class="text-h6">Nueva</div>
          </q-card-section>
          <q-separator />
          <div class="row">
            <div class="col-10">
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
           // me.Get();
            me.modelo.descripcion = "";
          } else {
            //me.Existe();
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
