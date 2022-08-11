<template>
    <v-text-field
      :label="$t(input.label)"
      :id="`form-input-${input.name}`"
      ref="input"
      :disabled="input.disabled"
      :type="input.type"
      :prepend-icon="input.icon"
      :clearable="!input.required"
      :append-icon="input.required ? 'mdi-asterisk' : ''"
      :rules="input.rules ? input.rules : []"
      :hint="input.hint"
      :value="value"
      outlined
      @input="change"
    ></v-text-field>
</template>



<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props:['input' ,  'value'],
  watch:{
    "input.value" :(val) => {
      console.log("val")
      console.log(val)
    }
  },  
  methods:{
    change(val:any){
      this.input.val = val

      // if (this.type == 'number') {
      //   val = parseInt(val)
      // }
      if(this.input.type == 'number') {
        val = val == '' || val == null ? 0 : parseFloat(val)
      }
      this.$emit('input'  ,val)
    }
  }
});
</script>