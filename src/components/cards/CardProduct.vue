<template>
  <q-card
    class="my-card colorborde"
    @click="
      aggrear(
        data.id_producto,
        data.nombre_producto,
        data.precio_venta,
        data.id_categoria,
        data.stock,
        data.usastock,
        data.fecha_sql
      )
    "
  >
    <!-- <q-img :src="url_base + data.imagen" :ratio="4 / 3">
      <div
        class="absolute-top text-h5 text-right text-bold text-green"
        style="height: 45px"
      >
        <strong> S/ {{ data.precio_ventas }}</strong>
      </div>
    </q-img> -->

    <!-- <q-card-section>
      <div v-if="data.usastock == 1">
        <q-badge
          fab
          color="primary"
          :label="data.stock > 0 ? 'Disponible' : 'Agotado'"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        />
      </div>
      <div v-else>
        <q-badge
          fab
          color="primary"
          label="Libre"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        />
      </div>
    </q-card-section> -->
    <q-item>
      <q-item-section>
        <q-item-label
          lines="1"
          class="
            q-mt-xs
            text-body2 text-weight-bold text-primary text-uppercase
          "
        >
          <span class="cursor-pointer">{{ data.nombre_producto }}</span>
        </q-item-label>

        <q-item-label caption>
          {{ data.descripcion }}
        </q-item-label>
     
          
     

      </q-item-section>     
    </q-item>

      <q-item  >
        <q-item-section>
              <q-item-label class="text-h6 text-bold text-green">
       S/ {{ data.precio_ventas }}
        </q-item-label>       
        </q-item-section>
  <q-item-section side top>
     <q-item-label v-if="data.usastock == 1" >
          stock : <q-icon name="fas fa-infinity" size="24px"></q-icon>
        </q-item-label>
        <q-item-label v-else>
          <span class="text-green text-bold" >
            <q-icon name="fas fa-infinity" size="24px"></q-icon
          ></span>
         
        </q-item-label>
       <q-item-label v-if="data.usastock == 1" >
          <q-badge 
          fab
          color="primary"
          :label="data.stock > 0 ? 'Disponible' : 'Agotado'"  
           
        />
        </q-item-label>
  <q-item-label v-else >
            <q-badge  
          fab
          color="primary"
          label="Libre"  
       
        />
        </q-item-label> 
  </q-item-section>

        



      </q-item>

    
    <q-separator />
      <q-item  v-ripple>
        <q-item-section>
         <q-item-label lines="1">
          <q-rating
            size="22px"
            v-model="data.estrellas"
            :max="5"
            color="yellow"
            readonly
          />
        </q-item-label>
        </q-item-section>
      </q-item>

  </q-card>
</template>

<script>
import { inject, defineComponent, toRefs } from "vue";
import { useQuasar } from "quasar";
import { mapState, useStore } from "vuex";
import moment from "moment";
import "moment/locale/es";

export default defineComponent({
  name: "CardProduct",
  props: ["data"],
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const arrayva = inject("arrayvacio");

    const fin = (title) => {
      $q.dialog({
        dark: true,
        title: "Ups",
        message: title + " Se ha agotado",
      })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    };
    const Mucho = () => {
      $q.dialog({
        dark: true,
        title: "Ups",
        message: "No tenemos Tanto Stock :(",
      })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    };
    const aggrear = (
      id_producto,
      title,
      preci,
      id_categoria,
      stock,
      usastock,
      fecha_sql
    ) => {
      //  if (usastock==1) {
      //   if (stock==0) {
      //     fin(title);
      //  }
      //   else{

      let obj = arrayva.value.find((x) => x.id_producto == id_producto);
      if (obj) {
        let position = arrayva.value.findIndex(
          (x) => x.id_producto == id_producto
        );
        let cantidad_pedido = obj.cantidad_pedido;
        //    if (cantidad_pedido>=stock) {
        //      Mucho()
        //     }else{
        let precio = obj.precio;
        arrayva.value[position].cantidad_pedido = cantidad_pedido + 1;
        arrayva.value[position].total =
          precio * arrayva.value[position].cantidad_pedido;
        arrayva.value[position].stock = stock;
        //  }
      } else {
        let fechas = fecha_sql.split("-");
        let anio = fechas[0];
        let mes = fechas[1];
        let dia = fechas[2];
        let fechape = dia + "-" + mes + "-" + anio;
        let fecha1 = anio + "/" + mes + "/" + dia;
        let nombreDia = moment(new Date(fecha1)).format("dddd");

        const objeto = {
          id_producto: id_producto,
          producto: title,
          cantidad_pedido: 1,
          id_categoria: id_categoria,
          precio: parseFloat(preci),
          total: parseFloat(preci),
          descripcion: "",
          stock: stock,
          usastock: usastock,
          reservado: "",
          fecha_pedido: fecha_sql,
          fecha_peruana: nombreDia + "-" + fechape,
        };
        arrayva.value.push(objeto);
      }
      $q.notify({
        message: "Agregado " + title,
        color: "accent",
        position: "top",
      });
      //   }

      //   }
      // else{
      //       let obj = arrayva.value.find((x) => x.id_producto == id_producto);
      //       if (obj) {
      //            let position = arrayva.value.findIndex((x) => x.id_producto == id_producto);
      //            let cantidad_pedido = obj.cantidad_pedido;
      //            let precio =obj.precio;
      //            arrayva.value[position].cantidad_pedido = cantidad_pedido + 1;
      //            arrayva.value[position].total = precio * arrayva.value[position].cantidad_pedido;
      //       }else{
      //            const objeto = {
      //                 id_producto: id_producto,
      //                 producto: title,
      //                 cantidad_pedido: 1,
      //                 id_categoria:id_categoria,
      //                 precio: parseFloat(preci),
      //                 total: parseFloat(preci) ,
      //                 descripcion:'',
      //                 stock:stock,
      //                 usastock:usastock,
      //                 reservado:''
      //               };
      //               arrayva.value.push(objeto);
      //       }
      //        $q.notify({
      //       message: "Agregado "+title,
      //       color: "accent",
      //       position: "top",
      //     });
      // }
    };
    const aggrear2 = (
      id_producto,
      title,
      preci,
      id_categoria,
      stock,
      usastock,
      fecha_sql
    ) => {
      let obj = arrayva.value.find((x) => x.fecha_pedido == fecha_sql);
      if (obj) {
        let position = arrayva.value.findIndex(
          (x) => x.fecha_pedido == fecha_sql
        );
        let cantidad_pedido = obj.cantidad_pedido;
        let fecha_pedido = obj.fecha_pedido;
        let id_produc = obj.id_producto;

        if (id_produc == id_producto) {
          let precio = obj.precio;
          arrayva.value[position].cantidad_pedido = cantidad_pedido + 1;
          arrayva.value[position].total =
            precio * arrayva.value[position].cantidad_pedido;
          arrayva.value[position].stock = stock;
        } else {
          let obj2 = arrayva.value.find(
            (x) => x.fecha_pedido == fecha_sql && x.id_producto == id_producto
          );
          let position2 = arrayva.value.findIndex(
            (x) => x.fecha_pedido == fecha_sql && x.id_producto == id_producto
          );
          if (obj2) {
            let cantidad_pedido = obj2.cantidad_pedido;
            let fecha_pedido = obj2.fecha_pedido;
            let id_produc = obj2.id_producto;
            let precio = obj2.precio;
            arrayva.value[position2].cantidad_pedido = cantidad_pedido + 1;
            arrayva.value[position2].total =
              precio * arrayva.value[position2].cantidad_pedido;
            arrayva.value[position2].stock = stock;
          } else {
            let fechas = fecha_sql.split("-");
            let anio = fechas[0];
            let mes = fechas[1];
            let dia = fechas[2];
            let fechape = dia + "-" + mes + "-" + anio;
            let fecha1 = anio + "/" + mes + "/" + dia;
            let nombreDia = moment(new Date(fecha1)).format("dddd");
            const objeto = {
              id_producto: id_producto,
              producto: title,
              cantidad_pedido: 1,
              id_categoria: id_categoria,
              precio: parseFloat(preci),
              total: parseFloat(preci),
              descripcion: "",
              stock: stock,
              usastock: usastock,
              reservado: "",
              fecha_pedido: fecha_sql,
              fecha_peruana: nombreDia + "-" + fechape,
            };
            arrayva.value.push(objeto);
          }
        }
      } else {
        let fechas = fecha_sql.split("-");
        let anio = fechas[0];
        let mes = fechas[1];
        let dia = fechas[2];

        let fechape = dia + "-" + mes + "-" + anio;
        let fecha1 = anio + "/" + mes + "/" + dia;
        let nombreDia = moment(new Date(fecha1)).format("dddd");
        const objeto = {
          id_producto: id_producto,
          producto: title,
          cantidad_pedido: 1,
          id_categoria: id_categoria,
          precio: parseFloat(preci),
          total: parseFloat(preci),
          descripcion: "",
          stock: stock,
          usastock: usastock,
          reservado: "",
          fecha_pedido: fecha_sql,
          fecha_peruana: nombreDia + "-" + fechape,
        };
        arrayva.value.push(objeto);
      }
    };
    return { aggrear, fin, aggrear2 };
  },
  computed: {
    ...mapState(["url_base", "url_izipay"]),
  },
  methods: {
    detail(id, title, preci) {
      this.$emit("additem", id, title, 1, parseInt(preci));
    },
    calcula() {
      this.$emit("calcula", canPrec);
    },
  },
});
</script>

<style scoped>
.colorborde {
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>
