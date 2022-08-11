<template>
   <td>{{convertDate(value)}}</td>
</template>



<script lang="ts">
import Vue from "vue";
import { convertDate } from "@/utils/helpers/heleprs";
export default Vue.extend({
  props:['item' , 'itemKey'],
  computed:{
    value(){
      const item = this.item as any
      const key = this.itemKey as any
      return item[key]
    }
  },
  methods:{
    convertDate
  }
  
});
</script>