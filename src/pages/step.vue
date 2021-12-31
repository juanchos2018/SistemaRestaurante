<template>
  <q-page class="q-pa-sm">
    <h5>step dos</h5>

    <q-btn
      label="Reset"
      push
      color="white"
      text-color="primary"
      @click="step = 1"
      class="q-mb-md"
    />

    <q-stepper v-model="step" header-nav ref="stepper"  style="background-color:#21ba45"  animated @click="alerta(step)" >
     <q-step :name="1" title="Proceso" icon="settings" :done="done1"  >
         
      </q-step>

      <q-step :name="2" title="Listo" icon="create_new_folder" :done="done2">
         
      </q-step>
      <q-step :name="3" title="Atendido" icon="add_comment" :done="done3">
         
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faColumns } from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  name: "Directory",
  components: {
    DirectoryCard: defineAsyncComponent(() =>
      import("components/cards/MesaItem")
    ),
    FontAwesomeIcon,
  },
  setup() {

      const done1 = ref(false)
    const done2 = ref(false)
    const done3 = ref(false)
    return {
      myIcon: faColumns,
      step: ref(1),
       done1,
      done2,
      done3,
    };
  },


  methods: {
    alerta(name){
      alert(name)
    }
  }
});
</script>

<style >
.q-stepper__step-content {
  display:none !important
}
</style>
