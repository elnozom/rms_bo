import Vue from "vue";
import TextInputComponent from "@/components/form/Text.vue";
import FileInputComponent from "@/components/form/File.vue";
import ComboInputComponent from "@/components/form/Combo.vue";
import {
  DefaultInputInterface,
  SelectInputInterface,
} from "@/types";
import { required } from "@/utils/validations/validations";

export const imgInput: DefaultInputInterface = {
  name: "imagePath",
  generateInputHtml: () => Vue.extend(FileInputComponent),
  label: "Img",
  cols: 6,
  type: "file",
  value: "",
};

export const nameInput: DefaultInputInterface = {
  name: "groupName",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],

  label: "name",
  cols: 6,
  type: "text",
  required: true,
  value: "",
};

export const nameEnInput: DefaultInputInterface = {
  name: "groupNameEn",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],
  label: "name_en",
  cols: 6,
  required: true,
  type: "text",
  value: "",
};

export const paretnGroupInput: SelectInputInterface = {
  name: "parentCode",
  cache: false,
  text: "name",
  cols: 6,
  initialFetch: true,
  generateInputHtml: () => Vue.extend(ComboInputComponent),
  clearable: true,
  valueKey: "code",
  type: "combo",
  url: "groups/list",
  label: "parent",
};

export const paretnGroupInputDisabled: SelectInputInterface = {
  name: "parentCode",
  cache: false,
  text: "name",
  cols: 6,
  initialFetch: true,
  disabled:true,
  generateInputHtml: () => Vue.extend(ComboInputComponent),
  clearable: true,
  valueKey: "code",
  type: "combo",
  url: "groups/list",
  label: "parent",
};
