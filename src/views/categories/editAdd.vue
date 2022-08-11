<template>
  <edit-add :d="d" />
</template>
<script>
import details from "@/cruds/categories";
import EditAddComponent from "@/components/crud/editAdd.vue";
export default {
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
