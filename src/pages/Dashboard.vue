<template>
  <q-page class="q-pa-sm">

    <card-social icon_position="left" />
    <h5>incio dashboard </h5>

        <!-- <q-btn color="primary" label="Sonar"  @click="Sonar" /> -->

            <button @click="Sonar">Play a sound</button>

      

    <q-table :rows="rows" row-key="name" />

    <div class="row q-col-gutter-sm  q-pb-sm">

      <card-time-line />
    </div>

    <table-visits />
  </q-page>
</template>

<script>
const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },

];

import { defineComponent, defineAsyncComponent ,ref} from "vue";
//import A1 from "~/music/timbre.mp3";

import useSound from 'vue-use-sound'
import buttonSfx from '../assets/timbre.mp3'

export default defineComponent({
  name: "PageIndex",
  components: {
    CardSocial: defineAsyncComponent(() =>
      import("components/cards/CardSocial")
    ),
    CardCharts: defineAsyncComponent(() =>
      import("components/cards/CardCharts")
    ),
    // CardCharts: () => import('components/cards/CardCharts'),

    CardWithImage: defineAsyncComponent(() =>
      import("components/cards/CardWithImage")
    ),
    CardTimeLine: defineAsyncComponent(() =>
      import("components/cards/CardTimeLine")
    ),

    TableVisits: defineAsyncComponent(() =>
      import("components/tables/TableVisits")
    ),
  },
  setup() {
     const [play] = useSound(buttonSfx)
     const Sonar2=()=>{
       play
     }
    return {      
      play,
      Sonar2,
      mode: "list",
      rows,     
    };
  },
  methods: {
   Sonar(){
     this.play()
   }
  }
});
</script>
