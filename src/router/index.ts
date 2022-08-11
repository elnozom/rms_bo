import i18n from "@/i18n";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Base from "@/components/base/base.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Base,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/items/",
        name: "items",
        component: () => import("@/views/items/index.vue"),
      },
      {
        path: "/items/create",
        name: "items-create",
        component: () => import("@/views/items/editAdd.vue"),
      },
      {
        path: "/items/edit/:id",
        name: "items-edit",
        component: () => import("@/views/items/editAdd.vue"),
      },
      {
        path: "/categories",
        name: "categories-index",
        component: () => import("@/views/categories/index.vue"),
        children: [
          {
            path: "create",
            name: "categories-create",
            component: () => import("@/views/categories/editAdd.vue"),
          },
          {
            path: "edit/:id",
            name: "categories-edit",
            component: () => import("@/views/categories/editAdd.vue"),
          },
        ],
      },


      {
        path: "/halls/",
        name: "halls",
        component: () => import("@/views/halls/index.vue"),
      },
      {
        path: "/halls/create",
        name: "halls-create",
        component: () => import("@/views/halls/editAdd.vue"),
      },
      {
        path: "/halls/edit/:id",
        name: "halls-edit",
        component: () => import("@/views/halls/editAdd.vue"),
      },

      
      {
        path: "/globals/settings",
        name: "globals-settings",
        component: () => import("@/views/globals/settings.vue"),
      },
    ],
  },
  {
    path: "/server-error",
    component: () => import("@/views/errors/server.vue"),
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
