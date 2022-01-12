<template>
  <q-card>
    <q-card-section class="q-pa-none">
   
      <q-table
        title="Reservas"
        :rows="data"
        :columns="columns"
        row-key="name"
        :filter="filter"
        class="colorborde"
      >
        <template v-slot:top-right>
          <q-input
            v-if="show_filter"
            filled
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
            class="q-ml-sm"
            icon="filter_list"
            @click="show_filter = !show_filter"
            flat
          />
        </template>
       
      
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";

const columns = [
  {
    name: "id_producto",
    field: "id_producto",
    required: true,
    label: "Codigo",
    align: "left",
  },
  {
    name: "nombre_producto",
    align: "center",
    label: "Producto",
    field: "nombre_producto",
    sortable: true,
  },
 
  { name: "cantidad_pedido", label: "Cantida Pedido", field: "cantidad_pedido", sortable: true },
 
  
];

export default defineComponent({
  name: "TableBasic",
  props: ["data"],
  setup() {
    const show_filter = ref(false);

    return {
      filter: ref(""),
      show_filter,
      columns,
    };
  },
  methods: {
    UpdateProduct(id_producto) {
      this.$emit("UpdateProduct", id_producto);
    },
  },
});
</script>

<style scoped>
.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>
