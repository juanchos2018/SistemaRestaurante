<template>
  <q-card class="my-card rounded-card colorborde" flat>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <br />
        <div class="text-h6 q-mt-sm q-mb-xs">{{ descripcion }}</div>
        <div class="text-subtitle2">{{ nombre_subcategoria }}</div>

        <br />
      </q-card-section>
    </q-card-section>
    <div class="q-gutter-sm">
       <q-checkbox  val="lu" color="red" label="lu" v-model="dialunes"  size="xs" disable/>         
       <q-checkbox  val="ma" color="red" label="ma" size="xs" v-model="diamartes"  disable />   
       <q-checkbox  val="mi" color="red" label="mi" size="xs" v-model="diamiercoles" disable/>         
       <q-checkbox  val="ju" color="red" label="ju" size="xs" v-model="diajueves" disable />  
       <q-checkbox  val="vi" color="red" label="vi" size="xs" v-model="diaviernes" disable/>  
       <q-checkbox  val="sa" color="red" label="sa" size="xs" v-model="diasabado" disable/> 
    </div>
     <q-card-actions>
      <q-btn flat round icon="fas fa-edit" @click="updateProduct">
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          class="bg-amber text-white shadow-4"
          :offset="[10, 10]"
        >
          Editar
        </q-tooltip>
      </q-btn>
     <q-space />
       
    </q-card-actions>
  </q-card>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
export default {
  name:'card-complemento',
  // props: [
  //   "id_complemento",
  //   "id_subcategoria",
  //   "nombre_subcategoria",
  //   "descripcion",
  // ],
  props: {
     id_complemento: {
      type: Number,
      required: true,
      default: 0,
    },   
    descripcion: {
      type: String,
      required: true,
      default: "",
    },   
    nombre_subcategoria: {
      type: String,
      required: true,
      default: "",
    },  
    lunes: {
      type: Number,
      default: 0,
    },
    martes: {
            type: Number,
      default: 0,
    },
    miercoles: {
          type: Number,
      default: 0,
    },
     jueves: {
      type: Number,
      default: 0,
    },
    viernes: {
            type: Number,
      default: 0,
    },
    sabado: {
          type: Number,
      default: 0,
    }
  },
  data() {
    return {
      step: 0,
      fecha_actual: moment(new Date()).format("YYYY-MM-DD"),
      fecha_actual2: moment(new Date()).format("DD-MM-YYYY"),
    };
  },
  methods: {},
  computed: {
    dialunes(){
     return this.lunes==1?true:false
    },
    diamartes(){
     return this.martes==1?true:false
    },
    diamiercoles(){
     return this.miercoles==1?true:false
    },
    diajueves(){
     return this.jueves==1?true:false
    },
    diaviernes(){
     return this.viernes==1?true:false
    },
    diasabado(){
     return this.sabado==1?true:false
    },
  },
   
  methods:{
    updateProduct(){    
       this.$emit("updateComplemento", this.id_complemento);
    }
  }
};
</script>

<style>
.q-stepper__step-content {
  display: none !important;
}

.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>