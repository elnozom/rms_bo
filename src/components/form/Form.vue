<template>
  
  <v-container>
    <v-card>
      <v-card-title class="bgdarker">
        <span><v-icon>{{ form.icon }}</v-icon>       {{ form.title }}</span>
      </v-card-title>
      <v-card-text>
         <v-skeleton-loader
      v-if="loading"
      type="article"
    ></v-skeleton-loader>
    <v-form
      v-else
      :valid="form.valid"
      ref="appForm"
      enctype='multipart/form-data'
    >
      <v-row>
        <v-col cols="12">
          <v-alert
            border="bottom"
            color="error darken-1"
            dark
            class="mt-4"
            v-if="form.error"
          > {{$t(form.error)}}</v-alert>
        </v-col>
        <v-col
          :cols="input.field.cols"
          v-for="(input , index) in form.inputs"
          :key="index"
        >
          <component
            v-show="typeof input.field.hidden == 'undefined'"
            :ref="input.field.name"
            :class="input.field.name"
            :is="input.field.generateInputHtml()"
            v-model="form.state[input.field.name]"
            :input="input.field"
          ></component>
        </v-col>
        <v-col
          cols="12"
          v-if="form.submit"
        >
          <v-btn
            class="app-btn"
            :loading="form.loading"
            @click.prevent="submit()"
          >{{$t('submit')}}</v-btn>
        </v-col>
        <slot name="form-submit"/>
      </v-row>
    </v-form>
      </v-card-text>
    </v-card>
   
  </v-container>

</template>

<script lang="ts">
import Form from "@/utils/form/form";
import Vue from "vue";
import { InputInterface } from "@/types";
import  bus from "@/bus";
export default Vue.extend({
  props: {
    form: Form,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    submit() {
      this.form.submitAction(this.$refs.appForm);
    },
    // this method will be code when any input in the form changed
    change(input: InputInterface) {
      this.form.valid = false;
      let form = this.form.state;
      form[input.name as keyof typeof form] = input.value;
      if (this.form.validate()) {
        this.form.valid = true;
        this.$emit("change", input.value);
      }
    },
    fileChange(val: InputInterface) {
      let form = this.form.state;
      form[val.name as keyof typeof form] = val.value;
    },
  },
  created() {
    bus.$on("resetAppForm", () => {
      const ref = this.$refs.appForm as any;
      if(typeof ref != 'undefined') {
        this.form.state = {}
        ref.reset();
      }
    });
    bus.$on("changeStateAppForm", () => {
      this.loading = true;
      this.loading = false;
    });
    
    // bus.$on("changeFormFocus", (payload : string) => {
    //   // this.$refs[payload]!.focus()
    //   console.log(this.$refs[payload].$el.focus())
    //   console.log("this.$refs[payload][0]")
    // });
     bus.$on("changeFormStateKey", (payload : any) => {
      this.loading = true;
      this.form.state[payload.key as keyof typeof this.form.state] = payload.value
      this.loading = false;
    });
    bus.$on("validateAppForm", () => {
     const ref = this.$refs.appForm as any;
      if(typeof ref != 'undefined') {
        ref.validate();
      }
    });
    bus.$on("resetValidationAppForm", () => {
     const ref = this.$refs.appForm as any;
      if(typeof ref != 'undefined') {
        ref.resetValidation();
      }
    });
    
  },
});
</script>