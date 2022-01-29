<template>
  <q-page padding>
   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsum eligendi iure accusantium. Sequi, delectus sit ducimus eligendi amet nemo quae. Aliquam inventore cupiditate repellat, ea cum facere? Illo, perferendis!</p>

    <q-btn-dropdown
      class="glossy"
      color="purple"
      label="Account Settings"
    >
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <q-toggle v-model="mobileData" label="Use Mobile Data" />
          <q-toggle v-model="bluetooth" label="Bluetooth" />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

          <q-btn
            color="primary"
            label="Logout"
            push
            size="sm"
            v-close-popup
          />
        </div>
      </div>
    </q-btn-dropdown>



   <q-banner  v-if="visibleAnunio" inline-actions rounded class="bg-orange text-white"  v-model="visibleAnunio">
      Parrillada 
   <q-spinner-grid color="red"   size="2em"/>
      <template v-slot:action> 
        <q-btn flat label="Dismiss" @click="ocultar"/>
      </template>
    </q-banner>


  </q-page>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
import { QSpinnerGrid } from 'quasar'
import { ref } from 'vue'

export default {
  name: "PageIndex",
  components: {QSpinnerGrid},
  data() {
    return {
      moment,
      horas: "",
      color:'primary',
      horas1: "",
      horaentrega: "12:01:00",
      horaActual: moment().format("LTS"),
      horaActual2: "",
      minute:'',
      fecha_actual: moment(new Date()).format("YYYY-MM-DD"),
      visibleAnunio:true,
        mobileData: ref(false),
      bluetooth: ref(false)

    };
  },
  mounted() {
    this.Hora();
    this.setTime();
    this.Ver();
  },
  methods: {

    Ver(){
      let araraytime =this.horaActual.split(":");
      let hora = araraytime[0];
      console.log(hora);
    },
     ocultar(){
      
        this.visibleAnunio=false
        console.log( this.visibleAnunio)
     } ,
    Hora() {
      this.horas1 = moment("2:00:00 PM", "h:mm:ss A").format("LTS");
      this.minute=moment("2:00:00 PM", "mm").format("LTS");
      var date = moment("2:00:00 PM", "h:mm:ss A")
        .add(30, "seconds")
        .add(2, "minutes")
        .format("LTS");
      this.horas = date;

      const now         = moment("2017-01-26T14:21:22+0000");//-
      const expiration = moment("2017-01-29T17:24:22+0000");//+
      // get the difference between the moments
      const diff = expiration.diff(now);
      //express as a duration
      const diffDuration = moment.duration(diff);
      // display
    //  console.log("Days:", diffDuration.days());
    //  console.log("Hours:", diffDuration.hours());
    //  console.log("Minutes:", diffDuration.minutes());
      let ho =       moment(this.fecha_actual+'T'+this.horaentrega);
      //console.log(ho)
    },
    setTime() {
      setInterval(() => {  
        this.horaActual2 = moment();  
      //  console.log( this.horaActual2)   
        let ho =       moment(this.fecha_actual+'T'+this.horaentrega);       
        const diff =  this.horaActual2.diff(ho);
        const diffDuration = moment.duration(diff);      
        if (diffDuration.minutes()>5) {
          this.color="secondary";
        }
      }, 1000);
    },
  },
};
</script>
