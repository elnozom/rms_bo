<template>
  <v-dialog class="background" v-model="dialog.Active" max-width="390">
    <v-card>
      <v-card-title class="text-h3 red flex-center white--text">
        {{ $t(dialog.Title) }}
      </v-card-title>
      <v-card-text class="text-h6">
        {{ $t(dialog.Msg) }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialog.Active = false">
          Disagree
        </v-btn>
        <v-btn color="green darken-1" text @click="dialog = false">
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  computed: {
    ...mapGetters({
      dialog: "ui/dialog",
    }),
  },
});
</script>
