import Vue from "vue";
import TextInputComponent from "@/components/form/Text.vue";
import FileInputComponent from "@/components/form/File.vue";
import switchInputComponent from "@/components/form/Switch.vue";
import {
  DefaultInputInterface,
} from "@/types";
import { required } from "@/utils/validations/validations";

export const logo: DefaultInputInterface = {
  name: "mainLogo",
  generateInputHtml: () => Vue.extend(FileInputComponent),
  label: "logo",
  cols: 6,
  type: "file",
  value: "",
};

export const color: DefaultInputInterface = {
  name: "mainColor",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],

  label: "mainColor",
  cols: 6,
  type: "text",
  required: true,
  value: "",
};

export const darkBg: DefaultInputInterface = {
  name: "darkBg",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],
  label: "darkBg",
  cols: 6,
  required: true,
  type: "text",
  value: "",
};

export const lightBg: DefaultInputInterface = {
  name: "lightBg",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],
  label: "lightBg",
  cols: 6,
  required: true,
  type: "text",
  value: "",
};

export const title: DefaultInputInterface = {
  name: "title",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],
  label: "title",
  cols: 6,
  required: true,
  type: "text",
  value: "",
};
export const description: DefaultInputInterface = {
  name: "description",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],
  label: "description",
  cols: 6,
  required: true,
  type: "text",
  value: "",
};

export const keywords: DefaultInputInterface = {
  name: "keywords",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [(value: string) => required(value)],
  label: "keywords",
  cols: 6,
  required: true,
  type: "text",
  value: "",
};
export const cover: DefaultInputInterface = {
  name: "cover",
  generateInputHtml: () => Vue.extend(FileInputComponent),
  label: "cover",
  cols: 6,
  type: "file",
  value: "",
};

export const showEstimatedTime: DefaultInputInterface = {
  name: "showEstimatedTime",
  generateInputHtml: () => Vue.extend(switchInputComponent),
  label: "showEstimatedTime",
  cols: 6,
  type: "switch",
  value: "",
  initial: true,
};
