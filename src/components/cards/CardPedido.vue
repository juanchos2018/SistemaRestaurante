<template>
  <q-card class="my-card bg-positive text-white">
    <q-item>
      <q-item-section>
        <div class="text-h6">Nombre Medico</div>
        <div class="text-subtitle2">Especialidad</div>
      </q-item-section>

      <q-item-section side>
        <!-- <q-btn label="add" size="sm" class="bg-indigo-8 text-capitalize text-white"></q-btn> -->
        <q-chip color="primary" text-color="white">2 Piso</q-chip>
      </q-item-section>
    </q-item>
    <q-separator></q-separator>
    <q-list>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="primary" name="local_bar" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6">Arroz con pollo y lechuga</q-item-label>
          <q-item-label caption class="text-white">no tan helado</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="red" name="local_gas_station" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6">Caldo de gallina</q-item-label>
          <q-item-label caption class=" text-white text-subtitle2">con limon y sal.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="amber" name="local_movies" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6">Ensalada de frutas</q-item-label>
          <q-item-label caption class=" text-white">solo con mayonesa</q-item-label>
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
  props: ["des_auxiliar", "title", "icon", "price", "text"],
};
</script>

<style>
</style>