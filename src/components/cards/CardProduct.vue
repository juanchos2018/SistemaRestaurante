<template>
  <q-card class="" @click="aggrear(data.id,data.title,data.amount)">
    <q-img :src="data.img" height="220px">
      <q-chip v-if="data.chip" :class="data.chip_class" :color="data.chip_color" :label="data.chip"></q-chip>
    </q-img>

    <q-card-section>
      <q-btn
        fab
         color="teal-7"
        :label="data.amount"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%);"
      />
    </q-card-section>

    <q-card-section>
      <div class="text-h6">
        {{ data.title }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        {{ data.caption }}
      </div>
     
    </q-card-section>
    <!-- <q-card-section>
      <div class="col-12">
        <span class="text-h6">{{ data.amount }}</span>
        <span class="text-h6 float-right">
          <q-btn label="See Details" rounded color="secondary" outline></q-btn>
        </span>
      </div>
    </q-card-section> -->
  </q-card>
</template>

<script>
import {inject,defineComponent} from 'vue'

export default defineComponent({
  name: "CardProduct",
  props: ['data'],
  setup(){
    
   const arrayva=inject('arrayvacio')
   const aggrear=(id,title,preci)=>{
     const objeto={
       id:id,producto:title,cantidad:1,precio: parseInt(preci)
     }
    // console.log(objeto);
     arrayva.value.push(objeto)
   }
    return{aggrear}
  },
   methods:{
    detail(id,title,preci){
      this.$emit("additem",id,title,1,parseInt( preci))
    }
  }
})
</script>

<style scoped>

</style>
