<template>
   <td><img class="table-img" :src="src" /></td>
</template>



<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props:['item' , 'itemKey'],
  computed:{
    src(){
      const item = this.item as any
      const key = this.itemKey as any
      const value = item[key]
      return `${process.env.VUE_APP_IMG_URL}${value}`
    }
  }
});
</script>