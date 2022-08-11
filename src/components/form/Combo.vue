<template>
<div>

  <v-combobox
    @change="change"
    @click:clear="change"
    :cache-items="input.cache"
    :item-text="input.text"
    :item-value="input.valueKey"
    :items="input.items"
    :disabled="input.disabled"
    :readonly="input.disabled"
    :rules="input.rules ? input.rules : []"
    :loading="loading"
    :prepend-icon="input.icon"
    :append-icon="input.required ? 'mdi-asterisk' : ''"
    return-object
    hide-details
    v-model="model"
    outlined
    :clearable="!input.required"
    :label="$t(input.label)"
    single-line
  ></v-combobox>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Api from '@/utils/axios/Api';
import { serializeQuery } from "@/utils/helpers/heleprs";
import bus from "@/bus";
const Http = Api.getInstance();
export default Vue.extend({
  data(){
    return{
      loading:false,
      model:null as Object | null
    }
  },
  props: {
    input: Object,

  },
  watch:{
    "input": (value) =>{
      console.log("value")
      console.log(value)
    }
  },
  methods:{
      change(val:any){
        const value = typeof val == 'undefined' || val == null ? null :val[this.input.valueKey]
        this.$emit('input' , value)
      },
       getData(){
        this.loading = true
        Http.get(`${this.input.url}?${serializeQuery(this.input.payload)}`)
        .then((d) => {
          this.loading = false
          this.input.items = d
          this.setModel(this.input.value)
        })
      },
      setModel(value : any){
        let m = this.input.items.filter((item:any)=>{
            return item[`${this.input.valueKey}`] == value
          })[0]
         this.model = m
      }
  },
  created(){
    if (this.input.initialFetch) this.getData()
    bus.$on("changeStateAppForm", (state:any) => {
        this.setModel(state[this.input.name])
    });
    bus.$on("changeFormStateKey", (payload:any) => {
      if (payload.key == this.input.name) {
        this.setModel(payload.value)
      }
    });
    
    bus.$on("getGroupsTree", (state:any) => {
        this.getData()
    });
    
  }
  
});
</script>