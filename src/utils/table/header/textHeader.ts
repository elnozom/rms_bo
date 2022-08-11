import i18n  from '@/i18n';
import Vue from "vue";
import { HeaderInterface } from "./headerInterface"
import TextHeaderComponent from "@/components/table/headers/Text.vue"

export default class TextHeader implements HeaderInterface{ 
    text: string;
    key: string;
    isImage?: boolean = false;
    isPrice?: boolean = false;
    total?: number = 0;
    public constructor(text:string , key = '' ){
       this.text = i18n.t(text).toString()
       this.key = key  == '' ? text : key
    }
    public generateColumnHtml(item : any){
      return Vue.extend(TextHeaderComponent)
    }
}