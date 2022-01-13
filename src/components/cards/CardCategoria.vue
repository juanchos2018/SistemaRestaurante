  <template>
  <q-card class="colorborde">
    <q-card-section class="text-center">
      <q-avatar size="100px" class="shadow-10">
        <!-- <img :src="avatar"> -->
        <!-- <i class="fas fa-cubes"></i> -->
          <q-icon  :name="logo" />
      </q-avatar>
    </q-card-section>

    <q-card-section class="q-pt-none text-center ">
      <div class="text-h6  ">
        {{ name }}
      </div>
      <!-- <div class="text-caption text-grey-8">
        {{ des }}
      </div> -->
        
    </q-card-section>   
      <q-card-actions align="around">
        <q-btn flat  color="primary" @click="Detalle">Productos</q-btn>
        <q-btn flat color="secondary" @click="Editar(id_categoria,name,logo,estado)">Editar</q-btn>
      </q-card-actions>
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
            },
            logo:{
                type: String,              
                default: '', 
            },
            estado:{
                type: Number,              
                default:0, 
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
      const id_categoria = parseInt(this.id_categoria);
      this.$router.push({name:"/ProductoList",params:{ id_categoria} });    
     },
     Editar(id,nombre_categoria,logo,estado){ 
       let datos ={
         id_categoria:id,
         nombre_categoria:nombre_categoria,
         logo:logo,
         estado:estado
       }
       this.$emit("editar",datos)
     }    
  },
};
</script>
<style scoped>
.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>
