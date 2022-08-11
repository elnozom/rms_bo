import { VueConstructor } from "vue/types/umd"
import Input from "@/utils/form/inputs/Input"
import Form from "@/utils/form/form";

export type DefaultInputInterface = {
    name: string
    label: string
    hint?:string
    disabled?:boolean
    hidden?:boolean
    icon?: string
    initial?:any,
    cols: number
    type:string
    generateInputHtml:() => VueConstructor<Vue>
    rules?:Array<Function>,
    required?:boolean
    value:any
}
export type DateInputInterface = {
    name: string
    label : string
    disabled?:boolean
    initial?:any,
    min : string
    rules?:Array<Function>,
    max : string
    hidden?:boolean
    required?:boolean
    cols?:number
    generateInputHtml:() => VueConstructor<Vue>
    val?:any
    value : any
    limit:string
    type: string
}

export type SelectInputInterface = {
    name: string
    generateInputHtml:() => VueConstructor<Vue>
    cache?: boolean
    disabled?:boolean
    clearable?:boolean
    hidden?:boolean
    text?: string
    value?: string
    initial?:any,
    rules?:Array<Function>,
    valueKey?: string
    type:string
    initialFetch:boolean
    cols?:number
    items?: Object[]
    icon?: string
    label: string
    url?:string
    change?:Function
    required?:boolean
    payload?:Object
}

export type InputInterface = SelectInputInterface | DefaultInputInterface | DateInputInterface 

export interface FormInterface {
    title?:string,
    icon?:string,
    inputs: Input[]
    loading?: boolean
    submit?: (form: any) => Promise<any>
    callBack?: (response: any) => any
}

// header

export interface HeaderInterface {
    text:string
    key:string
    isPrice?:boolean
    isImage?:boolean
    total?:number
    generateColumnHtml:Function
}

//table




export interface Action {
    title:string
    icon:string
    method?:Function
}

export interface Totals {
    key:string
    value:number
}

export  interface DatatableIntetrface {
    title?: string
    icon?: string
    description?:string
    url:string
    searchable?:boolean
    headers: HeaderInterface[]
    filters?:Form
    actions?:Action[]
}

//edit add

export interface EditAddInterface {
    title: string
    table:string
    form:Form
    editForm?:Form
    id?:number
    callBack?: (response: any) => any
}