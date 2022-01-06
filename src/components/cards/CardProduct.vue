<template>
  <q-card class="my-card" @click="aggrear(data.id_producto,data.nombre_producto,data.precio_venta,data.id_categoria,data.stock)">
      <q-img src="../../assets/imgprueba.jpg" />
      <q-card-section>      
        <q-badge fab color="primary" :label="data.stock>0?'Disponible':'Agotado'"   class="absolute"   style="top: 0; right: 12px; transform: translateY(-50%);"/>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ data.nombre_producto }}
          </div>
          <div class="col-auto text-green  text-bold	 text-caption q-pt-md row no-wrap items-center">         
          S/   {{data.precio_ventas}}
          </div>
        </div>  
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
      stock :   {{ data.stock }}
        </div>
        <div class="text-caption text-grey">
         {{data.descripcion}}
        </div>
      </q-card-section>
      <q-separator />   
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
    const fin=()=>{
          $q
        .dialog({
          dark: true,
          title: "Ups",
          message: "Se ha agotado :(",
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
    const aggrear = (id_producto, title, preci,id_categoria,stock) => {
     if (stock==0) {
       fin()
     } else{
        let obj = arrayva.value.find((x) => x.id_producto == id_producto);
      if (obj) {
          let position = arrayva.value.findIndex((x) => x.id_producto == id_producto);
          let cantidad_pedido = obj.cantidad_pedido;
          let precio =obj.precio;
          arrayva.value[position].cantidad_pedido = cantidad_pedido + 1; 
          arrayva.value[position].total = precio * arrayva.value[position].cantidad_pedido;    
      }      
      else{
        const objeto = {
          id_producto: id_producto,
          producto: title,
          cantidad_pedido: 1,
          id_categoria:id_categoria,
          precio: parseFloat(preci),
          total: parseFloat(preci) ,
          descripcion:''
        };     
        arrayva.value.push(objeto);        
       }   
       $q.notify({
              message: "Agregado "+ title,
              color: "accent",
              position: "top",
        });
     }
     
    };
    return { aggrear,fin };
  },
  methods: {
    detail(id, title, preci) {
      this.$emit("additem", id, title, 1, parseInt(preci));
    },
    calcula(){
       this.$emit('calcula',  canPrec);
    },
    SinStock() {
      this.$q
        .dialog({
          title: "Ups",
          message: "Se ha agotado :(",
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
});
</script>

<style scoped>
</style>
