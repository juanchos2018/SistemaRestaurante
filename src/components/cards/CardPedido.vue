<template>
  <q-card class="my-card bg-positive text-white">
    <q-item>
      <q-item-section>
        <div class="text-h6">{{des_auxiliar}}</div>
        <div class="text-subtitle2">Especialidad</div>
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
          <q-item-label class="text-h6">{{item.nombre_producto}} -{{item.cantidad_pedido}} </q-item-label>
          <q-item-label caption class="text-white">descrpcion</q-item-label>
        </q-item-section>
      </q-item>       
    </q-list>
    <q-card-actions align="around">
      <q-btn flat>Action 1</q-btn>
      <q-btn flat>Action 2</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
  props: ["des_auxiliar", "piso_especialidad", "detalle"],
  data(){
    return{
      lista:[{id:1,nombre:'hola'},{id:2,nombre:'hola'}]
    }
  }
};
</script>

<style>
</style>