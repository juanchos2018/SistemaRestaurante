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
           <!-- <q-btn color="primary" label="conculstar" @click="Consultar" /> -->
         <q-form method="post" @submit.prevent="Validate">   

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

            <q-item-section class="text-white text-bold ">
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

        <!-- <q-chip square color="primary" text-color="white" @click="me" >
              Click aqui si o tienes un Usuario
         </q-chip>

  <label for="" @click="me"  class="">   Click aqui si o tienes un Usuario</label> -->

                <a @click="me">No estas Resgistrado? click qui</a>  
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
                <a @click="me" class="a2 text-center">No estas Resgistrado? click qui</a>  
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
import moment from 'moment'

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
    const modelo = reactive({ COD_USUARIO: '',DES_PASSWORD:'',TIPO_USUARIO:'' })
    const me=()=>{
        $q.dialog({
        title: ' Aún no ¿No estás registrado?',
        message: 'Escríbenos al WhatsApp +51 952647927 o llama al (052) 638720 anexo 1200.'
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
    const  errors= {
        COD_USUARIO: ref(false),
        DES_PASSWORD: ref(false)            
      }
  
    return {      
      me,
      date: ref('2022/01/11'), 
         fecha_actual: moment(new Date()).local().format("YYYY-MM-DD"),
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
   ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2"]), 
  }, 
  methods: {
    Memsaje(){
       this.$q.dialog({
        title: ' Aún no ¿No estás registrado?',
        message: 'Escríbenos al WhatsApp +51 952647927 o llama al (052) 638720 anexo 1200.'
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },  
    Ingresar(){  
        let me =this;
        me.$q.loading.show({
          message: 'Un Momento <b>process</b> Cargando.<br/><span class="text-primary">Un...</span>',
          html: true,
         spinner: QSpinnerCube,
        })      
       let url ="/Controller/LoginController.php";

       let url_b=this.$q.platform.is.mobile==true?this.url_base:this.url_base2;
       const data = me.modelo;
        this.$axios({
        method: "POST",
        url: url_b+ url,
        data: data,       
      })
        .then(function(response) {     
        me.$q.loading.hide()   
      //   alert(response);
        let result =response.data;
         // console.log(response);
        if (result.existe=="si") {  
          
          if (result.error=='si') {
              me.$q.dialog({
              dark: true,
              title: 'Ups',
              message: result.msg
            }).onOk(() => {            
            }).onCancel(() => {       
            }).onDismiss(() => {             
            })
          }else{
             let area ='';   
            if (result.AREA==null) {
              area='AREA_NN';
              //console.log('area nulla');
            }else{
              area=result.AREA;
            }
            let objeto ={COD_AUXILIAR:result.COD_AUXILIAR,
                        COD_MEDICO:result.COD_MEDICO,
                        DES_AUXILIAR:result.DES_AUXILIAR,
                        LOGUEO:'Qsesion',
                        AREA:area,
                        Piso:1}
           //  me.$q.localStorage.set("Qsesion", objeto)
             me.$store.dispatch("guardarDatos",objeto);  
              //const value = $q.localStorage.getItem(key)
             me.$q.sessionStorage.set("Qsesion", objeto)
            // console.log(objeto)
             if (objeto.AREA=="COCINA") {          
                  me.$router.push({path:'/Cocina/Cocina'})
             }else{             
                  me.$router.push({path:'/Sistema/Cafeteria'})
             }
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
       //   alert(error);
          me.$q.loading.hide()           
        });      
    },
    Salir(){
        
    },    
     ChangeDate(e){
      let fecha =e;
      if (e==null) {
        this.date=this.fecha_actual
      }else{
       // let dia = moment(fecha).format('dddd');
        let dia = moment(new Date(fecha)).format('dddd');
        // let tipo="dia";
         console.log(dia);
        // this.date=e;
       
      }
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
    ConsultarDdni(){
      let url="https://quertium.com/api/v1/reniec/dni/45713875?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTM3Mw.x-jUgUBcJukD5qZgqvBGbQVMxJFUAIDroZEm4Y9uTyg"
    //  let url = "/Controller/PedidoController.php?tipo=" + tipo;
  let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTM3Mw.x-jUgUBcJukD5qZgqvBGbQVMxJFUAIDroZEm4Y9uTyg";
let headers={
   Authorization: 'Bearer ' + token //the token is a variable which holds the token
 }

    // let config = {
    //       headers: {
    //         header1: value,
    //       }
    //     }

    //     let data = {
    //       'HTTP_CONTENT_LANGUAGE': self.language
    //     }


    var config = {
    headers: { 
      'x-rapidapi-host': 'https://quertium.com',
      'x-rapidapi-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTM3Mw.x-jUgUBcJukD5qZgqvBGbQVMxJFUAIDroZEm4Y9uTyg' 
      }
   };
      this.$axios
        .get( url, {
 headers: {
   Authorization: 'Bearer ' + token 
 }
})
        .then((response) => {
           console.log(response);
         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
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

    Consultar(){
     
      let url = "/Controller/prueba.php";
      this.$axios
        .get(this.url_base + url)
        .then((response) => {      
         // this.itemCocina = response.data;
          let array =response.data;
          console.log(array)

          let nuevoObjeto = {}
//Recorremos el arreglo 
              array.forEach( x => {
                //Si la ciudad no existe en nuevoObjeto entonces
                //la creamos e inicializamos el arreglo de profesionales. 
                if( !nuevoObjeto.hasOwnProperty(x.COD_USUARIO)){
                     nuevoObjeto[x.COD_USUARIO] = {
                         profesionales: []
                     }
                }
                
                //Agregamos los datos de profesionales. 
                  nuevoObjeto[x.COD_USUARIO].profesionales.push({
                    nombre: x.nombre_producto,
              
                  })
                
              })

                console.log(nuevoObjeto)
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
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

  a {
   font-weight: bold;
  text-decoration: none;
  color: white;
  margin-left:35%;
  margin-top: 20%;
  font-size: 16px;
}

  .a2 {
   font-weight: bold;
  text-decoration: none;
  color: white;  
   margin-left:-1%;
  margin-top: 20%;
  font-size: 14px;
}

</style>
