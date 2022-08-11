<template>
  <v-container>
    <edit-add :d="d"></edit-add>
  </v-container>
</template>

<script lang="ts">
import details from "@/cruds/groupTable";
import EditAddComponent from "@/components/crud/editAdd.vue";
export default {
  name: "groupTable",
  components: {
    "edit-add": EditAddComponent,
  },
  computed: {
    d() {
      return details;
    },
  },
};
</script>
