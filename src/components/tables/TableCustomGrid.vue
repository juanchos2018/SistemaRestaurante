<template>
  <q-card >
    <q-card-section>
      <div class="text-h6 ">Categorias</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-none">
      <q-table
        grid
        :card-container-class="cardContainerClass"
        :rows="itemCategoria"
        :columns="columns"
        title=""
        v-model:pagination="pagination"
        row-key="name"
        hide-header
       :rows-per-page-options="rowsPerPageOptions"
      >
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <card-categoria
              :id_categoria="props.row.id_categoria"
              :name="props.row.nombre_categoria"
              :logo="props.row.logo"
              :estado="props.row.estado"
              :horalimite="props.row.horalimite"
              v-on:Editar="Editar"
            ></card-categoria>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <!-- style="width: 500px; max-width: 80vw" -->
  <q-dialog v-model="visiblemodal" @hide="CerrarModal">
    <q-card class="colorborde">
      <q-form @submit.prevent="Validate">
        <q-card-section>
          <div class="text-h6">Modificar Categoria</div>
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
                label="Nombre de categoria *"
                v-model="modelo.nombre_categoria"
              />
            </q-item>
          </div>
          <div class="col-2">
            <q-item>                            
                <q-icon :name="modelo.logo"  size="md"  :key="componentKey" ref="icono" />                  
            </q-item>
           </div>
            <div class="col-10">
              <q-item>
              <q-input dense outlined class="full-width" v-model="modelo.horalimite"   label="Hora Limite *" type="time" mask="HH*mm"    format24h hint="Formato 24 horas" />   
              </q-item>
            </div>
            <div class="col-4">
              <q-item>
                <q-checkbox v-model="Estado" :label="Estado==true ? 'Activo':'Inactivo'" />
              </q-item>
            </div>
            <div class="col-4">
              <q-item>
                <q-checkbox v-model="Subcategoria" :label="Subcategoria==true ? 'Subcategoria':'Sin/Subcategoria'"  @update:model-value="change($event)
            " />
              </q-item>
            </div>
             <div class="col-12"  v-if="Subcategoria==true">              
              <q-item>
                  <q-checkbox v-model="Entrada" label="Entrada"  @update:model-value="AgregarSubcategoira($event,'Entrada')" />
                  <!-- <q-checkbox v-model="Postre"  label="Postre"   @update:model-value="AgregarPostre($event,'Postre')"/> -->
              </q-item>
            </div>
          <div class="col-12">
            <br><br>
            <q-card bordered>
              <q-card-section class="row">
                <q-virtual-scroll :items="logos" virtual-scroll-horizontal>
                  <template v-slot="{ item, index }">
                    <div :key="index" style="margin: 7px">
                      <q-icon :name="item" size="md" @click="EditarLogo(item)" />
                    </div>
                  </template>
                </q-virtual-scroll>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
          <q-btn color="primary" label="Editar" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useQuasar } from "quasar";
import { mapState } from "vuex";

import CardCategoria from "components/cards/CardCategoria";
const logos = [
  "fas fa-cocktail",
  "fas fa-blender-phone",
  "fas fa-cookie",
  "fas fa-mug-hot",
  "fas fa-hockey-puck",
  "fas fa-hamburger",
  "fas fa-pizza-slice",
  "fas fa-hotdog",
  "fas fa-apple-alt",
  "fas fa-cheese",
  "room_service"
];

const columns = [
  {
    name: "id_categoria",
    label: "codigo",
    field: "id_categoria",
    sortable: true,
    align: "left",
  },
  {
    name: "nombre_categoria",
    label: "Categoria",
    field: "nombre_categoria",
    sortable: true,
    align: "left",
  },
];

export default defineComponent({
  name: "TableCustomGrid",
  components: { CardCategoria },
  props: ["itemCategoria"],
  setup() {
    const $q = useQuasar();
    function getItemsPerPage() {
      if ($q.screen.lt.sm) {
        return 3;
      }
      if ($q.screen.lt.md) {
        return 6;
      }
      return 12;
    }
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage(),
    });
    let visiblemodal = ref(false);
    const modelo = ref({id_categoria: 0, nombre_categoria: "",logo:'',estado:0,subcategoria:0,lista:[],horalimite:''});
    const figura=ref('')
    let datoscateroia=ref({})
    return {   
      logos,
      columns,
      figura,   
      Estado: ref(true),
      currentPage: 1,
      nextPage: null,
      totalPages: 4,
      pagination,
      visiblemodal,
      componentKey: 0,
      datoscateroia,
      modelo,
      Subcategoria: ref(false),
      Entrada:ref(false),
      Postre:ref(false),
      itemsubcategorias:ref([]),
     //  modelo: { id_categoria: 0, nombre_categoria: "",logo:'' },
      cardContainerClass: computed(() => {
        return $q.screen.gt.xs
          ? "grid-masonry grid-masonry--" + ($q.screen.gt.sm ? "3" : "2")
          : null;
      }),
      rowsPerPageOptions: computed(() => {
        return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
      }),
    };
  },
  watch: {    
  },
  computed: {
    ...mapState([
      "url_base",
      "url_base2",
      "url_izipay",
      "url_socket",
      "url_socket2"
    ]),
  },
  methods: {
    Editar(data) {
      this.modelo = data;
      console.log(data);
      this.itemsubcategorias=[];
      this.Estado=this.modelo.estado==1?true:false;
      this.Entrada=false;
      this.Postre=false;
     // this.figura = data.logo    
      let tipo = "view";
      let url_b =
      this.$q.platform.is.mobile == true ? this.url_base : this.url_base2;
      let url = "/Controller/CategoriaController.php?tipo=" + tipo +"&id_categoria=" +  data.id_categoria;
      this.$axios
        .get(url_b + url)
        .then((response) => {
          this.datoscateroia = response.data;
            if (this.datoscateroia.subcategoria==1){
                this.Subcategoria=true;
            }else{
                this.Subcategoria=false;
            }
              this.itemsubcategorias=this.datoscateroia.lista;
              let b1 =this.itemsubcategorias.find(x=>x.nombre_subcategoria=='Entrada' && x.estado==1)
              if (b1) {
                this.Entrada=true;
              }else{
                this.Entrada=false;
              }
              // let b2 =this.itemsubcategorias.find(x=>x.nombre_subcategoria=='Postre' && x.estado==1);
              // if(b2) {
              //   this.Postre=true;
              // }else{
              //   this.Postre=false;
              // }  
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
        this.visiblemodal = true;
    },
    CerrarModal() {
      this.visiblemodal = false;
    },
    Validate() {
      if (this.modelo.nombre_categoria == "") {
        this.$q
          .dialog({
            dark: true,
            title: "Ups",
            message: "Falta Llenar Campos",
          })
          .onOk(() => {})
          .onCancel(() => {})
          .onDismiss(() => {});
      } else {
        this.Update();
      }
    },
    EditarLogo(item){     
      this.modelo.logo=item;         
    },   
    change(event){
      console.log(event);
    },
    ViewCategoria(){
      //no uso esto we 
      let tipo = "view";
      let url_b =
      this.$q.platform.is.mobile == true ? this.url_base : this.url_base2;
      let url = "/Controller/CategoriaController.php?tipo=" +
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
    AgregarSubcategoira(event,valor){
     //  if (this.datoscateroia.subcategoria==1) {
          if (event) {
              let obj =this.itemsubcategorias.find(x=>x.nombre_subcategoria==valor)
            if (obj) {
                const indx = this.itemsubcategorias.findIndex( (v) => v.nombre_subcategoria === valor );
                this.itemsubcategorias[indx].estado=1;
              }
            }else{
                let obj =this.itemsubcategorias.find(x=>x.nombre_subcategoria==valor)
            if (obj) {
                const indx = this.itemsubcategorias.findIndex( (v) => v.nombre_subcategoria === valor );
                this.itemsubcategorias[indx].estado=0;
            }
         }
      // }else{           
      // }      
    },
    AgregarPostre(event,valor){
    //  if (this.datoscateroia.subcategoria==1) {
          if (event) {
          let obj =this.itemsubcategorias.find(x=>x.nombre_subcategoria==valor)
          if (obj) {
              const indx = this.itemsubcategorias.findIndex( (v) => v.nombre_subcategoria === valor );
              this.itemsubcategorias[indx].estado=1;
          }
          }else{
              let obj =this.itemsubcategorias.find(x=>x.nombre_subcategoria==valor)
          if (obj) {
              const indx = this.itemsubcategorias.findIndex( (v) => v.nombre_subcategoria === valor );
              this.itemsubcategorias[indx].estado=0;
          }
        }
   //   }else{

   //   }
    },
    Mensajedos() {
      this.$q
        .dialog({
          dark: true,
          title: "Ups",
          message: "debe elejir por lo menos una subcategoria",
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
    Update() {
      let me = this;
      let url = "/Controller/CategoriaController.php?";
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      me.modelo.estado= me.Estado==true?1:0;
      me.modelo.subcategoria= me.Subcategoria==true?1:0;
      if (me.Subcategoria==true) {
          if ( me.Entrada==false) {
               me.Mensajedos();
          }
      }else{  
          for (let index = 0; index < me.itemsubcategorias.length; index++) {          
              me.itemsubcategorias[index].estado=0;
          }
      }
      me.modelo.lista=me.itemsubcategorias;
      let data = me.modelo;     
      this.$axios({
        method: "PUT",
        url: url_b + url,
        data: data,
      })
        .then(function (response) {     
          console.log(response);     
          let result = response.data;
          if (result.afect > 0) {
            me.$emit("listar");
            me.CerrarModal();
            me.$q.notify({
              message: "Categoria Editado!",
              color: "accent",
              position: "top",
            });
          } else {
          
            me.$q
              .dialog({
                dark: true,
                title: "Ups",
                message: "Hubo Algun Error",
              })
              .onOk(() => {
                
              })
              .onCancel(() => {
              
              })
              .onDismiss(() => {
                
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>


<style>
.colorborde {
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>
