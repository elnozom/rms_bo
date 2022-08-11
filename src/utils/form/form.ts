import i18n from '@/i18n';
import { FormInterface } from './interface';
import Input from './inputs/Input';
import bus  from "@/bus";


export default class Form implements FormInterface {
    inputs: Input[]
    title = ""
    icon = ""
    loading = false
    error = ""
    public state: Object = {} as any
    valid = true
    hasSubmit = true
    hasValidation = false
    submit?: (form: any) => Promise<any>
    callBack?: (form: any) => any

    constructor(fromData: FormInterface) {
        this.inputs = fromData.inputs
        if (fromData.submit) this.submit = fromData.submit
        if (fromData.title) this.title = fromData.title
        if (fromData.icon) this.icon = fromData.icon
        if (fromData.loading) this.loading = fromData.loading
        if (fromData.callBack) this.callBack = fromData.callBack
        this._initInputs()
    }

    public validate(): boolean {
        bus.$emit('validateAppForm')
        if (this.hasValidation == false) {
            return true
        }
        for (let index = 0; index < this.inputs.length; index++) {
            const input = this.inputs[index];
            const state = this.state as any
            const inputVal = state[input.field.name]
            if (input.field.required == true && (inputVal == null ||inputVal == '' || typeof inputVal == 'undefined')) {
                return false
            }

        }
        return true
    }

    public async submitAction(ref: any) {
        this.loading = true
        if ( await !this.validate()) {
            // this.error = i18n.t('required_validation_error').toString()
            this.loading = false
            return
        }
        this.submit!(this.state).then(res => {
            this._reset(ref)
            this.valid = true
            if (this.callBack) {
                this.callBack(res)
            }
        }).catch((e => {
            this._reset(null)
            this.error = e
            this.error = i18n.t((e.response.data)).toString()
            if (typeof e.response !== 'undefined' || e.response.status === 400) {
                this.valid = false
            }
        }))
    }

    // this function responsible for creating object of all inputs with key value to use it in submit or whatever
    // and if the input is select or combobox and needs to get the items from the server we get this from here too
    private _initInputs() {
        const state = {} as any
        this.inputs.forEach((input: Input) => {
            if (input.field.required) {
                this.valid = false
                this.hasValidation = true
            }
            state[input.field.name] = typeof input.field.initial == 'undefined' ? '' : input.field.initial
        })
        this.state = state
    }


    private _reset(ref: any) {
        // this._initInputs()
        this.loading = false
        if (ref) ref.reset()
    }
}