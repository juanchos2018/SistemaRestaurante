<template>
  <q-page class="q-pa-sm">
     <q-btn position="right" class="float-right" color="primary" label="Nueva Categoria"  @click="AddCategoria"/>
     <br> 
    <table-custom-grid class="q-mt-lg"  :itemCategoria="itemCategoria"    ></table-custom-grid>

  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent,ref,reactive} from 'vue';
import { mapState } from 'vuex'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: "Tables",
  components: {  
    TableCustomGrid: defineAsyncComponent(() => import('components/tables/TableCustomGrid')),
   
  },
  setup(){
    const modelo = reactive({ id_categoria: 0,nombre_categoria:'',estado:0 })
      const $q = useQuasar();
    return{
        itemCategoria:ref([]),
        modelo
    }
  },
  created(){
  //  let existe =  this.$q.sessionStorage.isEmpty()
    let  existe2= this.$q.sessionStorage.has("Qsesion")
    //console.log(existe2);
    if (!existe2) {
         this.$router.push({ path: "/" });
    }
   
  },
   computed: {
    ...mapState(['url_base'])   
   

    
  }, 
  mounted(){
    this.Get();
  },
 
  methods:{
    AddCategoria(){
        this.$q.dialog({
        title: 'Nueva Categoria',
          message: 'Ingrese Nombre de categoria (Minimo 3 caracteres)',
          prompt: {
            model: '',
            isValid: val => val.length > 2, // << here is the magic
            type: 'text' // optional
          },
          cancel: true,
          persistent: true
        }).onOk(data => {  
           this.Store(data);      
      })
    },
    Store(nombre){
       let me =this;
       me.modelo.nombre_categoria=nombre;
       let url ="/Controller/CategoriaController.php";
       const data = me.modelo;
        this.$axios({
        method: "POST",
        url: me.url_base+ url,
        data: data,       
      })
        .then(function(response) {
         console.log(response);
          let result =response.data.resultado;
          if (result=="Registrado") {
               alert("Registrado");
               me.Get();
          }else{          
               me.Existe();
          }          
        })
        .catch((error) => {
          console.log(error);         
        });
    },
    Get(){
        let url="/Controller/CategoriaController.php";
        this.$axios.get(this.url_base+ url).then(response => {                    
             this.itemCategoria = response.data;         
            // console.log(response.data)        
            }).catch(function (error) {
                console.log(error);
        }) .finally(() => {                     
        })
    },
    Existe(){
         this.$q.dialog({
        dark: true,
        title: 'Ups',
        message: 'Nombre de categoria ya existe'
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
})
</script>

<style>

</style>
