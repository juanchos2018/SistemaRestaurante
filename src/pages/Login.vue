<template>
  <q-layout class="bg-image" v-cloak>
    <q-page-container>
      <q-page class="flex flex-center">
         <q-form action="https://some-url.com" method="post" @submit.prevent="Validate">
              <q-btn color="white" text-color="black" label="Standard" @click="Menasaje" />
        <q-card
          v-if="!$q.screen.lt.sm"
          class="bg-transparent no-border no-shadow"
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar size="130px" class="shadow-10">
                <img src="profile.svg" />
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-white">
              <q-item-label>Inicio de Sesion</q-item-label>
                 <q-select  dark color="white" outlined v-model="modelo.TIPO_USUARIO" :options="options" label="Seleccione" />
              <q-item-label caption>
                <q-input
                  dark
                  color="white"
                  v-model="modelo.COD_USUARIO"
                  label="Usuario"
                />
                <q-input
                  dark
                  v-model="modelo.DES_PASSWORD"
                  color="white"
                  :type="isPwd ? 'password' : 'text'"
                  placeholder="Escriba su Constraseña"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label></q-item-label>
            </q-item-section>
            <q-item-section side center>
              <q-btn
               type="submit"
                round
                flat
                color="white"
                class="q-mt-lg bg-blue-5"
                icon="arrow_right_alt"
              ></q-btn>
            </q-item-section>
          </q-item>
        </q-card>
   </q-form>
    <q-form action="https://some-url.com" method="post" @submit.prevent="Validate">
        <q-card
          v-if="$q.screen.lt.sm"
          class="bg-transparent no-border no-shadow"
        >
          <q-card-section class="text-center">
            <q-avatar size="130px" class="shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section class="text-center">
            <div class="text-h6 text-white">Inicio de Sesion</div>

            <q-input dark color="white" v-model="modelo.COD_USUARIO" label="Usuario" />
            <q-input
              dark
              v-model="modelo.DES_PASSWORD"
              color="white"
              :type="isPwd ? 'password' : 'text'"
              placeholder="Escriba su Constraseña"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                   @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn
            type="submit"
              round
              flat
              color="white"
              class="q-mt-lg bg-blue-5"
              icon="arrow_right_alt"
            ></q-btn>
          </q-card-section>
        </q-card>
         </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar,QSpinnerFacebook,QSpinnerCube } from 'quasar'
import { onBeforeUnmount } from 'vue'
import { ref,reactive  } from "vue";
import { mapState } from 'vuex'

export default defineComponent({
  name: "Login",

  setup() {
    const $q = useQuasar();
    let timer;
    let   validate=ref(false)
     onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })     
    const modelo = reactive({ COD_USUARIO: 'YNUÑEZ',DES_PASSWORD:'',TIPO_USUARIO:'' })
    const  errors= {
        COD_USUARIO: ref(false),
        DES_PASSWORD: ref(false)            
      }
    
    return {
      isPwd: ref('password'),
      validate,
      modelo,
      errors,
      options: [
        'Medico', 'Cocina',
      ]
      };
  },
   computed: {
    ...mapState(['url_base'])   
  }, 
  methods: {
    Ingresar(){  
        let me =this;
        me.$q.loading.show({
          message: 'Un Momento <b>process</b> Cargando.<br/><span class="text-primary">Un...</span>',
          html: true
        })      
       let url ="/Controller/LoginController.php";
       const data = me.modelo;
        this.$axios({
        method: "POST",
        url: me.url_base+ url,
        data: data,       
      })
        .then(function(response) {     
        me.$q.loading.hide()   
        let result =response.data;
        if (result.existe=="Si") {         
         
            let objeto ={COD_AUXILIAR:result.COD_AUXILIAR,
                        COD_MEDICO:result.COD_MEDICO,
                        DES_AUXILIAR:result.DES_AUXILIAR,
                        LOGUEO:'Qsesion',
                        TIPO_USUARIO:me.modelo.TIPO_USUARIO}

           //  me.$q.localStorage.set("Qsesion", objeto)
             me.$store.dispatch("guardarDatos",objeto);  
              //const value = $q.localStorage.getItem(key)
             me.$q.sessionStorage.set("Qsesion", objeto)

             if (me.modelo.TIPO_USUARIO=="Cocina") {
                  me.$router.push({path:'/Sistema/Cocina'})
             }else{
                  me.$router.push({path:'/Sistema/Cafeteria'})
             }

        }else{
            me.$q.dialog({
              dark: true,
              title: 'Ups',
              message: 'No existe Tu Usuario'
            }).onOk(() => {            
            }).onCancel(() => {       
            }).onDismiss(() => {             
            })
           }             
                
        })
        .catch((error) => {
          console.log(error); 
          me.$q.loading.hide()           
        });      
    },
    Salir(){
        
    },
    Menasaje()
    {//QSpinnerCube
      let me =this;
        me.$q.loading.show({
          message: 'Un Momento <b>process</b> Cargando.<br/><span class="text-primary">Un...</span>',
          html: true,
            spinnerColor: 'indigo',
         spinner: QSpinnerCube,
        })  
    },
    Validate(){
      this.errors.COD_USUARIO = this.modelo.COD_USUARIO == "" ? true : false;
      this.errors.DES_PASSWORD = this.modelo.DES_PASSWORD == "" ? true : false;   
      if (this.errors.COD_USUARIO) {
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
         if (this.errors.DES_PASSWORD) {
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
            this.Ingresar();
        }
    }
  }
});
</script>

<style>
.bg-image {
  background-image: url("~assets/cocina4.jpg");
}

[v-cloak] {
  display: none !important;
}
</style>
