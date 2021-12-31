<template>
  <q-card :class="color">
    <q-item>
      <q-item-section>
        <div class="text-h6 text-white">{{des_auxiliar}}</div>
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
          <q-item-label class="text-h6 text-white">{{item.nombre_producto}} -  {{item.cantidad_pedido}} </q-item-label>
          <q-item-label caption class="text-white">{{item.descripcion}}</q-item-label>
        </q-item-section>
      </q-item>       
    </q-list>   
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
  
  }
};
</script>

<style>
.q-stepper__step-content {
  display:none !important
}
</style>