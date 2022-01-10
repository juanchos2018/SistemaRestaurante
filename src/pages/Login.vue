<template>
  <q-layout class="bg-image" v-cloak>
    <q-page-container>
      <q-page class="flex flex-center">
        <!-- <p>{{token}}</p> -->
        <!-- <div class="kr-embedded"
        kr-popin
        :kr-form-token="Token">
          <div class="kr-pan"></div>
          <div class="kr-expiry"></div>
          <div class="kr-security-code"></div>  
          <button class="kr-payment-button"  value="200"></button>
          <div class="kr-form-error"></div>
        </div>   -->

         <q-form action="https://some-url.com" method="post" @submit.prevent="Validate">   

        <q-card
          v-if="!$q.screen.lt.sm"
          class="bg-transparent no-border no-shadow"
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar size="150px" class="shadow-10">
                <img src="svglogo5.svg" />
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-white">
              <q-item-label>Inicio de Sesion</q-item-label>
                 <!-- <q-select  dark color="white" outlined v-model="modelo.TIPO_USUARIO" :options="options" label="Seleccione" /> -->
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
             <img src="svglogo5.svg" />
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
import { ref,reactive ,watch } from "vue";
import { mapState } from 'vuex'

export default defineComponent({
  name: "Login",

  setup() {
    const $q = useQuasar();
    let TokenIziay=ref('')
    let timer;
    let   validate=ref(false)
     onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })     
    const modelo = reactive({ COD_USUARIO: 'VILLATOPA',DES_PASSWORD:'',TIPO_USUARIO:'' })
    const  errors= {
        COD_USUARIO: ref(false),
        DES_PASSWORD: ref(false)            
      }
  
    return {      
      TokenIziay,  
      Token:ref("27P-t44BikQZixgvQOfZZHzg221eyJhbW91bnQiOjEwMCwiY3VycmVuY3kiOiJQRU4iLCJtb2RlIjoiVEVTVCIsInZlcnNpb24iOjMsIm9yZGVySWQiOiJNeU9yZGVySWQ2MWQ4YTNkNWQzYmY0Iiwic2hvcE5hbWUiOiJDbMOtbmljYSBMYSBMdXogLSBURVNUIiwicmlza0FuYWx5c2VyIjp7ImZpbmdlclByaW50c0lkIjoiZGM4ZGQ4OTYtYTc1Mi00MTZlLThiZTUtMzFmMmQxYWY2MTlmIiwianNVcmwiOiJodHRwczovL3NlY3VyZS5taWN1ZW50YXdlYi5wZS90cmFzL2FuYWx5emVyL3B1YmxpYy92MS9jaGVja2VyL2RjOGRkODk2LWE3NTItNDE2ZS04YmU1LTMxZjJkMWFmNjE5ZiJ9LCJjYXRlZ29yaWVzIjp7ImRlYml0Q3JlZGl0Q2FyZHMiOnsiYXBwSWQiOiJjYXJkcyIsInBhcmFtIjpbIkFNRVgiLCJNQVNURVJDQVJEX0RFQklUIiwiTUFTVEVSQ0FSRCIsIk1DX0NPUkRPQkVTQSIsIlZJU0EiLCJWSVNBX0VMRUNUUk9OIiwiVklTQV9ERUJJVCIsIkRJTkVSUyJdfX0sImNhcmRzIjp7IkFNRVgiOnsiZmllbGRzIjp7InNlY3VyaXR5Q29kZSI6eyJtYXhMZW5ndGgiOjR9LCJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTAwIiwiRFlOQU1JQyI6Ijo6Ojo6In0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZmlyc3RJbnN0YWxsbWVudERlbGF5Ijp7InZhbHVlIjoiMCIsInZhbHVlcyI6eyIwIjoiMCIsIkRZTkFNSUMiOiJEWU5BTUlDIn0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJNQVNURVJDQVJEX0RFQklUIjp7ImZpZWxkcyI6eyJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTAwIiwiRFlOQU1JQyI6Ijo6Ojo6In0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZmlyc3RJbnN0YWxsbWVudERlbGF5Ijp7InZhbHVlIjoiMCIsInZhbHVlcyI6eyIwIjoiMCIsIkRZTkFNSUMiOiJEWU5BTUlDIn0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJNQVNURVJDQVJEIjp7ImZpZWxkcyI6eyJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTAwIiwiRFlOQU1JQyI6Ijo6Ojo6In0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZmlyc3RJbnN0YWxsbWVudERlbGF5Ijp7InZhbHVlIjoiMCIsInZhbHVlcyI6eyIwIjoiMCIsIkRZTkFNSUMiOiJEWU5BTUlDIn0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJNQ19DT1JET0JFU0EiOnsiZmllbGRzIjp7Imluc3RhbGxtZW50TnVtYmVyIjp7InZhbHVlIjoiLTEiLCJ2YWx1ZXMiOnsiLTEiOiIxOjo6OjoxMDAiLCJEWU5BTUlDIjoiOjo6OjoifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJmaXJzdEluc3RhbGxtZW50RGVsYXkiOnsidmFsdWUiOiIwIiwidmFsdWVzIjp7IjAiOiIwIiwiRFlOQU1JQyI6IkRZTkFNSUMifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9fSwiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIlZJU0EiOnsiZmllbGRzIjp7Imluc3RhbGxtZW50TnVtYmVyIjp7InZhbHVlIjoiLTEiLCJ2YWx1ZXMiOnsiLTEiOiIxOjo6OjoxMDAiLCJEWU5BTUlDIjoiOjo6OjoifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJmaXJzdEluc3RhbGxtZW50RGVsYXkiOnsidmFsdWUiOiIwIiwidmFsdWVzIjp7IjAiOiIwIiwiRFlOQU1JQyI6IkRZTkFNSUMifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9fSwiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIlZJU0FfRUxFQ1RST04iOnsiZmllbGRzIjp7Imluc3RhbGxtZW50TnVtYmVyIjp7InZhbHVlIjoiLTEiLCJ2YWx1ZXMiOnsiLTEiOiIxOjo6OjoxMDAiLCJEWU5BTUlDIjoiOjo6OjoifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJmaXJzdEluc3RhbGxtZW50RGVsYXkiOnsidmFsdWUiOiIwIiwidmFsdWVzIjp7IjAiOiIwIiwiRFlOQU1JQyI6IkRZTkFNSUMifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9fSwiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIkRFRkFVTFQiOnsiZmllbGRzIjp7InBhbiI6eyJtaW5MZW5ndGgiOjEwLCJtYXhMZW5ndGgiOjE5LCJ2YWxpZGF0b3JzIjpbIk5VTUVSSUMiLCJMVUhOIl0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOnRydWUsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJleHBpcnlEYXRlIjp7InJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOnRydWUsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJzZWN1cml0eUNvZGUiOnsibWluTGVuZ3RoIjozLCJtYXhMZW5ndGgiOjQsInZhbGlkYXRvcnMiOlsiTlVNRVJJQyJdLCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjp0cnVlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOnRydWV9LCJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTAwIn0sInJlcXVpcmVkIjpmYWxzZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX0sImZpcnN0SW5zdGFsbG1lbnREZWxheSI6eyJ2YWx1ZSI6IjAiLCJ2YWx1ZXMiOnsiMCI6IjAifSwicmVxdWlyZWQiOmZhbHNlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX19LCJESU5FUlMiOnsiZmllbGRzIjp7Imluc3RhbGxtZW50TnVtYmVyIjp7InZhbHVlIjoiLTEiLCJ2YWx1ZXMiOnsiLTEiOiIxOjo6OjoxMDAiLCJEWU5BTUlDIjoiOjo6OjoifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJmaXJzdEluc3RhbGxtZW50RGVsYXkiOnsidmFsdWUiOiIwIiwidmFsdWVzIjp7IjAiOiIwIiwiRFlOQU1JQyI6IkRZTkFNSUMifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9fSwiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn0sIlZJU0FfREVCSVQiOnsiZmllbGRzIjp7Imluc3RhbGxtZW50TnVtYmVyIjp7InZhbHVlIjoiLTEiLCJ2YWx1ZXMiOnsiLTEiOiIxOjo6OjoxMDAiLCJEWU5BTUlDIjoiOjo6OjoifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJmaXJzdEluc3RhbGxtZW50RGVsYXkiOnsidmFsdWUiOiIwIiwidmFsdWVzIjp7IjAiOiIwIiwiRFlOQU1JQyI6IkRZTkFNSUMifSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9fSwiY29weUZyb20iOiJjYXJkcy5ERUZBVUxUIn19LCJwYXNzQWN0aXZhdGVkIjp0cnVlLCJhcGlSZXN0VmVyc2lvbiI6IjQuMCIsImNvdW50cnkiOiJQRSJ93702"),
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
    ...mapState(['url_base'],['url_izipay'])   
  }, 
  methods: {
    Ingresar(){  
        let me =this;
        me.$q.loading.show({
          message: 'Un Momento <b>process</b> Cargando.<br/><span class="text-primary">Un...</span>',
          html: true,
         spinner: QSpinnerCube,
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
      //  console.log(response);
        if (result.existe=="Si") {      
            let area ='';   
            if (result.AREA==null) {
              area='AREA NN';
              console.log('area nulla');
            }else{
              area=result.AREA;
            }
            let objeto ={COD_AUXILIAR:result.COD_AUXILIAR,
                        COD_MEDICO:result.COD_MEDICO,
                        DES_AUXILIAR:result.DES_AUXILIAR,
                        LOGUEO:'Qsesion',
                        AREA:area}
           //  me.$q.localStorage.set("Qsesion", objeto)
             me.$store.dispatch("guardarDatos",objeto);  
              //const value = $q.localStorage.getItem(key)
             me.$q.sessionStorage.set("Qsesion", objeto)
            // console.log(objeto)
             if (objeto.AREA=="COCINA") {          
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
    Izipay(){
      let me =this;
         let url ="/popin.php";       
        this.$axios({
        method: "GET",
        url: me.url_base+ url         
       })
        .then(function(response) {    
                   console.log(response); 
        })
        .catch((error) => {
          console.log(error); 
        
        });    
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
    GenerarPago(){
        let me =this;            
       let url ="/GenerarPago.php";
        const data={
          amount:50,
          currency:'PE'
           }
            this.$axios({
            method: "POST",
            url: me.url_base+ url,
            data:data,
              
          })
            .then(function(response) {     
              console.log(response);
              me.TokenIziay=response.data.token;
        })
        .catch((error) => {
          console.log(error); 
              
        }); 
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


.kr-embedded .kr-payment-button {
    color: #fff !important;
    background-color: #cf1927 !important;
    border-color: #cf1927 !important;
    font-style: normal !important;
  } 

  .kr-popin-button
  {
    color: #fff !important;
    background-color: #cf1927 !important;
    border-color: #cf1927 !important;
    font-style: normal !important;

    font-weight: 400;
    text-align: center;
    
    border: 1px solid transparent !important;
    padding: 0.375rem 0.75rem !important;
    font-size: 0.875rem !important;
    line-height: 1.5 !important;
    border-radius: 0.25rem !important;
  }

    .kr-popin-utils button.kr-popin-button {
      width:150px !important;

  } 

</style>
