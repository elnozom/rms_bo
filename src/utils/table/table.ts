import { Action } from '@/utils/table/interface';
// this class is responsible for generating datatable
// we can say that this is the datatable kitchen
import { serializeQuery , currency } from '@/utils/helpers/heleprs';
import DatatableIntetrface , {Totals} from '@/utils/table/interface'
import Form from '@/utils/form/form'
import Api from '@/utils/axios/Api';
import TableHeader from './header/header';
import { HeaderInterface } from './header/headerInterface';

const Http = Api.getInstance();
export default class Datatable{ 
    title?: string
    icon?: string
    description?: string
    headers: TableHeader[]
    url:string
    hasFilters = false
    hasRequiredFilters = false
    hasFooter = false
    data:any[] = []
    loading = true
    filters?:Form
    error = false
    actions?:Action[]
    totals:Totals[] = []
    public constructor(details:DatatableIntetrface){
        this.title = details.title
        this.icon = details.icon
        this.description = details.description
        this.headers = details.headers
        this.url = details.url
        // because details is nullable so we use simple check to set this value
        if(details.actions) this.actions  = details.actions
        if(details.filters){
            this.filters = details.filters
            this.hasFilters = true
            this.hasRequiredFilters = details.filters.hasValidation
        }
        this.getData()
    }
    // get the datatable data from the server
    public getData() {
        if(typeof this.filters != 'undefined' && !this.filters?.valid){
            this._reset()
            return
        }
        return new Promise((resolve , reject) => {
            this.loading = true
            let url = this.url
            // check if this datatable has filters so we serialize the form object to send the filters with request as query string
            //{filter : "value" ,filter2 : "value2" } will be url?key=value&key2=value2
            url += url.includes('?') ? `&` : `?` 
            if(typeof this.filters !='undefined' ) url += `${serializeQuery(this.filters.state)}`
            // use the axios base class to send the request to the server with generated url
            Http.get<any[]>(url)
            .then((res:any) =>  {
                // first check if response is null to set it to empty array to avoid errors on the datatable component
                // because it expects to reserve an array
                // and reset is just setting loading and error to default values
                if(res == null){
                    this.data  = []
                    this._reset()
                    return 
                }
                
                
                // convert response to be able to work without errors from typescript
                const data =  res as unknown as any[]

                // check if datatable has footer which is flag to indicate that data needs to be mapped
                // which means also one or more of header is price or has total
                // so if its price we convert it to money 
                // an if its total that means we need to sum all the values to display it into datatable footer
                if(this.hasFooter){
                    data.map((i:any) => {
                        this.headers.forEach((header:HeaderInterface) => {
                            if(header.isPrice){
                                header.total += i[header.key as keyof typeof res]
                            }
                            if(header.isPrice){
                                i[header.key as keyof typeof data] = currency(i[header.key as keyof typeof res])
                            }
                        })
                        return i
                    })
                } 
                // else if(this.hasPrice && !this.hasFooter) {
                //     data.map((i:any) => {
                //         this.headers.forEach((header:HeaderInterface) => {
                //             if(header.isPrice){
                //                 i[header.key as keyof typeof data] = currency(i[header.key as keyof typeof res])
                //             }
                //         })
                //         return i
                //     })
                // }
                this.data  = data
                this._reset()
                resolve(res)        
            }).catch((e:any) => {
                this.loading = false
                this.error = true
                reject(e)
            })
          })
    }


    private _reset(){
        this.loading = false
        this.error = false
    }
}