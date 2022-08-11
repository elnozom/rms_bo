
export const required = (val:string , msg = 'هذا الحقل مطلوب') => !!val || msg
export const num = (val:string , msg = 'لابد ان يكون هذا الحقل رقم') => {
    if (!val){
        return true
    }
  
    if(isNaN(parseFloat(val))) return msg


    return true
}
export const email = (val:string , msg = 'تحقق من البريد الالكتروني') => {
    if (!val){
        return true
    }
    if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val))) return msg


    return true
}


