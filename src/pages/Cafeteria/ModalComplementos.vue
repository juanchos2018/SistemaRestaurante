<template>
 <div class="q-mt-md q-gutter-sm" > 
  <q-dialog v-model="Show" @hide="CerrarModal"  persistent class="colorborde">
      <q-card style="width: 300px;padding:10px">
        <q-card-section>
          <div class="text-h6">Entradas</div>
           <q-item-label>para {{ modelo.producto }} </q-item-label>
        </q-card-section>
          <q-list bordered separator class="q-mt-md">
            <q-item clickable v-ripple v-for="item in  itemComplementos" :key="item.id_complemento"  @click="AddComplemento(item.descripcion)" >
            <q-item-section avatar>
              <q-icon name="fas fa-cookie" />
            </q-item-section>
            <q-item-section>{{item.descripcion}}</q-item-section>    
          </q-item>      
        </q-list>
        <q-card-actions align="right" class="text-primary">        
          <q-btn flat label="Cerrar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "model-complementos",
  props: {
    ModalComplemento: {
      type: Boolean,
      required: true,
      default: false,
    },    
  },
  data() {
    return {
      Show: this.ModalComplemento,
      datos: [1, 2, 3],
      itemComplementos: [],
      index:0,
      modelo:{}
    };
  },
  watch: {
    ModalComplemento() {
      this.Show = this.ModalComplemento;
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
  methods: {
    CerrarModal() {
      this.$emit("CerrarModal");
    },
    AddComplemento(descripcion){        
      this.modelo.entrada=descripcion;     
      this.$emit("AddEntrada",this.modelo);
      this.Show=false;
    },
    RecibeIndex(index,modelo){    
        this.index=index;      
        this.modelo=modelo;  
    },
    RecibeModelo(modelo){
      this.modelo=modelo;      
    },
    ReenviarModelo(){

    },
    GetComplementos(id_categoria,nombre_dia) {
      let tipo = "dia";
      let url_b =
      this.$q.platform.is.mobile == true ? this.url_base : this.url_base2;
      let url ="/Controller/ComplementoController.php?tipo=" + tipo +"&id_categoria=" +id_categoria+"&dia="+nombre_dia;
      this.$axios
        .get(url_b + url)
        .then((response) => {
          //console.log(response)
          this.itemComplementos = response.data;          
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    GetComplementosanterior(id_categoria) {
      let tipo = "complementos";
      let url_b =
      this.$q.platform.is.mobile == true ? this.url_base : this.url_base2;
      let url ="/Controller/ProductoController.php?tipo=" + tipo +"&id_categoria=" +id_categoria;
      this.$axios
        .get(url_b + url)
        .then((response) => {
          this.itemComplementos = response.data;          
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
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