<template>
  <q-card>   
    <q-card-section class="q-pa-none">
      <q-table
        title="Productos"
        :rows="data"
        :columns="columns"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
        </template>
         <template v-slot:body-cell-Acciones="props">
          <q-td :props="props">
            <q-btn icon="fas fa-edit" size="sm" flat dense  @click="UpdateProduct(props.row.id_producto)"/>          
          </q-td>
        </template>

      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent, ref} from 'vue'


const columns = [
  {
    name: 'id_producto',
    field: 'id_producto',
    required: true,
    label: 'Codigo',
    align: 'left',   
  },
  {name: 'nombre_producto', align: 'center', label: 'Producto', field: 'nombre_producto', sortable: true},
  {name: 'precio_ventas', label: 'Precio', field: 'precio_ventas', sortable: true},
  {name: 'Acciones', label: 'Acciones', field: 'Acciones', sortable: false, align: 'center'}

];

export default defineComponent({
  name: "TableBasic",
  props:['data'],
  setup() {
    const show_filter = ref(false)

    return {
      filter: ref(''),
      show_filter,
     
      columns
    }
  },
  methods:{
     UpdateProduct(id_producto){      
      this.$emit("UpdateProduct",id_producto);     
      }
  }
})
</script>

<style scoped>

</style>
