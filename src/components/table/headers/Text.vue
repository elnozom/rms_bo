<template>
    <td>{{item[itemKey]}}</td>
</template>



<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props:['item' , 'itemKey'],
});
</script>