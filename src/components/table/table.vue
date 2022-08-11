
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="table.headers"
            :items="table.data"
            :loading="table.loading"
            dense
            :page.sync="page"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"
            :search="table.search"
            class="elevation-4"
            fixed-header
            height="400px"
          >
            <template v-slot:top>
              <div class="datatable-header w-full">
                <div class="w-full flex-space bgdarker pa-4">
                  <span
                    ><v-icon>{{ table.icon }}</v-icon>
                    {{ table.title }}
                  </span>
                  <div class="btns">
                    <v-menu bottom v-if="table.actions" offset-y transition="scale-transition">
                      <template  v-slot:activator="{ on, attrs }">
                        <v-btn class="gr-bg" dark v-bind="attrs" prepen v-on="on">
                          <v-icon class="mr-3 ml-3"
                            >mdi-dots-horizontal-circle-outline</v-icon
                          >
                          {{ $t("actions") }}
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(action,index) in table.actions"
                          :key="index"

                          @click.prevent="action.action"
                        >
                          <v-list-item-title
                            ><v-icon class="mr-3 ml-3">{{action.icon}}</v-icon
                            >{{ $t(action.title) }}</v-list-item-title
                          >
                        </v-list-item>
                        <slot name="actions"></slot>
                      </v-list>
                    </v-menu>
                    <slot name="btns"/>
                  </div>
                </div>
                <div class="pa-4" v-if="table.hasFilters">
                  <v-expansion-panels class="gr-bg" v-model="filtersPanel">
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <template v-slot:default>
                          <span key="0">
                            <v-icon>mdi-magnify</v-icon>
                            {{ $t("select_data") }}
                          </span>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <app-form :form="table.filters" />
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
                <div
                  class="w-full mb-4 pa-4 flex-space"
                  v-if="table.data.length > 0"
                >
                  <span
                    >{{ $tc("table_page", from) }} {{ to }}
                    {{ $tc("table_count", table.data.length) }}</span
                  >
                  <v-pagination
                    v-model="page"
                    :length="pageCount"
                  ></v-pagination>
                </div>
              </div>
            </template>
            <template v-slot:body v-if="table.error">
              <tr class="text-center py-4">
                <td :colspan="table.headers.length">
                  {{ $t("error_getting_data") }}
                </td>
              </tr>
            </template>
            <template
              v-slot:no-data
              v-if="table.hasRequiredFilters"
            >
              {{ $t("select_data") }}
            </template>
            <template
              slot="body.append"
              v-if="table.hasFooter && table.data.length > 0"
            >
              <tr class="text-center md-hidden black--text bg-gredient">
                <th
                  class="text-center text-color"
                  v-for="(header, index) in table.headers"
                  :key="index"
                >
                  <span v-if="index == 0 && !header.total">
                    {{ $t("totals") }}
                  </span>
                  <span v-else-if="!header.isTotal"></span>
                  <span v-else>
                    {{ currency(header.total) }}
                  </span>
                </th>
              </tr>
            </template>
            <template v-slot:[`item`]="{ item }">
              <tr>
                <component
                v-for="(head , index) in table.headers"
                :key="index"
                :is="head.generateColumnHtml()"
                :actions="head.actions"
                :item="item"
                :item-key="head.key"
              ></component>
              </tr>
            </template>
              <!-- <slot name="item-actions"/> -->
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title class="text-h5 primary">
          {{ $t("totals") }}
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    {{ $t("key") }}
                  </th>
                  <th class="text-left">
                    {{ $t("total") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(header, index) in totalsHeaders" :key="index">
                  <td>{{ header.text }}</td>
                  <td>{{ currency(header.total) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Table from "@/utils/table/table";
import bus from "@/bus";
import {
  addParamsToLocation,
  getParamsFromLocation,
  currency
} from "@/utils/helpers/heleprs";
import AppForm from "@/components/form/Form.vue";
import Vue from "vue";
import { HeaderInterface } from "@/utils/table/header/headerInterface";
export default Vue.extend({
  props: {
    table: Table,
  },
  data() {
    return {
      approvedServiceId: 0,
      msgModal: false,
      page: 1,
      itemsPerPage: 10,
      pageCount: 0,

      dialog: false,
      resp: {},
      msg: "",
    };
  },
  components: {
    AppForm,
  },
  computed: {
    totalsHeaders() {
      return this.table.headers.filter((header: HeaderInterface) => {
        return header.isPrice ? header : "";
      });
    },
    filtersPanel() {
      if(!this.table.hasRequiredFilters){
        return null
      }
      return 0
    },
    
    from() {
      return (this.$data.page - 1) * this.$data.itemsPerPage + 1;
    },
    to() {
      const from = (this.$data.page - 1) * this.$data.itemsPerPage;
      const to = from + this.$data.itemsPerPage;
      return to > this.table.data.length ? this.table.data.length : to;
    },
  },
  watch: {
    "table.filters.state": {
      handler(newValue) {
        addParamsToLocation(newValue, this.$route.path);
        this.filter();
      },
      deep: true,
    },
  },
  methods: {
    advancedSearch(event: any, key: string) {
      console.log("search")
    },
    currency: (x: number) => currency(x),
    filter() {
      // reset headers totals to avoid sum bug
      // if we dont do this the class will add the totals to thee preevios data totals
      this.table.headers.forEach((header: HeaderInterface) => {
        header.total = 0;
      });
      this.table.getData();
    },
    showTotals() {
      this.dialog = true;
    },
  },
  created() {
    if (this.table.hasFilters && this.table.filters) {
      getParamsFromLocation(this.$route.query, this.table.filters);
    }
    bus.$on("getTableData", () => {
      this.table.getData();
    });
  },
});
</script>