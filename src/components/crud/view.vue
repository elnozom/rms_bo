<template>
  <v-container>
    <v-card :elevation="1">
      <v-card-title>
        <v-btn @click.prevent="edit" class="mr-4 app-btn w-200">
          <v-icon small> mdi-pencil </v-icon>
          {{ $t("edit") }}
        </v-btn>
        <v-btn @click.prevent="remove" class="mr-4 app-btn  w-200">
          <v-icon small> mdi-delete-outline </v-icon>
          {{ $t("delete") }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="view-list" v-if="loading">
          <v-skeleton-loader
            v-for="(key, index) in d.viewable"
            :key="index"
            type="list-item-two-line"
          ></v-skeleton-loader>
        </div>
        <div class="view-list" v-else>
          <div
            class="view-item"
            v-for="(key, index) in d.viewable"
            :key="index"
          >
            <h2>
              {{ key }}
            </h2>
            <v-img
              v-if="key.includes('Img') || key.includes('Image')"
              :src="$baseImgUrl + d.data[key]"
              :width="200"
            /> 
            <iframe v-else-if="key.includes('Url')" 
                    width="560" 
                    height="315" 
                    :src="`https://www.youtube.com/embed/${d.data[key]}`" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           
            <iframe
              :src="d.data[key]"
              width="500"
              height="300"
              v-else-if="key.includes('Location') || key.includes('Video')"
            />
            <a
              :href="$baseImgUrl + d.data[key]"
              target="_blank"
              v-else-if="key.includes('File')"
            >{{$t('download')}}</a>
            <h3 v-else-if="d.data[key]" v-html="d.data[key]"> 
            </h3>
            <h3 v-else>
              {{ $t("not_defined") }}
            </h3>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import View from "./view";
import { bus } from '@/main'
import { Delete } from "@/repositories/global"
export default Vue.extend({
  data(){
      return{
          loading : true
      }
  },    

  props: {
    d: {
      required: true,
      type: View,
    },
  },
  methods: {
    edit() {
      const currentPath = this.$route.path;
      const path = currentPath.replace("view", "edit");
      this.$router.push(path);
    },
    remove() {
       Delete({table : this.d.table ,id : this.d.id}).then((res:any) => {
          const currentPath = this.$route.path;
          const path = currentPath.replace("view", "");
          // this.$router.push(path)
          bus.$emit('getTableData');
        })
    },
  },
  mounted(){
      this.d.find().then(()=>this.loading = false)
  }
});
</script>