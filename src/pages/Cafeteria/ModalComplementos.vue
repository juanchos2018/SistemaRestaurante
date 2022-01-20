<template>
  <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Inception</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis laudantium minus earum totam modi laborum illo, corporis fuga saepe animi aliquam ea enim assumenda ut nulla natus aperiam quis. Iste.
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Open another dialog" />
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
    name:'model-complementos',
    props: {
      ModalComplemento: {
      type: Boolean,
      required: true,
      default: false,
    }    
  },
    data(){
        return{               
             Show: this.ModalComplemento, 
        }  
    },
     watch: {
        ModalComplemento() {
        this.Show = this.ModalComplemento;
        },    
    },
    methods: {
        CerrarModal() {
                this.$emit("CerrarModal");
         },
    }

}
</script>

<style>

</style>