<template>
  <q-card :class="color">  
     <q-item>
      <q-item-section>
        <div class="text-subtitle2 text-white">{{ des_auxiliar }}</div>
        <div class="text-subtitle2 text-white">Area:  {{ area }}</div>
        <div class="text-subtitle2 text-white"> Piso : {{ piso_especialidad }}</div>
      </q-item-section>
        <q-item-section side top class=" text-white">
         ANULADO
        </q-item-section>
    
    </q-item>
    <q-separator></q-separator>
     <q-list bordered padding>
      <q-item v-for="item in detalle" :key="item.id_pedido_detalle">
        <q-item-section avatar>
          <q-icon color="primary" :name="item.logo" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.nombre_producto }}</q-item-label>
          <q-item-label caption lines="2">{{ item.descripcion }}</q-item-label>
           <q-item-label caption lines="1"> Cant.: {{ item.cantidad_pedido }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
         
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-section class="col-5 flex flex-left text-white text-bold">
      <div>Total: S/ {{ totalpedido }}</div>
    </q-card-section>   
  </q-card>
</template>
<script>
export default {
  props: ["id_pedido","des_auxiliar", "piso_especialidad","area", "detalle","color","estado","totalpedido"],
  data(){
    return{   
      step: 0,
      done1 : false,
      done2 : false,
      done3 :false,
   
    }
  },
  methods: {
  
  }
};
</script>

<style>
.q-stepper__step-content {
  display:none !important
}
</style>