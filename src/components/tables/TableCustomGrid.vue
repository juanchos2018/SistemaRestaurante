<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 ">Categoria</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-none">
      <q-table
        grid
        :rows="itemCategoria"
        :columns="columns"
        v-model:pagination="pagination"
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
              v-on:Editar="Editar"
            ></card-categoria>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  
  <q-dialog v-model="visiblemodal" @hide="CerrarModal">
    <q-card style="width: 500px; max-width: 80vw">
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
            <div class="col-4">
              <q-item>
                <q-checkbox v-model="Estado" :label="Estado==true ? 'Activo':'Inactivo'" />
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
  "fas fa-cheese"
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
    const $qu = useQuasar();
    function getItemsPerPage() {
      if ($qu.screen.lt.sm) {
        return 3;
      }
      if ($qu.screen.lt.md) {
        return 6;
      }
      return 12;
    }
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage(),
    });
    let visiblemodal = ref(false);
    const modelo = ref({id_categoria: 0, nombre_categoria: "",logo:'',estado:0});
    const figura=ref('')
  
    return {
      $qu,
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
      modelo,
     //  modelo: { id_categoria: 0, nombre_categoria: "",logo:'' },
      rowsPerPageOptions: computed(() => {
        return $qu.screen.gt.xs ? ($qu.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
      }),
    };
  },
  watch: {
    
  },
  computed: {
    ...mapState(["url_base"]),   
  },
  methods: {
    Editar(data) {
      this.modelo = data;
      this.Estado=this.modelo.estado==1?true:false;
     // this.figura = data.logo      
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
            message: "Falta Llenar campos",
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
    Update() {
      let me = this;
      let url = "/Controller/CategoriaController.php?";
      me.modelo.estado= me.Estado==true?1:0;
      let data = me.modelo;
      //console.log(me.modelo);
      this.$axios({
        method: "PUT",
        url: me.url_base + url,
        data: data,
      })
        .then(function (response) {
          /// console.log(response);
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
            //console.log(response);
            me.$q
              .dialog({
                dark: true,
                title: "Ups",
                message: "Hubo Algun Error",
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
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style scoped>
</style>
