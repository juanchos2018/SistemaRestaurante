<template>
  <q-card :class="color">
    <q-item>
      <q-item-section>
        <div class="text-subtitle2 text-white">{{des_auxiliar}}</div>
        <div class="text-subtitle2 text-white">{{area}}</div>
      </q-item-section>
      <q-item-section side>
        <!-- <q-btn label="add" size="sm" class="bg-indigo-8 text-capitalize text-white"></q-btn> -->
        <q-chip color="primary" text-color="white">{{piso_especialidad}}</q-chip>
      </q-item-section>
    </q-item>
    <q-separator></q-separator>
    <q-list>
      <q-item clickable v-for="item in detalle" :key="item.id_pedido_detalle">
        <q-item-section avatar>
          <q-icon color="primary" name="local_bar" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-white">{{item.nombre_producto}} -  {{item.cantidad_pedido}} </q-item-label>
          <q-item-label caption class="text-white">{{item.descripcion}}</q-item-label>
        </q-item-section>
      </q-item>       
    </q-list>
    <!-- alternative-labels  -->
      <q-stepper v-model="step" contracted   header-nav ref="stepper" :class="color" style="border-style: none;border-style:hidden; "    done-color="deep-orange"
      active-color="purple"
      inactive-color="secondary"  animated @click="Editar(step)" >
     
      <q-step :name="1"  icon="settings" title="Tarea" :done="estado>0" class="no-margin no-padding" >  
           
        <q-tooltip>
          Some text
        </q-tooltip>
    
      </q-step>

      <q-step :name="2"  icon="settings" :done="estado>1" class="no-margin no-padding">          
      </q-step>

      <q-step :name="3"  icon="settings" :done="estado>2">            
      </q-step>
    </q-stepper>
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