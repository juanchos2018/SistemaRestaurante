<template>
  <q-layout class="bg-image" v-cloak>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card
          v-if="!$q.screen.lt.sm"
          class="bg-transparent no-border no-shadow"
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar size="130px" class="shadow-10">
                <img src="profile.svg" />
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-white">
              <q-item-label>Inicio de Sesion</q-item-label>
              <q-item-label caption>
                <q-input
                  dark
                  color="white"
                  v-model="username"
                  label="Usuario"
                />
                <q-input
                  dark
                  v-model="password"
                  color="white"
                  :type="isPwd ? 'password' : 'text'"
                  placeholder="Enter Password"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label></q-item-label>
            </q-item-section>
            <q-item-section side center>
              <q-btn
               @click="Ingresar"
                round
                flat
                color="white"
                class="q-mt-lg bg-blue-5"
                icon="arrow_right_alt"
              ></q-btn>
            </q-item-section>
          </q-item>
        </q-card>
        <q-card
          v-if="$q.screen.lt.sm"
          class="bg-transparent no-border no-shadow"
        >
          <q-card-section class="text-center">
            <q-avatar size="130px" class="shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section class="text-center">
            <div class="text-h6 text-white">Inicio de Sesion</div>

            <q-input dark color="white" v-model="username" label="Usuario" />
            <q-input
              dark
              v-model="password"
              color="white"
              :type="isPwd ? 'password' : 'text'"
              placeholder="Enter Password"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn
           @click="Ingresar"
              round
              flat
              color="white"
              class="q-mt-lg bg-blue-5"
              icon="arrow_right_alt"
            ></q-btn>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "LockScreen",

  setup() {
    return {
      username: ref(""),
      password: ref(""),
      isPwd: ref("password"),

    };
  },
  methods: {
    Ingresar(){

      var tip="este si va we";
      var hol ="";     
      this.$router.push({path:'/Sistema/Cafeteria'})


    },
    Salir(){

    }
  }
});
</script>

<style>
.bg-image {
  background-image: url("~assets/cocina4.jpg");
}

[v-cloak] {
  display: none !important;
}
</style>
