import Vue from "vue";
import TextInputComponent from "@/components/form/Text.vue";
import FileInputComponent from "@/components/form/File.vue";
import ComboInputComponent from "@/components/form/Combo.vue";
import { required, num } from "@/utils/validations/validations";
import {
  DefaultInputInterface,
  SelectInputInterface,
} from "@/types";

export const name: DefaultInputInterface = {
  name: "name",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],
  label: "name",
  cols: 6,
  type: "text",
  value: "",
};
export const nameEn: DefaultInputInterface = {
  name: "nameEn",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  label: "nameEn",
  rules: [(value: string) => required(value)],
  cols: 6,
  type: "text",
  value: "",
};
export const groupCode: SelectInputInterface = {
  name: "groupCode",
  cache: false,
  text: "name",
  cols: 6,
  initialFetch: true,
  generateInputHtml: () => Vue.extend(ComboInputComponent),
  clearable: true,
  valueKey: "id",
  type: "combo",
  url: "groups/list",
  label: "groupCode",
};
export const barCode: DefaultInputInterface = {
  name: "barCode",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  label: "barcode",
  cols: 6,
  type: "text",
  value: "",
};
export const price: DefaultInputInterface = {
  name: "price",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  label: "price",
  rules: [(value: string) => required(value)],
  cols: 6,
  type: "text",
  value: "",
};
export const estimatedTime: DefaultInputInterface = {
  name: "estimatedTime",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  label: "estimatedtime",
  rules: [(value: string) => required(value), (value: string) => num(value)],
  cols: 6,
  type: "number",
  value: "",
};
