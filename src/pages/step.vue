<template>
  <q-page class="q-pa-sm">
    <h5>step dos</h5>

<p>{{itemCocina}}</p>
    <div class="float: right">

      <q-stepper v-model.number="step" vertical color="primary" animated style="border-style: none;border-style:hidden; ">
        <q-step :name="0" title="Recibido" icon="settings" :done="step > 0">
        </q-step>
        <q-step :name="1" title="Proceso" icon="settings" :done="step > 1">
        </q-step>
        <q-step :name="4" title="Listo" icon="settings" :done="step > 1">
        </q-step>
      </q-stepper>
    </div>

    <br>
    <br>
    <div class="row q-col-gutter-sm">
      <div class="col-md-3 col-lg-4 col-sm-12 col-xs-12" v-for="item in itemCocina" :key="item.id_pedido">
        <card-mi-pedido :id_pedido="item.id_pedido" :des_auxiliar="item.des_auxiliar" :piso_especialidad="item.piso_especialidad" :area="item.area" :color="item.color" :detalle="item.detalle" :estado_pedido="item.estado_pedido"></card-mi-pedido>
     
     
     
     
      </div>
    </div>

    <!-- <q-stepper v-model.number="step" vertical color="primary" animated>
      <q-step :name="0" title="Recibido" icon="settings" :done="step > 0">
      </q-step>
      <q-step :name="1" title="Proceso" icon="settings" :done="step > 1">
      </q-step>
      <q-step :name="4" title="Listo" icon="settings" :done="step > 1">
      </q-step>
      <div>
        <h5>peiddo</h5>
      </div>
    </q-stepper> -->

    <!-- <div style="width:28%">
      <q-card class="my-card">
        <q-card-section horizontal>
          <q-list dense bordered padding class="rounded-borders">
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="primary" name="local_bar" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle2 ">nomrt ltjgjhghgkmhg hjhjhjhjhjh </q-item-label>
                <q-item-label caption>hghghg</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

        </q-card-section>
      </q-card>
    </div> -->

  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import CardMiPedido from "components/cards/CardMiPedido.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "MiPedido",
  components: { CardMiPedido },
  setup() {
    const done1 = ref(false);
    const done2 = ref(false);
    const done3 = ref(false);
    let itemCocina = ref([]);
    return {
      step: ref(0),
      done1,
      done2,
      done3,
      itemCocina,
    };
  },
  mounted() {
    this.get();
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    get() {
      let tipo = "nuevo";
      let url = "/Controller/PedidoController.php?tipo=" + tipo;
      this.$axios
        .get(this.url_base + url)
        .then((response) => {
          this.itemCocina = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
    alerta(name) {
      alert(name);
    },
  },
});
</script>

<style >
.q-stepper__step-content {
  display: none !important;
}
</style>
