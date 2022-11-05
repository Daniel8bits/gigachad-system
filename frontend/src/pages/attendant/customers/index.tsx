import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/FilterTableTemplate'
//import {columns, APIType} from '@middlewares/Endpoint'
import TemplateActions from '@templates/TemplateActions'

/*
GET /plan -> filterPage
GET /plan/{id} -> open modal load data
POST /plan
PUT /plan/{id}
DELETE /plan/{id}

*/
interface APIType {
  name: string,
  address: string,
  cpf: string,
  ctps: string,
  admissionDate: string
}

const columns = ["Nome", "Endereço", "CPF", "CTPS", "Data Admissão"]

export default FilterPageTemplate<APIType>({
  endpoint: '/plan',
  title: 'Essa pagina é um teste',
  actions: [TemplateActions.OPEN, TemplateActions.DELETE],
  filter: {
    layout: [
      [
        {
          id: 'cpf1',
          title: 'CPF', 
          type: InputType.TEXTFIELD,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: 'cpf1',
          title: 'CPF-Nome', 
          type: InputType.TEXTFIELD,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ],
      [
        {
          id: 'cpf1',
          title: 'CPF', 
          type: InputType.TEXTFIELD,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: 'cpf1',
          title: 'CPF-Nome', 
          type: InputType.TEXTFIELD, 
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ],
    ]
  },
  table: {
    columns,
    description: data => ({
      id: data.cpf,
      display: {
        name: data.name,
        address: data.address,
        cpf: data.cpf,
        ctps: data.ctps,
        admissionDate: data.admissionDate
      }
    }),
    paging: true,
  }
})
