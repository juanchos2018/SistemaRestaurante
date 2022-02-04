<template>
  <q-layout view="lHh LpR lFf">
    <q-header
      reveal
      :class="$q.dark.isActive ? 'header_dark' : 'header_normal'"
    >
      <q-toolbar>
        <q-btn
          @click="left = !left"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title>Cafeteria</q-toolbar-title>
        <q-btn
          class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />

        <q-btn
          flat
          round
          dense
          icon="fas fa-sign-out-alt"
          @click="logoutNotify"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      class="left-navigation text-white bg-images q-drawer2"
      show-if-above
      v-model="left"
      side="left"
      elevated
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px); padding: 10px">
          <q-toolbar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <q-toolbar-title>{{ modelo.DES_AUXILIAR }}</q-toolbar-title>
          </q-toolbar>
      <q-separator color="red" inset />
          <q-scroll-area style="height: 100%">
            <q-list padding>
              <q-item
                active-class="tab-active"
                to="/Cocina/Cocina"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="room_service" />
                </q-item-section>

                <q-item-section> Cocina </q-item-section>
              </q-item>
              <q-item
                active-class="tab-active"
                to="/Cocina/Categoria"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="eco"  />
                </q-item-section>

                <q-item-section> Productos </q-item-section>
              </q-item>
             
              <q-item
                active-class="tab-active"
                to="/Cocina/Tomorrow"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="local_grocery_store" />
                </q-item-section>

                <q-item-section> Reserva </q-item-section>
              </q-item>
               <q-item
                active-class="tab-active"
                to="/Cocina/Historial"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="folder" />
                </q-item-section>

                <q-item-section> Historial </q-item-section>
              </q-item>


                <!-- <q-item
                active-class="tab-active"
                to="/Cocina/step"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="dashboard" />
                </q-item-section>

                <q-item-section> No entrar </q-item-section>
              </q-item> -->
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view />
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import { mapState } from "vuex";
export default {
  data() {
    return {
      left: false,
      modelo: { COD_AUXILIAR: "", DES_AUXILIAR: "" },
    };
  },
  created() {
    let existe = this.$q.sessionStorage.has("Qsesion");
    if (existe == false) {
      this.$router.push({ path: "/" }).catch((err) => {
        if (err.name !== "Duplicated" && !err.message.includes("Evitó la navegación redundante")) {
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
    ...mapState(["url_base","url_base2", "url_izipay", "url_socket","url_socket2","tipoListaCocina"]),   
  },
  methods: {
    logoutNotify() {
      this.$router.push({ path: "/" });
      this.$q.sessionStorage.remove("Qsesion");
      this.$q.sessionStorage.clear();
      localStorage.removeItem("Qsesion");
    },
    
  },
};
</script>

<style lang="css" >
.q-drawer2 {
  /*background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;*/
  background-image: url("~assets/clinicaluzdos.jpg") !important;
  background-size: cover !important;
}

.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}

.drawer_dark {
  background-color: #010101f2;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background-color: rgb(235, 18, 18);
}

.header_normal {
  background: linear-gradient(
    145deg,
    rgb(111, 114, 113) 20%,
    rgb(199, 10, 10) 60%
  );
}

.header_dark {
  background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(233, 8, 8) 70%);
}
.bg-images {
  background-image: url("~assets/clinicaluzdos.jpg");
}
</style>
