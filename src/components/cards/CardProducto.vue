<template>
  <q-card class="my-card rounded-card colorborde" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="col-5 flex flex-center">
        <q-img :src="url_base+photo" />
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-h6 q-mt-sm q-mb-xs">{{ nombre_producto }}</div>  
        <div class="text-subtitle2">{{ descripcion }}</div>     
        <div class="text-caption text-grey">
          <q-icon :name="logo" size="xs" />
          {{ nombre_categoria }}
        </div>
        <div class="text-subtitle1 text-bold">
          S/ <span class="cursor-pointer text-green-9">{{ precio_venta }}</span>
        </div>
        <div class="text-subtitle1">
          Cant : 
          <span v-if="usastock==1" class="cursor-pointer text-primary text-bold" >
            {{ stock }}</span
          >
          <q-icon v-else name="fas fa-infinity" size="24px"></q-icon>
        </div>
      </q-card-section>
       <q-item-section side top>
              <q-option-group
      :options="options"
      type="checkbox"
      v-model="group"
    />

        </q-item-section>
     

    </q-card-section>
 
    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="fas fa-edit" @click="UpdateProduct">
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          class="bg-amber text-white shadow-4"
          :offset="[10, 10]"
        >
          Editar
        </q-tooltip>
      </q-btn>
     <q-space />
        <q-file
      :model-value="files"
      @update:model-value="updateFiles"
      label="Imagen"
      outlined
      multiple
      :clearable="!cargar"
    
   
    >
      <template v-slot:file="{ index, file }">
        <q-chip
          class="full-width q-my-xs"
          :removable="cargar && uploadProgress[index].percent < 1"
          square
          @remove="cancelFile(index)"
        >
          <q-linear-progress
            class="absolute-full full-height"
            :value="uploadProgress[index].percent"
            :color="uploadProgress[index].color"
            track-color="grey-2"
          />

          <q-avatar>
            <q-icon :name="uploadProgress[index].icon" />
          </q-avatar>

          <div class="ellipsis relative-position">
            {{ file.name }}
          </div>

          <q-tooltip>
            {{ file.name }}
          </q-tooltip>
        </q-chip>
      </template>

      <template v-slot:after v-if="canUpload">
        <q-btn
          color="primary"
          dense
          icon="cloud_upload"
          round
          @click="upload"
          :disable="!canUpload"
          :loading="cargar"
        />
      </template>
    </q-file>
  
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, computed, onBeforeUnmount,toRefs  } from 'vue'
import { mapState } from "vuex";
import axios from "axios";
import { useStore } from "vuex";
import { useQuasar } from 'quasar'

export default {
  //props: ["id_producto", "nombre_producto", "descripcion", "precio_producto"],
  props: {
    id_producto: {
      type: Number,
      required: true,
      default: 0,
    },
    nombre_producto: {
      type: String,
      required: true,
      default: "",
    },
    descripcion: {
      type: String,
      required: true,
      default: "",
    },
    precio_venta: {
      type: String,
      required: true,
      default: "",
    },
    nombre_categoria: {
      type: String,
      required: true,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
    },
    usastock: {
      type: Number,     
      default: 0,
    },
    photo: {
      type: String,
      default: "",
    },
  },
  emits: ['getproduct'],
  setup(props,{emit}) {
     const $q = useQuasar()
     const files = ref(null)
     const uploadProgress = ref([])
     const uploading = ref(null)
     const cargar = ref(null)
    const {id_producto}=toRefs(props);
    function cleanUp () {
      //  clearTimeout(uploading.value)
    }
    const funci =()=>{
      emit('getproduct','')
    }
    function emitirir () {
    //  clearTimeout(uploading.value)
    }

    function updateUploadSucces () {
     
       uploading.value=false
     //  alert("termino")
       console.log(uploading.value)
      }
      const   showNotif = () =>{
        $q.notify({
             message: "Se ha Subido la Imagen ",
              color: "accent",
              position: "top",
        })
      }
    function updateUploadProgress () {
      let done = true

      // uploadProgress.value = uploadProgress.value.map(progress => {
      //   if (progress.percent === 1 || progress.error === true) {
      //     return progress
      //   }

      //   const percent = Math.min(1, progress.percent + Math.random() / 10)
      //   const error = percent < 1 && Math.random() > 0.95

      //   if (error === false && percent < 1 && done === true) {
      //     done = false
      //   }

      //   return {
      //     ...progress,
      //     error,
      //     color: error === true ? 'red-2' : 'green-2',
      //     percent
      //   }
      // })
     uploading.value=done
      // uploading.value = done !== true
      //   ? setTimeout(updateUploadProgress, 300)
      //   : null
    }
     const store = useStore();
    onBeforeUnmount(cleanUp)
    const url_base = computed(() => store.state.url_base)

    return {
      files,
      url_base,
      cargar,
      funci, 
      uploadProgress,
      uploading,
      emitirir,
      updateUploadSucces,
      isUploading: computed(() => uploading.value !== null),
      canUpload: computed(() => files.value !== null),
      showNotif,
      cancelFile (index) {
        this.uploadProgress[ index ] = {
          ...this.uploadProgress[ index ],
          error: true,
          color: 'orange-2'
        }
      },

      updateFiles (newFiles) {
        files.value = newFiles
        uploadProgress.value = (newFiles || []).map(file => ({
          error: false,
          color: 'green-2',
          percent: 0,
          icon: file.type.indexOf('video/') === 0
            ? 'movie'
            : (file.type.indexOf('image/') === 0
                ? 'photo'
                : (file.type.indexOf('audio/') === 0
                    ? 'audiotrack'
                    : 'insert_drive_file'
                  )
              )
        }))
      },

      upload () {

      //   updateUploadProgress()
        //cleanUp()
         uploading.value=true
         cargar.value=true
    
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
       
      };

       // const allDone = uploadProgress.value.every(progress => progress.percent === 1)
        // uploadProgress.value = uploadProgress.value.map(progress => ({
        //   ...progress,
        //   error: false,
        //   color: 'green-2',
        //   percent: allDone === true ? 0 : progress.percent
        // }))   
      var file = files.value[0];    
      var formData = new FormData();
      formData.append("id_producto", id_producto.value);
      formData.append("file", file);
      let url = url_base.value+  "/Controller/Imagenes.php" ;   
     
      axios({
        method: "POST",
        url: url,
        data: formData,
        config,
      })
        .then(function(response) {         
        //  console.log(response);   
           cargar.value=false;
           files.value=null;
           funci();         
           showNotif();
        })
        .catch((error) => {
            console.log("errror  :");
            console.log(error);
            cargar.value=false;
          
        });       

      },
       group: ref([]),
      options: [
        { label: 'Lu', value: 'bat', size:"xs" },
        { label: 'Ma', value: 'friend', color: 'green' , size:"xs" },
        { label: 'Mi', value: 'upload', color: 'red', size:"xs"  },
        { label: 'Ju', value: 'ju', color: 'red', size:"xs"  },
        { label: 'Vi', value: 'vi', color: 'red', size:"xs"  }
      ]
    
    };
     
  },
   computed: {
    ...mapState(["url_base"]),
  },
  methods: {
    UpdateProduct() {
      this.$emit("UpdateProduct", this.id_producto);
    },
    listar(){
      this.$emit("getproduct");
    }
  },
};
</script>

<style>
.rounded-card {
  border-radius: 10px 10px 0px 0px;
}

.colorborde{
  border-width: 1px;
  border-style: solid;
  border-color: #b71408;
}
</style>