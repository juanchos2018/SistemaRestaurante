<template>
  <q-card>
    <q-card-section class="q-pa-none">
      <!-- <p>{{data}}</p> -->
      <q-table
        title="Entrada"
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
         <template v-slot:body-cell-Acciones="props">
          <q-td :props="props">
            <q-btn
              icon="fas fa-edit"
              size="sm"
              flat
              dense
              @click="UpdateProduct(props.row.id_complemento)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";

const columns = [
  {
    name: "id_complemento",
    field: "id_complemento",
    required: true,
    label: "Codigo",
    align: "left",
  },
  {
    name: "descripcion",
    align: "center",
    label: "Nombre",
    field: "descripcion",
    sortable: true,
  }, 
  {
    name: "Acciones",
    label: "Acciones",
    field: "Acciones",
    sortable: false,
    align: "center",
  },
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
    UpdateProduct(id_complemento) {
      this.$emit("updateComplemento", id_complemento);
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
