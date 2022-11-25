import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/filterTableTemplate/FilterTableTemplate'
//import {columns, APIType} from '@middlewares/Endpoint'
import TemplateActions from '@templates/TemplateActions'

interface APIType {
  cpf: string
  idcurrentplan: number
  Users: {
    cpf: string
    name: string
    email: number
    phone: string
  }
  invoiceDate: string,
  status: 'canceled' | 'paid' | 'open'
}

const columns = ["Nome", "CPF", "Email", "Telefone", "Data da Fatura", "Situação"]

export default FilterPageTemplate<APIType>({
  endpoint: '/customer',
  title: 'Clientes',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  filter: {
    layout: [
      [
        {
          id: '1',
          title: 'CPF', 
          type: InputType.TEXTFIELD,
          mask: "{ddd.ddd.ddd-dd}",
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: '2',
          title: 'Nome do cliente', 
          type: InputType.TEXTFIELD,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ],
    ],
    validate: data => {
      const cpf = data.textfieldValues.get('1')
      const name = data.textfieldValues.get('2')
      
      //if(!cpf && !name) return false;

      return true
    },
    format: data => {
      const cpf = data.textfieldValues.get('1')
      const name = data.textfieldValues.get('2')

      return {
        cpf,
        name
      }
    }
  },
  table: {
    columns,
    description: data => ({
      id: data.cpf,
      display: {
        name: data.Users.name,
        cpfCustomer: data.cpf,
        email: data.Users.email,
        phone: data.Users.phone,
        invoiceDate: data.invoiceDate,
        status: data.status 
      }
    })
  }
})
