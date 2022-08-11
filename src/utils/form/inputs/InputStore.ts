import Vue from 'vue';
import TextInputComponent from '@/components/form/Text.vue'
import { InputInterface } from '@/utils/form/interface';
import { DefaultInputInterface } from '../interface';
import {  required } from "@/utils/validations/validations"


export const usernameInput: DefaultInputInterface = {
  name: "username",
  icon: "",
  generateInputHtml: () => Vue.extend(TextInputComponent),
  rules: [
    (value: string) => required(value),
    // (value:string) => email(value) ,
  ],
  required:true,
  label: "Email",
  cols: 12,
  
  type: 'text',
  value: ""
}
export const passwordInput: DefaultInputInterface = {
  name: "password",
  required:true,
  generateInputHtml: () => Vue.extend(TextInputComponent),
  icon: "",
  rules: [
    (value: string) => required(value),
  ],
  label: "Password",
  cols: 12,
  type: 'password',
  value: ""
}

export const convertToRequred = (input: InputInterface) => {
  const req = { ...input }
  req.required = true
  req.rules ?
    req.rules?.push((value: string) => required(value)) :
    req.rules = [(value: string) => required(value)]

  return req
}


export const convertToDisabled = (input: InputInterface , value : boolean = true) => {
  const req = { ...input }
  req.disabled = value
  if(value){
     req.rules = []
     req.required = false
  }
  return req
}