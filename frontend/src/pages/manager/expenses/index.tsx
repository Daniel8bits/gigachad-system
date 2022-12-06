import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/filterTableTemplate/FilterTableTemplate'
//import {columns, APIType} from '@middlewares/Endpoint'
import TemplateActions from '@templates/TemplateActions'

interface APIType {
  id: number
  qrCodeEquipment: string
  date: string
  totalvalue: number
  description: string
  type: 'equipamentBuy' | 'equipamentMaintenance' | 'billPayment' | 'employeePayment' | 'others'
}

const columns = ["Descrição", "Data", "Tipo de gasto", "Valor"]

const typeExpense = [
    {value: 'equipamentBuy', label: 'Compra de equipamento'},
    {value: 'equipamentMaintenance', label: 'Manutenção de equipamento'},
    {value: 'billPayment', label: 'Pagamento de conta'},
    {value: 'employeePayment', label: 'Pagamento de salário'},
    {value: 'others', label: 'Outros'}
]

export default FilterPageTemplate<APIType>({
  endpoint: '/expense',
  title: 'Consultar Gasto',
  actions: [TemplateActions.OPEN, TemplateActions.NEW, TemplateActions.EDIT],
  filter: {
    layout: [
      [
        {
          id: '1',
          title: 'Descrição', 
          type: InputType.TEXTFIELD,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
            id: '2',
            title: 'Valor', 
            type: InputType.TEXTFIELD,
            size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
          }, 
      ],
      [
        {
          id: '3',
          title: 'Tipo de gasto', 
          type: InputType.COMBOBOX,
          items: typeExpense,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
            id: '4',
            title: 'Data', 
            type: InputType.DATEPICKER,
            size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ]
    ],
    validate: data => {
      const description = data.textfieldValues.get('1')
      const totalValue = data.textfieldValues.get('2')
      const type = data.comboValues.get('3')
      const date = data.dateValues.get('4')

      if(!description && !totalValue && !type && !date) return false;

      return true
    }, 
    format: data => {
      const description = data.textfieldValues.get('1')
      const totalValue = data.textfieldValues.get('2')
      const type = data.comboValues.get('3')
      const date = data.dateValues.get('4')

      return {
        description,
        totalValue,
        type: type?.value,
        date: date?.getFormattedDate().replaceAll('/', '-')
      }
    }
  }, 
  table: {
    columns,
    description: data => ({
      id: String(data.id),
      display: {
        description: data.description,
        date: new Date(data.date).toLocaleDateString(),
        type: stringType(data.type), 
        totalValue: data.totalvalue
      }
    }),
    paging: true,
  }
})

function stringType(type: string) {
  switch(type) {
    case 'equipamentBuy':
      return 'Compra de equipamento'
      break
    case 'equipamentMaintenance':
      return 'Manutenção de equipamento'
      break
    case 'billPayment':
      return 'Pagamento de conta'
      break
    case 'employeePayment':
      return 'Pagamento de salário'
      break
    case 'others':
      return 'Outros'
      break
    default:
      return ''
  }
}