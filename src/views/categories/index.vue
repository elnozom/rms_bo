<template>
  <div class="py-12">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="search"
            :label="$t('search')"
            solo-inverted
            dense
            rounded
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
          <v-skeleton-loader
            v-if="loading"
            type="article"
          ></v-skeleton-loader>
          <v-alert
            border="left"
            v-else-if="groups.length == 0"
            color="red lighten-2"
            class="my-8 text-center"
            dark
          >
            {{$t('no_categories')}}
          </v-alert>
          <v-card v-else class="my-5">
            <v-card-text>
              <v-treeview
                transition
                rounded
                :search="search"
                hoverable
                item-key="name"
                :items="groups"
              >
                <template v-slot:append="{ item }">
                  <v-icon
                    v-for="(action, index) in actions"
                    class="mx-2"
                    :key="index"
                    @click.prevent="action.clickAction(item)"
                  >
                    {{ action.icon }}
                  </v-icon>
                </template>
              </v-treeview>

            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" class="no-padding">
          
          <router-view  class="no-padding"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import bus from "@/bus";
import { groupsHierarchyResponse } from "@/models/group";
import { ListHierarchy } from "@/repositories/group";
import { openDialog } from "@/utils/dialog/dialog";

const route = router.currentRoute;
export default {
  data() {
    return {
      search: "",
      loading:true,
      actions: [
        {
          icon: "mdi-square-edit-outline",
          clickAction: (item: groupsHierarchyResponse) => {
            if (
              route.name == "categories-edit" &&
              route.params.id == item.groupCode.toString()
            ) {
              return;
            }
            bus.$emit("editAddFind", item.groupCode);
            router.push({
              name: "categories-edit",
              params: { id: item.groupCode.toString() },
            });
          },
        },
        {
          icon: "mdi-trash-can-outline",
          clickAction: (item: groupsHierarchyResponse) => {
            openDialog("Warning", "mmms");
          },
        },
        {
          icon: "mdi-plus-circle-outline",
          clickAction: (item: groupsHierarchyResponse) => {
          // bus.$emit('resetAppForm')
          //  bus.$emit('changeFormFocus' , "groupName")
          let elem = document.querySelector('.v-input.groupName input')
          elem!.focus()
          
          this.goToCreate()
         
          bus.$emit('changeFormStateKey' , {key : "parentCode" , value : item.code , reset:true})
          console.log(elem)
          },
        },
      ],
      groups: [] as groupsHierarchyResponse[],
    };
  },
  methods: {
    getData() {
      this.loading = true
      ListHierarchy().then((res: groupsHierarchyResponse[]) => {
        if (res.length == 0 ){
          this.goToCreate()
        }
        this.loading = false
        this.groups = res;
      });
    },
    goToCreate(){
      if(router.currentRoute.name !== 'categories-create') router.push({name : "categories-create"});
    }
  },
  mounted() {
    this.getData();
    bus.$on("getGroupsTree", () => {
      this.getData();
    });
  },
};
</script>
