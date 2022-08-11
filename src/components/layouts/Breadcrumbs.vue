<template>
<div v-if="$route.name != 'home'" class="d-flex align-center px-8 ">
  <span class="bold me-10">{{$t($route.name)}}</span>
  <v-breadcrumbs :items="breadCrumbs">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :to="item.to"
        
        :disabled="item.disabled"
        exact
      >
      <v-icon class="me-10">{{item.icon}}</v-icon>
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</div>
</template>

<script>
export default {
  computed: {
    breadCrumbs() {
      if (typeof this.$route.meta.breadCrumb === "function") {
        return this.$route.meta.breadCrumb.call(this, this.$route);
      }
      return this.$route.meta.breadCrumb;
    },
  },
};
</script>
