<template>
      <q-table      
        :rows="data"
        :columns="columns"
        row-key="name"       
        class="colorborde"
      >           
      </q-table>
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
 
  { name: "cantidad_pedido", label: "Cantidad Pedido", field: "cantidad_pedido", sortable: true },
 
  
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
