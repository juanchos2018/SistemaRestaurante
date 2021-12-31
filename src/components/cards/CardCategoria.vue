<template>
  <q-card @click="Detalle">
    <q-card-section class="text-center">
      <q-avatar size="100px" class="shadow-10">
        <!-- <img :src="avatar"> -->
        <i class="fas fa-cubes"></i>
      </q-avatar>
    </q-card-section>

    <q-card-section class="q-pt-none text-center ">
      <div class="text-h6  text-grey-8">
        {{ name }}-{{id_categoria}}
      </div>
      <!-- <div class="text-caption text-grey-8">
        {{ des }}
      </div> -->
    </q-card-section>   
  </q-card>
</template>
<script>

export default {
  name: "CardCategoria",
//  props: ['id_categoria', 'name'],
    props: { id_categoria: {       
                type: Number,
                required: true,
                default: 0,        
            },
            name:{
                type: String,
                required: true,
                default: '', 
            }},
  components: {    

  },
  data() {
    return {
      itemEspacios: []
    };
  },
  created() {
		
	},
  computed: { 
  },
  mounted() {   
  },
  methods: {
     Detalle(){   
      var id_categoria = parseInt(this.id_categoria);
      this.$router.push({name:"/ProductoList",params:{ id_categoria} });
    //   this.$router.push({path:'/Sistema/Cafeteria'})
     }    
  },
};
</script>
<style scoped>

</style>
