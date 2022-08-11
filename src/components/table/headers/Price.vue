<template>
   <td>{{currency(parseFloat(item[itemKey]))}}</td>
</template>



<script lang="ts">
import Vue from "vue";
import { currency } from "@/utils/helpers/heleprs";
export default Vue.extend({
  props:['item' , 'itemKey'],
  methods:{
    currency
  }
  
});
</script>