import Form from "@/utils/form/form";

export default interface EditAddInterface {
    title: string
    table:string
    form:Form
    editForm?:Form
    id?:number
    callBack?: (response: any) => any
}