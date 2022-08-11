import i18n from '@/i18n';
import Vue from "vue";
import { HeaderInterface } from "./headerInterface"
import PriceHeaderComponent from "@/components/table/headers/Price.vue"

export default class PriceHeader implements HeaderInterface {
  text: string;
  key: string;
  isImage?: boolean = false;
  isPrice?: boolean = true;
  total?: number = 0;
  public constructor(text:string , key = '' ){
    this.text = i18n.t(text).toString()
    this.key = key  == '' ? text : key
 }
 public generateColumnHtml(){
    return Vue.extend(PriceHeaderComponent)
  }
}