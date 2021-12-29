<template>
  <q-card  :class="[estado==true ? 'my-card bg-red text-white' : 'my-card bg-green text-white']" @click="Comanda">
    <q-item>     

      <q-item-section>
        <q-item-label class="text-weight-bold">{{ name }}</q-item-label>
     
        <q-item-label >
          {{ email }}
        </q-item-label>
      </q-item-section>

    <q-item-section avatar>
        <q-avatar size="90px" class="shadow-11"> 
          <img src="~assets/mesas.png"/>
        </q-avatar>
      </q-item-section>
      
    </q-item>

    <q-separator></q-separator>
    <q-card-section>
      <div class="q-pa-sm ">
        Intro : At vero eo
     
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MesaItem",
  props: ['avatar', 'name', 'des', 'email','estado'],
  data(){
      return{

      }
  },
  computed: {
  
  },
  methods:{
    Comanda(){
      this.$router.push({path:'/Atender'})
    }
  }

})
</script>

<style scoped>

</style>
