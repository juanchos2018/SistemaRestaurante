<template>
  <q-page class="q-pa-sm">
    <q-btn
      position="right"
      class="float-right"
      color="primary"
      label="Nueva Categoria"
      @click="AddCategoria"
    />
    <br />
    <br />

    <table-custom-grid
      class="q-mt-lg"
      :itemCategoria="itemCategoria"
      v-on:listar="Get"
    ></table-custom-grid>

    <q-dialog v-model="visiblemodal" @hide="CerrarModal" >
      <q-card style="width: 500px; max-width: 80vw" class="colorborde">
        <q-form @submit.prevent="Validate">
          <q-card-section>
            <!-- <p>{{modelo}}</p>
            <p>{{itemsubcategorias}}</p> -->
           
            <div class="text-h6">Nueva Categoria</div>
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
                <q-icon :name="modelo.logo" size="md" ref="icono" />
              </q-item>
            </div>
             <div class="col-4">
              <q-item>
                <q-checkbox v-model="Estado" :label="Estado==true ? 'Activo':'Inactivo'" />
              </q-item>
            </div>           
             <div class="col-4">
              <q-item>
                <q-checkbox v-model="Subcategoria" :label="Subcategoria==true ? 'Subcategoria':'Sin/Subcategoria'" />
              </q-item>
            </div>
             <div class="col-12"  v-if="Subcategoria==true" >
              <q-item>
                  <q-checkbox v-model="Entrada" label="Entrada"  @update:model-value="AgregarSubcategoira($event,'Entrada')" />
                  <!-- <q-checkbox v-model="Postre"  label="Postre" @update:model-value="AgregarPostre($event,'Postre')"/> -->
              </q-item>
            </div>
            <div class="col-12">
              <br /><br />
              <q-card bordered>
                <q-card-section class="row">
                  <q-virtual-scroll :items="logos" virtual-scroll-horizontal>
                    <template v-slot="{ item, index }">
                      <div :key="index" style="margin: 7px">
                        <q-icon
                          :name="item"
                          size="md"
                          @click="EditarLogo(item)"
                        />
                      </div>
                    </template>
                  </q-virtual-scroll>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
            <q-btn color="primary" label="Guardar" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { defineComponent, defineAsyncComponent, ref, reactive } from "vue";
import { mapState } from "vuex";

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

export default defineComponent({
  name: "Tables",
  components: {
    TableCustomGrid: defineAsyncComponent(() =>
      import("components/tables/TableCustomGrid")
    ),
  },
  setup() {
    const modelo = ref({
      id_categoria: 0,
      nombre_categoria: "",
      estado: 0,
      logo: "fas fa-cocktail",
      subcategoria:0,
      lista:[]
    });

    let visiblemodal = ref(false);
    return {
      visiblemodal,
      itemCategoria: ref([]),
      Estado: ref(true),
      Subcategoria: ref(false),
      modelo,
      logos,
      itemsubcategorias:ref([]),
      Entrada:ref(false),
      Postre:ref(false),
      itemsubcategoriasdos0:ref([{id:1,nombre_subcategoria:'Entrada',estado:0},{id:2,nombre_subcategoria:'Postre',estado:0}]),
      itemsubcategoriasdos:ref([{id:1,nombre_subcategoria:'Entrada',estado:0}])
    };
  },
  created() {    
    let existe2 = this.$q.sessionStorage.has("Qsesion");    
    if (existe2==false) {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
     ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2"]),
  },
  mounted() {
    this.Get();
  },

  methods: {
    AddCategoria() {
      this.visiblemodal = true;
    },
    CerrarModal() {
      this.visiblemodal = false;
    },
    AgregarSubcategoira(event,valor){
       if (event) {
              let obj =this.itemsubcategoriasdos.find(x=>x.nombre_subcategoria==valor)
            if (obj) {
                const indx = this.itemsubcategoriasdos.findIndex( (v) => v.nombre_subcategoria === valor );
                this.itemsubcategoriasdos[indx].estado=1;
              }
            }else{
                let obj =this.itemsubcategoriasdos.find(x=>x.nombre_subcategoria==valor)
            if (obj) {
                const indx = this.itemsubcategoriasdos.findIndex( (v) => v.nombre_subcategoria === valor );
                this.itemsubcategoriasdos[indx].estado=0;
            }
         }    
    },
    AgregarPostre(event,valor){
       if (event) {
             let obj =this.itemsubcategoriasdos.find(x=>x.nombre_subcategoria==valor)
            if (obj) {
                const indx = this.itemsubcategoriasdos.findIndex( (v) => v.nombre_subcategoria === valor );
                this.itemsubcategoriasdos[indx].estado=1;
              }
            }else{
                let obj =this.itemsubcategoriasdos.find(x=>x.nombre_subcategoria==valor)
            if (obj) {
                const indx = this.itemsubcategoriasdos.findIndex( (v) => v.nombre_subcategoria === valor );
                this.itemsubcategoriasdos[indx].estado=0;
            }
      }     
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
        this.Store();
      }
    },
    EditarLogo(item) {
      this.modelo.logo = item;
    },
    Store() {
      let me = this;      
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      let url = "/Controller/CategoriaController.php";
      me.modelo.estado = me.Estado==true?1:0;
      me.modelo.subcategoria = me.Subcategoria==true?1:0;   
      if (me.Subcategoria==true) {        
        if (me.Entrada==false) {
            me.Mensajedos();
            return;
        }              
      }    
      me.modelo.lista = me.itemsubcategoriasdos;
      const data = me.modelo;
      //console.log(data);
      this.$axios({
        method: "POST",
        url: url_b + url,
        data: data,
      })
        .then(function (response) {
  //       console.log(response);
          let result = response.data.resultado;
          if (result == "Registrado") {
            me.Mensaje();
            me.Get();
            me.modelo.nombre_categoria = "";
            me.Subcategoria==false;
            me.Entrada=false;
            me.Postre=false;
          } else {
            me.Existe();
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
    Get() {
      let tipo="lista";
      let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
      let url = "/Controller/CategoriaController.php?tipo="+tipo;
      this.$axios
        .get(url_b + url)
        .then((response) => {
          this.itemCategoria = response.data;
          // console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    Existe() {
      this.$q
        .dialog({
          dark: true,
          title: "Ups",
          message: "Nombre de categoria ya existe",
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
  },
});
</script>

<style>

.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>
