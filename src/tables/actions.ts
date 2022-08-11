import { Action } from '@/utils/table/interface';
import router from '@/router'
export const create : Action = {
    title:"create",
    icon:"mdi-plus",
    method: () => {
        router.push({name:`${router.currentRoute.name}-create`})
    }
}