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
        <q-stepper
          v-model.number="estado_pedido"
          vertical        
          animated
          style="border-style: none; border-style: hidden; margin-left: auto"
          class=" text-red no-padding no-margin"
        >
          <q-step
            :name="0"
            title="Recibido"
            icon="settings"
            :done="estado_pedido > 0"
            class="no-marginno-margin no-padding"
          >
          </q-step>
          <q-step :name="1" title="Proceso" icon="settings" :done="estado_pedido > 1">
          </q-step>
          <q-step :name="4" title="Listo" icon="settings" :done="estado_pedido > 1">
          </q-step>
        </q-stepper>
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