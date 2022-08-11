// import { HeaderInterface } from '@/types.d';
import {
  Action ,
  DatatableIntetrface ,
  HeaderInterface,
 } from '@/types'
import TextHeader from '@/utils/table/header/textHeader';
import ActionsHeader from '@/utils/table/header/actions/actionsHeader';
import Datatable  from '@/utils/table/table'
import filters from './filters'
import {create} from '../actions'
const headers:HeaderInterface[] = [
  new TextHeader('groupCode'),
  new TextHeader('name'),
  new TextHeader('groupNameEn'),
  new ActionsHeader('groups'  , {edit : true , view : false , delete : true})
]
const url = "group/hierarchy"
const actions : Action[] = [create]
const params:DatatableIntetrface = {
    title : "cities",
    headers ,
    description:"articles_desc",
    url,
    filters,
    actions
}


const datatable = new Datatable(params)
export default datatable