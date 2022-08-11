import i18n  from '@/i18n';
import Vue from "vue";
import ImgHeaderComponent from "@/components/table/headers/Img.vue"
import { HeaderInterface } from "./headerInterface"

export default class ImgHeader implements HeaderInterface{ 
    text: string;
    key: string;
    isPrice?: boolean = false;
    isImage?: boolean = true;
    total?: number = 0;
    public constructor(text = '', key = '' ){
      text = text == '' ? 'Img' : text
      this.text = i18n.t(text).toString()
      this.key = key  == '' ? text : key
    }
    public generateColumnHtml(){
      return Vue.extend(ImgHeaderComponent)
    }
}