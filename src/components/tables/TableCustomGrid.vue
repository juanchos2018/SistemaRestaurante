<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
      Categoria
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section class="q-pa-none">
      <q-table grid :rows="itemCategoria" :columns="columns" hide-bottom>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <card-categoria   :id_categoria="props.row.id_categoria" :name="props.row.nombre_categoria" ></card-categoria>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

import CardCategoria from "components/cards/CardCategoria";


const columns = [
  {name: 'id_categoria', label: 'codigo', field: 'id_categoria', sortable: true, align: 'left'},
  {name: 'nombre_categoria', label: 'Categoria', field: 'nombre_categoria', sortable: true, align: 'left'},
  
];



export default defineComponent({
  name: "TableCustomGrid",
  components: {CardCategoria},
  props:["itemCategoria"],
  setup() {
    return {
      columns,
     
    }
  }
})
</script>

<style scoped>

</style>
