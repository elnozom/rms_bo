import router  from '@/router';
import bus from '@/bus';
import categoryForm from '@/forms/categories';
import EditAdd from '@/utils/crud/editAdd';
import { EditAddInterface } from '@/types';

const callBack = (form:any) => {
    bus.$emit("getGroupsTree")
    if(router.currentRoute.name == 'categories-edit'){
        router.push({name : 'categories-create'})
    }
}
const editAddInterface :EditAddInterface = {
    title : "groups",
    table : "groups",
    form :  categoryForm.addForm,
    editForm: categoryForm.editForm,
    callBack
}
const editAddCategory = new EditAdd(editAddInterface)
export default editAddCategory