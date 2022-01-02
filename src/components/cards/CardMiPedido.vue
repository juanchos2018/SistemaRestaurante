<template>
 
  <q-card class="my-card " >
  <!-- <q-card-section horizontal>          
        <q-list dense bordered padding class="rounded-borders">
     <q-item clickable  v-for="item in detalle" :key="item.id_pedido_detalle">
        <q-item-section avatar>
          <q-icon color="primary" name="local_bar" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-subtitle2 ">{{item.nombre_producto}} -  {{item.cantidad_pedido}}</q-item-label>
          <q-item-label caption >{{item.descripcion}}</q-item-label>
        </q-item-section>
      </q-item>         
    </q-list>

    
          <q-stepper v-model.number="step" vertical color="primary" animated style="border-style: none;border-style:hidden; " >
            <q-step :name="0" title="Recibido" icon="settings" :done="step > 0">
            </q-step>
            <q-step :name="1" title="Proceso" icon="settings" :done="step > 1">
            </q-step>
            <q-step :name="4" title="Listo" icon="settings" :done="step > 1">
            </q-step>            
            </q-stepper>
       
      </q-card-section> -->

<!-- pones esto abajo -->
     <q-card-section horizontal >
          <q-list dense bordered  class="rounded-borders q-pt-xs">
            <br>
     <q-item clickable  v-for="item in detalle" :key="item.id_pedido_detalle">
        <!-- <q-item-section avatar>
          <q-icon color="primary" name="local_bar" />
        </q-item-section> -->
        <q-item-section>
          <q-item-label class="text-subtitle2 ">{{item.nombre_producto}} -  {{item.cantidad_pedido}}</q-item-label>
          <q-item-label caption >{{item.descripcion}}</q-item-label>
        </q-item-section>
      </q-item>         
    </q-list>
      <!-- no-margin no-padding -->
        <q-stepper v-model.number="step" vertical color="primary" animated style="border-style: none;border-style:hidden;  margin-left: auto;  " class=" no-padding"  >
        <q-step :name="0" title="Recibido" icon="settings" :done="step > 0" class="no-margin no-padding" >
        </q-step>
        <q-step :name="1" title="Proceso" icon="settings" :done="step > 1">
        </q-step>
        <q-step :name="4" title="Listo" icon="settings" :done="step > 1">
        </q-step>            
        </q-stepper>   
      </q-card-section>

    </q-card>
</template>
<script>
export default {
  props: ["id_pedido","des_auxiliar", "piso_especialidad","area", "detalle","color","estado"],
  data(){
    return{   
      step: 0,
      done1 : false,
      done2 : false,
      done3 :false,
   
    }
  },
  methods: {
    Editar(step){
     
      let data =step+"-"+this.id_pedido
      this.$emit("update",data)

    }
  }
};
</script>

<style>
.q-stepper__step-content {
  display:none !important
}
</style>