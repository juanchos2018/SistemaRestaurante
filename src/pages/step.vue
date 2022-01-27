<template>
  <q-page
    padding
    class="flex justify-center"
  >

<!--   
  <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" /> -->

<!-- <lottie-animation
      ref="anim"
      :animationData="buttonSfx"
    /> -->
  </q-page>
</template>

<script>


import Lottie from "../components/lottie";
// import * as animationData from "../assets/woman.json";
import * as animationData from "../assets/empty.json";
import LottieAnimation from 'lottie-web-vue' 
import buttonSfx from '../assets/empty.json'
export default {
  name: "PageIndex",

  components: {
    lottie: Lottie,
     LottieAnimation
  },

  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2,
      buttonSfx:buttonSfx
    };
  },

  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    stop: function() {
      this.anim.stop();
    },
    play: function() {
      this.anim.play();
    },
    pause: function() {
      this.anim.pause();
    },
    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed);
    }
  }
};
</script>
