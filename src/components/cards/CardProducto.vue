<template>
  <q-card class="my-card rounded-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="col-5 flex flex-center">
        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
      </q-card-section>
      <q-card-section class="q-pt-xs">

        <div class="text-h5 q-mt-sm q-mb-xs">{{nombre_producto}}</div>
        <div class="text-subtitle2">{{nombre_categoria}}</div>

        <div class="text-caption text-grey">
          {{descripcion}}
        </div>
        <div class="text-subtitle1 text-green-9 text-bold">
          S/ {{precio_producto}}
        </div>
      </q-card-section>

    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="fas fa-edit">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-amber text-white shadow-4" :offset="[10, 10]">
          Editar
        </q-tooltip>
      </q-btn>

    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  //props: ["id_producto", "nombre_producto", "descripcion", "precio_producto"],
   props: { id_producto: {       
                type: Number,
                required: true,
                default: 0,        
            },
            nombre_producto:{
                type: String,
                required: true,
                default: '', 
            },
             descripcion:{
                type: String,
                required: true,
                default: '', 
            },
             precio_producto:{
                type: String,
                required: true,
                default: '', 
            },
             nombre_categoria:{
                type: String,
                required: true,
                default: '', 
            },},
  data(){
    return{

    }
  },
  methods:{
    
  }
};
</script>

<style>
.rounded-card {
  border-radius: 10px 10px 0px 0px;
}
</style>