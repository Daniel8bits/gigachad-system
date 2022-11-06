import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/filterTableTemplate/FilterTableTemplate'
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
  id: number
  name: string
  description: string
  value: number
  frequency: string
  available: boolean
}

const columns = ["Nome", "Descrição", "Valor", "Frequência", "Disponibilidade"]

export default FilterPageTemplate<APIType>({
  endpoint: '/plan',
  title: 'Essa pagina é um teste',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
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
      id: data.id,
      display: {
        name: data.name,
        description: data.description,
        value: data.value,
        frequency: data.frequency,
        available: data.available
      }
    }),
    paging: true,
  }
})
