import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/filterTableTemplate/FilterTableTemplate'
import TemplateActions from '@templates/TemplateActions'
import { IExpense } from 'gigachad-shareds/models'

export default FilterPageTemplate<IExpense>({
  endpoint: '/expense',
  title: 'Consultar Gasto',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
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
          items: [
            {value: '1', label: 'Compra de equipamento'},
            {value: '2', label: 'Manutenção de equipamento'},
            {value: '3', label: 'Pagamento de conta'},
            {value: '4', label: 'Pagamento de salário'},
            {value: '5', label: 'Outros'}
          ],
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
      const name = data.textfieldValues.get('1')
      const qrCode = data.textfieldValues.get('2')
      const typeExpense = data.comboValues.get('3')
      const date = data.dateValues.get('4')

      if(!name && !qrCode && !typeExpense && !date) return false;

      return true
    }, 
    format: data => {
      const name = data.textfieldValues.get('1')
      const qrCode = data.textfieldValues.get('2')
      const type = data.comboValues.get('3')
      const date = data.dateValues.get('4')

      
      return {
        name,
        qrCode,
        type: String(type),
        date: date?.getFormattedDate().replaceAll('/', '-'),
      }
    }
  },
  table: {
    columns: ["Descrição", "Data", "Tipo de gasto", "Valor"],
    description: data => ({
      id: String(data.id),
      display: {
        description: data.description,
        date: new Date(data.date).toLocaleDateString(),
        typeExpense: stringType(data.typeExpense),   
        totalValue: data.totalValue
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