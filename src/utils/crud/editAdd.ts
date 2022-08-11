import {EditAddInterface} from '@/types'
import Form from '../form/form'
import Api from '../axios/Api';
import bus from '@/bus'
// import {openSnack} from '@/utils/snack/snack'

const Http = Api.getInstance();
export default class EditAdd {
    title: string
    table: string
    form: Form
    editForm: Form
    id?: number
    loading: boolean = false
    error: boolean = false
    isEdit: boolean = false
    callBack?: (form: any) => any
    public constructor(details: EditAddInterface) {
        this.title = details.title
        this.table = details.table
        this.form = details.form
        this.id = details.id
        if (this.isEdit) this.find()
        if (details.callBack) this.callBack = details.callBack
        this.editForm = (typeof details.editForm != 'undefined') ? details.editForm : details.form

    }
    // find the record from the api
    public find() {
        return new Promise((resolve, reject) => {
            this.editForm.loading = true
            this.loading = true
            let url = `${this.table}/${this.id}`
            // use the axios base class to send the request to the server with generated url
            Http.get<any>(url)
                .then((res) => {
                    this.editForm.state = res
                    this.editForm.loading = false
                    this._reset()
                    bus.$emit('changeStateAppForm' , res)
                    resolve(res)
                }).catch(e => {
                    this.loading = false
                    this.error = true
                    reject(e)
                })
        })
    }
    public async setId(id: number) {
        if(this.id == id) {
            return
        }
        this.id = id
        this.isEdit = true
        await this.find()
    }

    public submit(): Promise<any> {
        let url = `${this.table}/editadd`
        type Method = 'post' | 'put';
        let method: Method = 'post'
        if (this.isEdit) {
            url += `/${this.id}`
            method = 'put'
        }
        const state = this.isEdit ? this.editForm.state : this.form.state
        return new Promise((resolve, reject) => {
            Http[method](url, state).then(res => {
                bus.$emit('resetAppForm')
                const msg = this.isEdit ? "item_updated_succesfully" : "item_added_succesfully"
                // openSnack("success" , i18n.t(msg).toString())
                this._reset()
                this.resetEdit()
                return resolve(res)
            }).catch(e => {
                return reject(e)
            })
        })
    }
    private _reset() {
        this.loading = false
        this.error = false
    }
    private resetEdit(){
        this.isEdit = false
        this.id = undefined
    }
}