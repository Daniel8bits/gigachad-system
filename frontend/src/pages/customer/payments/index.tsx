import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/filterTableTemplate/FilterTableTemplate'
//import {columns, APIType} from '@middlewares/Endpoint'
import TemplateActions from '@templates/TemplateActions'

interface APIType {
  id: number
  cpfCustomer: number
  idPlan: number

  Users: {
    cpf: string
    name: string
    email: number
    phone: string
  }

  cardNumbers?: number
  value: number
  status: 'canceled' | 'paid' | 'open'
  payday: string
  payMethod: 'creditCard' | 'pix' | 'bankSlip' | 'money'
}

const columns = ["Número", "Data pagamento", "Valor", "Forma pagamento", "Status"]


const plans = [
  { value: '0', label: 'plano 1' }, //value : idPlan
  { value: '1', label: 'plano 2' },
  { value: '2', label: 'plano 3' },
  { value: '3', label: 'plano 4' }
]

export default FilterPageTemplate<APIType>({
  endpoint: '/payment',
  title: 'Histórico de pagamentos',
  actions: [TemplateActions.OPEN],
  filter: {
    layout: [
      [
        {
          id: '1',
          title: 'Valor',
          type: InputType.TEXTFIELD,
          mask: "{ddd.ddd.ddd-dd}",
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: '2',
          title: 'Data de vencimento',
          type: InputType.DATEPICKER,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ],
      [
        {
          id: '3',
          title: 'Plano',
          type: InputType.COMBOBOX,
          items: plans,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: '4',
          title: 'Status',
          type: InputType.COMBOBOX,
          items: [
            { value: 'canceled', label: 'Cancelado' },
            { value: 'paid', label: 'Pago' },
            { value: 'open', label: 'Em aberto' }
          ],
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ],
    ],
    validate: data => {
      //const cpf = data.textfieldValues.get('1')
      //   /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(value as string)
      const value = data.textfieldValues.get('1')
      const date = data.dateValues.get('2')
      const plan = data.comboValues.get('3')
      const status = data.comboValues.get('4')

      if(!value && !date && !plan && !status) return false;

      return true
    }, 
    format: data => {
      const value = data.textfieldValues.get('1')
      const date = data.dateValues.get('2')
      const plan = data.comboValues.get('3')
      const status = data.comboValues.get('4')

      const formatedStatus = status?.value
      const idPlan = plan?.value

      const cpfCustomer = ''  //tem que dar um jeito de descobrir o cpf do cara

      return {
        cpfCustomer,
        payday: date?.getFormattedDate().replaceAll('/', '-'),
        idPlan,
        value,
        status: formatedStatus
      }
    }
  },
  table: {
    columns,
    description: data => ({
      id: String(data.id),
      display: {
        id: data.id,
        payday: data.payday,
        value: data.value,
        payMethod: data.payMethod,
        status: data.status
      }
    })
  }
})
