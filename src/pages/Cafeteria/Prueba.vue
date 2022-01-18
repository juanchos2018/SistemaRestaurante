<template>
  <div class="q-pa-md">
    <q-table
      grid
      :card-container-class="cardContainerClass"
      title="Treats"
      :rows="itemCocina"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      v-model:pagination="pagination"
      :rows-per-page-options="rowsPerPageOptions"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                <card-pedido
              :id_pedido="props.row.id_pedido"
              :des_auxiliar="props.row.des_auxiliar"
              :piso_especialidad="props.row.piso_especialidad"
              :area="props.row.area"
              :color="props.row.color"
              :detalle="props.row.detalle"
              :estado="props.row.estado_pedido"
           
            ></card-pedido>
          <!-- <q-card>
            <q-card-section class="text-center">
              Calories for
              <br>
              <strong>{{ props.row.des_auxiliar }}</strong>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center" :style="{ fontSize: props.row.calories + 'px' }">
              <div>{{ props.row.piso_especialidad }} g</div>
            </q-card-section>



             <q-list>
            <q-item clickable v-for="item in  props.row.detalle" :key="item.id_pedido_detalle">
              <q-item-section avatar>
                <q-icon color="primary" name="local_bar" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle2"
                  >{{ item.nombre_producto }} - {{ item.cantidad_pedido }}
                </q-item-label>
                <q-item-label caption >{{
                  item.descripcion
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          </q-card> -->
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, computed, watch } from 'vue'
import { mapState } from "vuex";
import CardPedido from "components/cards/CardPedido.vue";

const deserts = [
  'Frozen Yogurt',
  'Ice cream sandwich',
  'Eclair',
  'Cupcake',
  'Gingerbread',
  'Jelly bean',
  'Lollipop',
  'Honeycomb',
  'Donut',
  'KitKat'
]

const rows = []

deserts.forEach(name => {
  for (let i = 0; i < 24; i++) {
    rows.push({ name: name + ' (' + i + ')', calories: 20 + Math.ceil(50 * Math.random()) })
  }
})

rows.sort(() => (-1 + Math.floor(3 * Math.random())))

export default {
    components: {
    CardPedido
  },
  setup () {
    const $q = useQuasar()
    let itemCocina = ref([]);
    function getItemsPerPage () {
      if ($q.screen.lt.sm) {
        return 3
      }
      if ($q.screen.lt.md) {
        return 6
      }
      return 9
    }

    const filter = ref('')
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage()
    })

    watch(() => $q.screen.name, () => {
      pagination.value.rowsPerPage = getItemsPerPage()
    })

    return {
      rows,
      itemCocina,
      filter,
      pagination,

      columns: [
        { name: 'des_auxiliar', label: 'des_auxiliar', field: 'des_auxiliar' },
        { name: 'piso_especialidad', label: 'Calories (g)', field: 'piso_especialidad' }
      ],

      cardContainerClass: computed(() => {
        return $q.screen.gt.xs
          ? 'grid-masonry grid-masonry--' + ($q.screen.gt.sm ? '3' : '2')
          : null
      }),

      rowsPerPageOptions: computed(() => {
        return $q.screen.gt.xs
          ? $q.screen.gt.sm ? [ 3, 6, 9 ] : [ 3, 6 ]
          : [3]
      })
    }
  },
  mounted() {
      this.get();
  },
  computed: {
  ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2"]),  
  },
  methods: {
       get() {
      let tipo="nuevo";
      let url="/Controller/PedidoController.php?tipo="+tipo;
      this.$axios
        .get(this.url_base+url)
        .then((response) => {
          this.itemCocina = response.data;
         
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },
  }
}
</script>

<style lang="sass">
.grid-masonry
  flex-direction: column
  height: 700px

  &--2
    > div
      &:nth-child(2n + 1)
        order: 1
      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3
    > div
      &:nth-child(3n + 1)
        order: 1
      &:nth-child(3n + 2)
        order: 2
      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
</style>
