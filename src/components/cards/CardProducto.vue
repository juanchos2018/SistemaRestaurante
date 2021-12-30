<template>
  <q-card class="my-card rounded-card" flat bordered >
      <q-card-section horizontal>
       <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
        </q-card-section>
        <q-card-section class="q-pt-xs">
         
          <div class="text-h5 q-mt-sm q-mb-xs">Comida</div>
          <div class="text-subtitle2">Almuerzo</div>

        <div class="text-subtitle1 text-green-10 text-bold">
          S/. 12.00
        </div>
        <div class="text-caption text-grey">
          detalle de producto
        </div>
        </q-card-section>

     
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
          7:30PM
        </q-btn>
        <q-btn flat color="primary">
          Reserve
        </q-btn>
      </q-card-actions>
    </q-card>
</template>

<script>
export default {

}
</script>

<style>
.rounded-card {
    border-radius: 10px 10px 0px 0px;
}
</style>