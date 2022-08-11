import { loginRequest, loginResponse } from '@/models/user';
import { Login } from '@/repositories/user';
import { FormInterface } from '@/types';
import Input from '@/utils/form/inputs/Input';
import Form from '@/utils/form/form';
import router from '@/router'

import {
    usernameInput,
    passwordInput
} from '@/utils/form/inputs/InputStore'

const inputs: Input[] = [
    new Input(usernameInput),
    new Input(passwordInput)
]

const submit = (form: any): Promise<any> => {
    const request: loginRequest = {
        username: parseInt(form.username),
        password: form.password,
    }
    return new Promise((resolve, reject) => {
        Login(request).then((res: loginResponse) => {
            localStorage.setItem("token", res.token);
            return resolve(res)
        }).catch(((e : any) => {
            return reject(e)
        }))
    })
}


const callBack = (form: any): any => {
    router.push('/')
}

const params: FormInterface = {
    title:"login",
    inputs,
    submit,
    callBack
}

const authForm = new Form(params)

export default authForm