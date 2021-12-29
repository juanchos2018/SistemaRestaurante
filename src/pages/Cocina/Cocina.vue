<template>
  <q-page class="q-pa-sm">
    <h5>COCINA SOCKET </h5>

    <div class="row q-col-gutter-sm">
      <div class="col-md-3 col-lg-4 col-sm-12 col-xs-12" v-for="item in cards_data" :key="item.id">
        <card-product :data="item"></card-product>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import CardProduct from "components/cards/CardPedido.vue";
export default {
  name: "Cocina",
  components: {
    CardProduct,
  },
  data() {
    return {
      msg: "Test  Meesage",
      name: "jkun",
      conn: new WebSocket("ws://localhost:8090"),
      msgA: [],
      cards_data: [
        {
          id: 1,
          img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
          type: "free",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          title: "Title 1",
        },
        {
          id: 2,
          img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
          type: "paid",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          title: "Title 2",
        },
        {
          id: 3,
          img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
          type: "free",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          title: "Title 3",
        },
        {
          id: 4,
          img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
          type: "free",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          title: "Title 4",
        },
        {
          id: 4,
          img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
          type: "paid",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          title: "Title 5",
        },
        {
          id: 5,
          img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
          type: "free",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          title: "Title 6",
        },
      ],
      type: "All",
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 4,
    };
  },
  created() {},
  mounted() {
    this.get();
    this.conn.onopen = (e) => {
      console.log("conectdo we");
    };
    this.conn.onmessage = (e) => {
      this.rcv(e.data);
      this.noti2();
    };
  },
  computed: {
    getData2() {
      return this.getData().slice(
        (this.page - 1) * this.totalPages,
        (this.page - 1) * this.totalPages + this.totalPages
      );
    },
  },
  methods: {
    get() {
      this.$axios
        .get("http://localhost/ApiCafeteria/Controller/PedidoController.php")
        .then((response) => {
          //  me.listaMiembros = response.data;
          console.log(response.data);
          //  this.msgA=response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    },

    rcv(str) {
      this.get();
    },
    noti2(use) {
      this.$q.notify({
        message: "Te Llego una nuevo pedido we",
        color: "negative",
        position: "top-right",
      });
    },
    getData() {
      if (this.type == "All") {
        return this.cards_data;
      } else {
        let self = this;
        return this.cards_data.filter(function (item) {
          return item.type.toLowerCase() == self.type.toLowerCase();
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
