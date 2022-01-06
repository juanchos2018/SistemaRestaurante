<template>
  <q-card class="my-card">
    <div class="row ">
      <div class="col-7 ">
        <q-list  class="rounded-borders q-pt-xs">
          <q-item
            clickable
            v-for="item in detalle"
            :key="item.id_pedido_detalle"
          >         
            <q-item-section>
              <q-item-label class="text-subtitle2"
                >{{ item.nombre_producto }} -
                {{ item.cantidad_pedido }}</q-item-label
              >
              <q-item-label caption>{{ item.descripcion }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-5">
       <h6>Entregado</h6>
      </div>
    </div>
  </q-card>
</template>
<script>
export default {
  name:'card-mi-medidos',
  props: [
    "id_pedido",
    "des_auxiliar",
    "piso_especialidad",
    "area",
    "detalle",
    "color",
    "estado_pedido",
  ],
  setup() {
    return {
      step: 0,
      done1: false,
      done2: false,
      done3: false,
    };
  },
  methods: {
   
  },
};
</script>

<style>
.q-stepper__step-content {
  display: none !important;
}
.q-stepper__tab--active, .q-stepper__tab--done {
    color: #b71408;
}
</style>