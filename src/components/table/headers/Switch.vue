<template>
   <td class="switch-td"><span>${{t(`${item[itemKey]}`)}}</span></td>
</template>



<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props:['item' , 'itemKey'],
  
});
</script>