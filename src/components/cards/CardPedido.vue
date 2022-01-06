<template>
  <q-card :class="color">
    <q-item>
      <q-item-section>
        <div class="text-subtitle2 text-white">{{ des_auxiliar }}</div>
        <div class="text-subtitle2 text-white">{{ area }}</div>
        <div class="text-subtitle2 text-white">{{ piso_especialidad }}</div>
      </q-item-section>
      <q-item-section side>
        <q-btn-dropdown color="negative" size="sm">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label @click="Editar(4)" >Rechazar</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-item-section>
    </q-item>
    <q-separator></q-separator>
    <q-list>
      <q-item clickable v-for="item in detalle" :key="item.id_pedido_detalle">
        <q-item-section avatar>
          <q-icon color="primary" name="local_bar" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-white"
            >{{ item.nombre_producto }} - {{ item.cantidad_pedido }}
          </q-item-label>
          <q-item-label caption class="text-white">{{
            item.descripcion
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- alternative-labels  -->
    <q-stepper
      v-model="step"
      contracted
      header-nav
      ref="stepper"
      :class="color"
      style="border-style: none; border-style: hidden"
      animated
      @click="Editar(step)"
    >
      <q-step
        :name="1"
        icon="settings"
        title="Tarea"
        :done="estado > 0"
        class="no-margin no-padding"
      >    
      </q-step>
      <q-step
        :name="2"
        icon="settings"
        title="Tarea"
        :done="estado > 1"
        class="no-margin no-padding"
      >
      </q-step>
      <q-step :name="3" icon="settings"   title="Tarea" :done="estado > 2"> </q-step>
      </q-stepper>
  </q-card>
</template>
<script>
export default {
  props: [
    "id_pedido",
    "des_auxiliar",
    "piso_especialidad",
    "area",
    "detalle",
    "color",
    "estado",
  ],
  data() {
    return {
      step: 0,
      done1: false,
      done2: false,
      done3: false,
    };
  },
  methods: {
    Editar(step) { 
      console.log(step)
//4   -1 2 3
    if (step==4  && this.estado>0) {     
                this.$q.dialog({
            dark: true,
            title: "Ups",
            message: "No Puedes Efectuar esta Accion",
          })
          .onOk(() => {
            // console.log('OK')
          })
          .onCancel(() => {
            // console.log('Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
        
      }else{
         
          const datas={
        estado_pedido:step,
        id_pedido:this.id_pedido,
        lista:[],
        tipo:'Update'
        }
        this.$emit("update", datas);
       }   
    },
  },
};
</script>

<style>
.q-stepper__step-content {
  display: none !important;
}

.q-stepper__tab--active,
.q-stepper__tab--done {
  color: #b71408;
}
</style>