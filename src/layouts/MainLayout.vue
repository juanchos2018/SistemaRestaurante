<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-red-1">
        <q-tabs v-model="tab" shrink>
          <q-tab
            name="cafeteria"
            icon="restaurant_menu"
            label="Cafeteria"
            @click="Cafeteria"
          />
          <q-tab
            name="mipedido"
            icon="local_grocery_store"
            label="MiPedido"
            @click="MiPedido"
          />
          <q-tab
            name="historial"
            icon="fab fa-get-pocket"
            label="Historial"
            @click="Historial"
          />          
        </q-tabs>
        <q-space />
        <q-btn
          class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="~assets/avatar.png" />
            </q-avatar>

            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>{{ modelo.DES_AUXILIAR }}</q-item-label>
                    <!-- <q-item-label caption>Usuario</q-item-label> -->
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="Salir">
                  <q-item-section>
                    <q-item-label>Salir</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info" color="amber" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <!-- class="bg-grey-2" -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",
  components: {},
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const storage = ref(0.26);   
    const modelo = reactive({ COD_AUXILIAR: "", DES_AUXILIAR: "" });
   
   return {
      modelo,
      leftDrawerOpen,
      search,
      storage,
      tab: ref("cafeteria"),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  created() {
    let existe = this.$q.sessionStorage.has("Qsesion");
    if (existe == false) {
      this.$router.push({ path: "/" }).catch((err) => {
        if (
          err.name !== "NavigationDuplicated" &&
          !err.message.includes(
            "Evitó la navegación redundante a la ubicación actual"
          )
        ) {
          console(err);
        }
      });
    }
  },
  mounted() {
    let existe = this.$q.sessionStorage.has("Qsesion");
    if (existe == true) {
      let obj = this.$q.sessionStorage.getItem("Qsesion");
      this.modelo.DES_AUXILIAR = obj.DES_AUXILIAR;
      this.modelo.COD_AUXILIAR = obj.COD_AUXILIAR;
    }
  },
  computed: {
    esCocinero() {
      let existe = this.$q.sessionStorage.has("Qsesion");
      if (existe == true) {
        let datos = JSON.parse(localStorage.getItem("Qsesion"));
        return datos.AREA == "COCINA";
      }
    },
    esCliente() {
      let existe = this.$q.sessionStorage.has("Qsesion");
      if (existe == true) {
        let datos = JSON.parse(localStorage.getItem("Qsesion"));
        return datos.AREA == "Medico";
      }
    },
  },
  methods: {
    Salir() {
      this.$router.push({ path: "/" });
      this.$q.sessionStorage.remove("Qsesion");
      this.$q.sessionStorage.clear();
      localStorage.removeItem("Qsesion");
    },
    Cafeteria() {
      //to="/Sistema/Cafeteria"
      this.tab = "cafeteria";
      this.$router.push({ path: "/Sistema/Cafeteria" });
    },
    MiPedido() {
      //to="/Sistema/Cafeteria"
      this.tab = "mipedido";
      this.$router.push({ path: "/Sistema/MiPedido" });
    },
    Historial() {
      this.tab = "historial";
      this.$router.push({ path: "/Sistema/MisPedidos" });
    },
  },
});
</script>
