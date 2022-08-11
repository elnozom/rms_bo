<template>
  <v-app>
      <!-- <div class="breadcrumbs-wrapper"></div> -->
    <drawer/>
    <v-main>
       <breadcrumbs />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Drawer from "@/components/layouts/Drawer.vue";
import { Validate } from "@/repositories/user";
import Breadcrumbs from "@/components/layouts/Breadcrumbs.vue";

export default Vue.extend({
  name: "App",
  components: {
    Drawer,
    Breadcrumbs

  },
  created(){
    if(!localStorage.getItem('token')) {
      this.$router.push('/login')
      return 
    }
     Validate().catch(() => {
        this.$router.push('/login')
      })
  }
});
</script>