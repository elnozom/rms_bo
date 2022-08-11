import { convertDate } from '@/utils/helpers/heleprs';
import Vue from "vue";
import { HeaderInterface } from "./headerInterface"

export default class DateHeader implements HeaderInterface {
  text: string;
  key: string;
  isImage?: boolean = false;
  isPrice?: boolean = false;
  total?: number = 0;
  public constructor(text:string , key = '' ){
    this.text = text
    this.key = key  == '' ? text : key
 }
 public generateColumnHtml(item : any){
  const value = item[this.key]
    return Vue.component('date-td', {
      template: `<td>${convertDate(value)}</td>`
    })
  }
}