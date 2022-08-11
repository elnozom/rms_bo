<template>
<div class="py-12">
  <v-container>
    <app-form :form="activeForm">
      <template v-slot:form-submit>
        <v-col cols="12">
          <v-btn  class="app-btn" @click.prevent="submit()">{{$t('submit')}}</v-btn>
        </v-col>
      </template>
    </app-form>
  </v-container>
</div>
</template>
<script lang="ts">
import AppForm from '@/components/form/Form.vue'
import EditAdd from '@/utils/crud/editAdd'
import bus from "@/bus";
import router from '@/router'
// import {snackBar} from '@/utils/Helpers'
export default {
  data(){
   let activeForm = this.d.form
   return{
     activeForm
   }
 },
  
 props:{
     d:{
         required: true,
         type:EditAdd
     }
 },
 watch:{
  '$route.params.id': {
        handler: function(id) {
          if (id) {
            this.activeForm = this.d.editForm
          } else {
            this.activeForm = this.d.form
          }
        },
        deep: true,
        immediate: true
      }
 },
 
 methods:{
    async submit(){
      const isFormValid = await this.activeForm.validate()
      if(!isFormValid){
        return
      }

       this.d.submit().then((res : any) => {
         if(this.d.callBack != null){
           this.d.callBack(this.activeForm.state)
         } else {
           this.$router.back()
         }
       }).catch((e : any) => {
         this.activeForm.error = e
       })
    }
  },
 components:{
     "app-form":AppForm
 },
 async created(){
   if (router.currentRoute.params.id) {
     await this.d.setId(parseInt(router.currentRoute.params.id))
   }
   bus.$on("editAddFind", async (id : number) => {
      await this.d.setId(id)
    })
 }
}
</script>
