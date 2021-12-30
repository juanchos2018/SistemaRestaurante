<template>
  <q-page class="q-pa-sm">

    <card-social icon_position="left" />
    <h5>incio dashboard </h5>

        <q-btn color="primary" label="Primary"  @click="Sonido" />

            <button @click="play">Play a sound</button>

      

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
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
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
    return {      
      play,
      mode: "list",
      rows,     
    };
  },
  methods: {
    Sonido(){
      const audio = new Audio('assets/timbre.mp3')
            audio.play()
    }
  }
});
</script>
