<template>
  <q-card class="" @click="aggrear(data.id_producto,data.nombre_producto,data.precio_producto,data.id_categoria)">
    <q-img src="../../assets/products/c-d-x-PDX_a_82obo-unsplash.jpg" height="150px">

    </q-img>
<!-- parseFloat(data.precio_producto).toFixed(2) -->
    <q-card-section>
      <q-btn fab color="teal-7" :label="parseFloat(data.precio_producto).toFixed(2)" class="absolute" style="top: 0; right: 12px; transform: translateY(-50%);" />
    </q-card-section>

    <q-card-section>
      <div class="text-h6">
        {{ data.nombre_producto }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        {{ data.nombre_categoria }}
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
import { inject, defineComponent } from "vue";
import { useQuasar } from 'quasar'

export default defineComponent({
  name: "CardProduct",
  props: ["data"],
  setup() {
    const $q = useQuasar()
    const arrayva = inject("arrayvacio");
    const aggrear = (id_producto, title, preci,id_categoria) => {

    let obj = arrayva.value.find((x) => x.id_producto == id_producto);

      if (obj) {
          let position = arrayva.value.findIndex((x) => x.id_producto == id_producto);
          let cantidad_pedido = obj.cantidad_pedido;
          let precio =obj.precio;
          arrayva.value[position].cantidad_pedido = cantidad_pedido + 1; 
          arrayva.value[position].total = precio * arrayva.value[position].cantidad_pedido;    
      }
      //parseFloat(preci).toFixed(2) 
       //parseFloat(preci).toFixed(2) 
      else{
        const objeto = {
          id_producto: id_producto,
          producto: title,
          cantidad_pedido: 1,
          id_categoria:id_categoria,
          precio: parseInt(preci),
          total: parseInt(preci) ,
          descripcion:''
        };     
        arrayva.value.push(objeto);
        $q.notify({
              message: "Agregado!",
              color: "accent",
              position: "top",
            });
      }   
    };
    return { aggrear };
  },
  methods: {
    detail(id, title, preci) {
      this.$emit("additem", id, title, 1, parseInt(preci));
    },
    calcula(){
       this.$emit('calcula',  canPrec);
    }
  },
});
</script>

<style scoped>
</style>
