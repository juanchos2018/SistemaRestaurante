<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Editar Tarea</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
       <!--   <q-input outlined   v-model="descripcion" label="nombre tarea" /> -->
          <label style="color: #1A86D0;  font-weight:bold;">descripcion</label> 
            <label style="color: #1A86D0;  font-weight:bold;">{{id_categoria}}</label> 
        </q-card-section>
        
       


            <div class="row">
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width"  label="First Name *" v-model="id_categoria"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width" label="Last Name *"/>
                </q-item>
              </div>
              <div class="col-12">
                <q-item>
                  <q-input dense autogrow outlined  class="full-width"
                           label="Address line 1 *"/>
                </q-item>
              </div>
              <div class="col-12">
                <q-item>
                  <q-input dense autogrow outlined class="full-width"
                           label="Address line 2 *"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width" label="City *"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width" label="State"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width"  label="Zip Code"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width" label="Country *"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-checkbox dense outlined class="full-width" 
                              label="Use this address for payment details"/>
                </q-item>
              </div>
            </div>





        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />        
          <q-btn color="primary" label="Registrar"   />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>


import moment from 'moment'
import Vue from "vue";

export default {
    name: 'dialogo-add-producto',  
    props:{
      DialogoAddProducto: {       
        type: Boolean,
        required: true,
        default: false
      },id_categoria: [Number, Number]  
      
    },
    data() {
        return {
          contador:0,
          CodeMetodologia:'M',
          codigo:'',
          nombre:'',            
          isLoading:false,          
          Show:this.DialogoTareaEditar,
          id_miembro:'',       
          fecha_inicio:'',
          fecha_termino:'',
          miembroreponsableID:'',
          urlevidencia:'',
          rango:this.porcentaje, 
          fecha_actual:moment().format('DD/MM/YYYY'),
          hora_actual:moment().format('HH:mm:ss'),
          estado_tarea:'',
          disabled: false,
          descripcion_avance:'',
          speed: 40,
          
        }
    },
    mounted: function () {
  //    this.rango=this.porcentaje;
     },
    watch: {
      DialogoAddProducto(){
        this.Show = this.DialogoAddProducto
      },   
      porcentaje(){
        this.rango = this.porcentaje;
      },  
    },
    created () {    
         
    },
    computed: {
     
    },
    methods: {                    
            RegistrarTimeline(estadota){
                  let miembroresponsableID=this.id_responsable;
                  let fecha=this.fecha_actual;
                  let hora=this.hora_actual;    
                  let estado=estadota;   
                  let id_tarea=this.id_tarea;  
                  let descripcion_avance=this.descripcion_avance;  
                  let porcentajeavance=this.rango;  
                  let urlevidencia=this.urlevidencia;

                  const obj={miembroresponsableID,fecha,hora,estado,id_tarea,porcentajeavance,urlevidencia,descripcion_avance};

                   this.$axios.post('Commit/Agregar',obj).then(response => {    
                           console.log(response.data)    
                           this.limpiar();           
                     }).catch(function (error) {
                      console.log(error);
                  }) .finally(() => {              
                })
            },                 
            ListarTareas(id){           
                this.$emit('ListarTareas-Emit',id);
            },  
             onChange(value) {
              console.log('change: ', value);
            },
            onAfterChange(value) {
              console.log('afterChange: ', value);
            },          
            CerrarModal(){              
                 this.$emit('CerrarModal');
            },
            
    }
};
</script>