import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/filterTableTemplate/FilterTableTemplate'
//import {columns, APIType} from '@middlewares/Endpoint'
import TemplateActions from '@templates/TemplateActions'
/*
      "cpf": "741.764.650-69",
      "administrative": true,
      "ctps": "312312",
      "admissiondate": "2022-10-19T03:00:00.000Z",
      "address": "Rua Tal",
      "Users": {
        "cpf": "741.764.650-69",
        "name": "Lucas",
        "email": "...",
        "phone": "...          "
*/
interface APIType {
  cpf: string
  administrative: boolean
  ctps: string
  admissiondate: string
  address: string
  Users: {
    cpf: string
    name: string
    email: string
    phone: string
  }
}

const columns = ["Nome", "Endereço", "CPF" , "CTPS", "Data Admissão"]

export default FilterPageTemplate<APIType>({
  endpoint: '/employee',
  title: 'Consultar Funcionários',
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
          title: 'Nome do funcionário', 
          type: InputType.TEXTFIELD,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: '3',
          title: 'Endereço', 
          type: InputType.TEXTFIELD,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ],
      [
        {
          id: '4',
          title: 'CTPS', 
          type: InputType.TEXTFIELD,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: '5',
          title: 'Data de admissão', 
          type: InputType.DATEPICKER,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: '6',
          title: 'Vínculado', 
          type: InputType.CHECKBOX,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ]
    ],
    validate: data => {
        const cpfEmployee = data.textfieldValues.get('1')
        const name = data.textfieldValues.get('2')
        const address = data.textfieldValues.get('3')
        const ctps = data.textfieldValues.get('4')
        const admissiondate = data.dateValues.get('5')
        const administrative = data.checkValues.get('6')

        if(!cpfEmployee && !name && !address && !ctps && !admissiondate && !administrative) return false;
      
        return true
      },
      format: data => {
        const cpfEmployee = data.textfieldValues.get('1')
        const name = data.textfieldValues.get('2')
        const address = data.textfieldValues.get('3')
        const ctps = data.textfieldValues.get('4')
        const admissiondate = data.dateValues.get('5')
        const administrative = data.checkValues.get('6')

        return {
            cpfEmployee,
            name,
            address,
            ctps,
            admissiondate: admissiondate?.getFormattedDate().replaceAll('/', '-'),
            administrative: String(administrative)
        }
      }
  },
  table: {
    columns,
    description: data => ({
      id: data.cpf,
      display: {
        name: data.Users.name,
        address: data.address,
        cpfEmployee: data.cpf,
        ctps: data.ctps,
        admissiondate: new Date(data.admissiondate).toLocaleDateString() 
      }
    })
  }
})