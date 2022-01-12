<template>
  <q-page class="q-pa-sm">
    <q-btn
      position="right"
      class="float-right"
      color="primary"
      label="Nueva Categoria"
  
    />
  
   <q-card class="colorborde" v-for="item in itemTomorrow " :key="item.id_pedido">
    <q-card-section class="text-center">
     
    </q-card-section>
        <q-card-section >
             <table-tomorrow   class="q-mt-lg"   :data="item.detalle">
           
             </table-tomorrow>        
            
        </q-card-section>   
    
  </q-card>


 

   
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
    TableTomorrow: defineAsyncComponent(() =>
      import("components/tables/TableTomorrow")
    ),
  },
  setup() {
    const modelo = ref({
      id_categoria: 0,
      nombre_categoria: "",
      estado: 0,
      logo: "fas fa-cocktail",
    });

    let visiblemodal = ref(false);
    return {
      visiblemodal,
      itemTomorrow: ref([]),
      Estado: ref(true),
      modelo,
      logos,
    };
  },
  created() {
    //  let existe =  this.$q.sessionStorage.isEmpty()
    let existe2 = this.$q.sessionStorage.has("Qsesion");
    //console.log(existe2);
    if (!existe2) {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    ...mapState(["url_base"]),
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
      // me.modelo.nombre_categoria=nombre;
      let url = "/Controller/CategoriaController.php";
      me.modelo.estado = me.Estado==true?1:0;
      const data = me.modelo;
      this.$axios({
        method: "POST",
        url: me.url_base + url,
        data: data,
      })
        .then(function (response) {
          // console.log(response);
          let result = response.data.resultado;
          if (result == "Registrado") {
            me.Mensaje();
            me.Get();
            me.modelo.nombre_categoria = "";
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
      let tipo="tomorrow";
      let url = "/Controller/PedidoController.php?tipo="+tipo;
      this.$axios
        .get(this.url_base + url)
        .then((response) => {
          this.itemTomorrow = response.data;
         
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
  },
});
</script>

<style>
</style>
