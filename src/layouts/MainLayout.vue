<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>        
        <q-tabs v-model="tab" shrink>
          <!-- <i class="fas fa-table"></i> -->
           <q-route-tab
            icon="fas fa-cookie-bite"
            to="/Sistema/Cafeteria"
            exact
            label="Cafeteria"
          /> 

         <q-route-tab
            icon="fas fa-mug-hot"
            to="/Sistema/Cocina"
            exact
            label="Cocina"
          />

          <q-route-tab
            icon="fab fa-get-pocket"
            to="/Sistema/Categoria"
            exact
            label="Categoria"
          />
           <!-- <q-route-tab
            icon="fab fa-get-pocket"
            to="/Sistema/Step"
            exact
            label="Step"
          /> -->
        </q-tabs>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
               
        
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="View All"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-indigo-8"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section  @click="Salir">Salir</q-item-section>
            </q-item>
           
        
            
          </q-list>
        </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>  

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import Messages from "./Messages";

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref('')
    const storage = ref(0.26)
   
    return {
      leftDrawerOpen,       
      search,
      storage,
      tab: ref(''),

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
        links1: [
        { icon: 'photo', text: 'Photos' },
        { icon: 'photo_album', text: 'Albums' },
        { icon: 'assistant', text: 'Assistant' },
        { icon: 'people', text: 'Sharing' },
        { icon: 'book', text: 'Photo books' }
      ],
      links2: [
        { icon: 'archive', text: 'Archive' },
        { icon: 'delete', text: 'Trash' }
      ],
      links3: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'help', text: 'Help & Feedback' },
        { icon: 'get_app', text: 'App Downloads' }
      ],
      createMenu: [
        { icon: 'photo_album', text: 'Album' },
        { icon: 'people', text: 'Shared Album' },
        { icon: 'movie', text: 'Movie' },
        { icon: 'library_books', text: 'Animation' },
        { icon: 'dashboard', text: 'Collage' },
        { icon: 'book', text: 'Photo book' }
      ],
    };
  },
  methods: {
    Salir(){
       this.$router.push({path:'/'})
    }
  }
});
</script>
