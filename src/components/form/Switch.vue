
<template>

<v-switch @change="change" :input-value="value" :label="$t(input.label)"/>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    input: Object,
    value : Boolean,
  },

  methods:{
      change(val:boolean){
        this.input.val = val
          this.$emit('input' , val)
      }
  },
});
</script>

