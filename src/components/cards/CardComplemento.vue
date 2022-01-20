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
  </q-card>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
export default {
  name:'card-complemento',
  props: [
    "id_complemento",
    "id_subcategoria",
    "nombre_subcategoria",
    "descripcion",
  ],
  data() {
    return {
      step: 0,
      fecha_actual: moment(new Date()).format("YYYY-MM-DD"),
      fecha_actual2: moment(new Date()).format("DD-MM-YYYY"),
    };
  },
  methods: {},
  computed: {},
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