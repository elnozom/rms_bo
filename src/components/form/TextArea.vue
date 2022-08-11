<template>
    <v-text-field
      :label="$t(input.label)"
      :prepend-icon="input.icon"
      :append-icon="input.required ? 'mdi-asterisk' : ''"
      :rules="input.rules ? input.rules : []"
      :value="value"
      :hint="input.hint"
      outlined
      @input="change"
    ></v-text-field>
</template>



<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props:['input' , 'value'],
  methods:{
    change(val:any){
      this.input.val = val
      if(this.input.isNumber) {
        val = parseFloat(val)
      }
      this.$emit('input'  ,val)
    }
  }
});
</script>