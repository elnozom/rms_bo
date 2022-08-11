<template>
  <v-container class="mt-12">
    <div class="container-tiny">
      <v-row justify="center">
        <v-col class="scale-hover pointer" v-for="(c , index) in Object.keys(counts)" :key="index" cols="12" md="3" sm="6">
          <!-- {{counts[c]}} -->
          <count :count="counts[c]" :title="$t(c)" :icon="meta[c].icon" :color="meta[c].color" />
        </v-col>
        <!-- <v-col cols="12">
          <drop :files="[]"/>
        </v-col> -->
      </v-row>
    </div>
  </v-container>
</template>
<script>
import { Counts } from "@/repositories/global";
import count from '@/components/partials/count.vue'
// import Drop from '@/components/drop.vue'
export default {
  components:{
    count
  },
  data() {
    return {
      error: null,
      loading: false,
      meta : {
        Visitors :{
          icon : "mdi-bank-check",
          color : "#9951b0",
        },
        Projects : {
          icon : "mdi-bank-check",
          color : "#268bd2",
        },
        Events : {
          icon : "mdi-calendar-multiselect",
          color : "#28968c",
        },
        Users : {
          icon : "mdi-account-group-outline",
          color : "#a03f3e",
        },
        PendingUsers : {
          icon : "mdi-account-alert-outline",
          color : "#ffb97f",
        },
        Ryadeen : {
          icon : "mdi-crown-outline",
          color : "#fcbf49",
        },
        Tamooheen : {
          icon : "mdi-account-tie-hat",
          color : "#d62828",
        },
        Mobadreen : {
          icon : "mdi-account-star-outline",
          color : "#003049",
        },
     },
      counts : {},
    };
  },
  methods: {
    async getCounts() {
      this.loading = true;
        Counts()
          .then((d) => {
            this.error = null;
            this.loading = false;
           this.counts = d
          })
          .catch((e) => {
            this.loading = false;
            this.error = "بيانات غير صحيحة";
          });
      
    },
  },
  created() {
    this.getCounts()
  },
};
</script>