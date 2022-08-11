<template>
  <v-container>
    <edit-add :d="d"></edit-add>
  </v-container>
</template>
<script>
import EditAdd from "@/utils/crud/editAdd";
import details from "@/cruds/items";
import EditAddComponent from "@/components/crud/editAdd.vue";
export default {
  components: {
    "edit-add": EditAddComponent,
  },
  computed: {
    d() {
      const d = new EditAdd(details);
      return d;
    },
  },
};
</script>
