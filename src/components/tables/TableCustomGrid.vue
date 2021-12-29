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
            <card-categoria  :name="props.row.nombre_categoria" ></card-categoria>
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

const data = [
  {
    name: 'Desayuno',
    Crated_Date: '15/3/2020',
    Project: 'Quasar Admin',
    avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
    progress: 80,
    des: 'Solutions Developer'
  },
  {
    name: 'Alumuerzo',
    Crated_Date: '10/2/2018',
    Project: 'Quasar QDraggableTree',
    avatar: 'https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4',
    progress: 50,
    des: 'Solutions Developer'
  },
  {
    name: 'Cena',
    Crated_Date: '10/2/2018',
    Project: 'Quasar Shopping',
    avatar: 'https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4',
    progress: 100,
    des: 'Solutions Developer'
  },
  {
    name: 'Bebidas',
    Crated_Date: '10/2/2019',
    Project: 'Quasar QMarkdown',
    avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
    progress: 60,
    des: 'Solutions Developer'
  },
  {
    name: 'Snack',
    Crated_Date: '10/1/2020',
    Project: 'Quasar QGrid',
    avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
    progress: 30,
    des: 'Solutions Developer'
  },
];

export default defineComponent({
  name: "TableCustomGrid",
  components: {CardCategoria},
  props:["itemCategoria"],
  setup() {
    return {
      columns,
      data
    }
  }
})
</script>

<style scoped>

</style>
