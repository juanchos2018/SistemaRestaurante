<template>
      <q-layout view="lHh Lpr lff">
      <q-header  reveal
      :class="$q.dark.isActive ? 'header_dark' : 'header_normal'">
        <q-toolbar>         
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"></q-btn>          
        <q-toolbar-title> </q-toolbar-title>
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
        v-model="drawer"
        show-if-above       
        :width="200"
        :breakpoint="400"       
                  
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple exact active-class="tab-active" class="q-ma-sm navigation-item" to="/Sistema/Cafeteria" >
              <q-item-section avatar>
                <q-icon name="restaurant_menu"></q-icon>
              </q-item-section>
              <q-item-section>
                Cafeteria
              </q-item-section>
            </q-item>
            <q-item  clickable v-ripple    exact  active-class="tab-active"  class="q-ma-sm navigation-item" to="/Sistema/MiPedido">
              <q-item-section avatar>
                <q-icon name="local_grocery_store"></q-icon>
              </q-item-section>
              <q-item-section>
                MiPedido
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple  exact active-class="tab-active"  class="q-ma-sm navigation-item" to="/Sistema/MisPedidos" >
              <q-item-section avatar>
                <q-icon name="fab fa-get-pocket"></q-icon>
              </q-item-section>
              <q-item-section>
                Historial
              </q-item-section>
            </q-item>            
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="~assets/clinicalaluzdos.jpg" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
             <img src="~assets/avatar.png" />
            </q-avatar>
            <div class="text-weight-bold text-black ">{{ modelo.DES_AUXILIAR }}</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
         <router-view />
      </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const modelo = reactive({ COD_AUXILIAR: "", DES_AUXILIAR: "" }); 
    return {
      leftDrawerOpen,
      drawer: ref(false),
      miniState: ref(true),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      modelo,
    }
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
  methods: {
    logoutNotify() {
      this.$router.push({ path: "/" });
      this.$q.sessionStorage.remove("Qsesion");
      this.$q.sessionStorage.clear();
      localStorage.removeItem("Qsesion");
    },    
  },
  
}
</script>



<style lang="css" scoped>
.q-drawer2 { 
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
