import {  groupsHierarchyResponse} from '@/models/group';
import Api from '@/utils/axios/Api';
const Http = Api.getInstance();

export const ListHierarchy = () :Promise<groupsHierarchyResponse[]> => {
    return new Promise((resolve, reject) => {
        Http.get(`group/hierarchy?lang=${localStorage.getItem("locale")}`)
        .then((d:any) => {
            resolve(d)
        }).catch((e:any) => {
            reject(e)
        })
    })
}
