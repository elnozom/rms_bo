import ViewInterface from './viewInterface'
import Api from '../axios/Api';
const Http = Api.getInstance();
export default class View {
    title: string
    table: string
    id: number
    viewable?: string[]
    data?:Object
    loading: boolean = false
    error: boolean = false
    public constructor(details: ViewInterface) {
        this.title = details.title
        this.table = details.table
        this.id = details.id
        if (details.viewable) this.viewable = details.viewable
    }
    // find the record from the api
    public find() {
        return new Promise((resolve, reject) => {
            this.loading = true
            let url = `${this.table}/${this.id}`
            // use the axios base class to send the request to the server with generated url
            Http.get<any>(url)
                .then((res:Object) => {
                    // set the form state with the response to fillthe inputs
                    this.data = res
                    if (typeof this.viewable == 'undefined') this.viewable = Object.keys(res)
                    this._reset()
                    resolve(res)
                }).catch(e => {
                    this.loading = false
                    this.error = true
                    reject(e)
                })
        })
    }
    private _reset() {
        this.loading = false
        this.error = false
    }
}