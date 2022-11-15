import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/filterTableTemplate/FilterTableTemplate'
//import {columns, APIType} from '@middlewares/Endpoint'
import TemplateActions from '@templates/TemplateActions'
import { IInvoice } from 'gigachad-shareds/models'

export default FilterPageTemplate<IInvoice>({
  endpoint: '/invoice',
  title: 'Consultar pagamentos',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  filter: {
    layout: [
      [
        {
          id: '1',
          title: 'Nome do cliente',
          type: InputType.TEXTFIELD,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: '2',
          title: 'CPF do cliente',
          type: InputType.TEXTFIELD,
          mask: "{ddd.ddd.ddd-dd}",
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: '3',
          title: 'Data de pagamento',
          type: InputType.DATEPICKER,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ],
      [
        {
          id: '4',
          title: 'Tipo de plano',
          type: InputType.COMBOBOX,
          items: [
            { value: '0', label: 'plano 1' },
            { value: '1', label: 'plano 2' },
            { value: '2', label: 'plano 3' },
            { value: '3', label: 'plano 4' }
          ],
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: '5',
          title: 'Forma de pagamento',
          type: InputType.COMBOBOX,
          items: [
            { value: 'creditCard', label: 'Cartão de crédito' },
            { value: 'pix', label: 'Pix' },
            { value: 'bankSlip', label: 'Boleto' },
            { value: 'money', label: 'Dinheiro' }
          ],
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          id: '6',
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
      const name = data.textfieldValues.get('1')
      const cpf = data.textfieldValues.get('2')
      const date = data.dateValues.get('3')
      const plan = data.comboValues.get('4')
      const payMethod = data.comboValues.get('5')
      const status = data.comboValues.get('6')

      if(!cpf && !name && !date && !plan && !payMethod && !status) return false;

      return true
    }, 
    format: data => {
      const name = data.textfieldValues.get('1')
      const cpf = data.textfieldValues.get('2')
      const payday = data.dateValues.get('3')
      const plan = data.comboValues.get('4')
      const payMethod = data.comboValues.get('5')
      const status = data.comboValues.get('6')

      
      const formatedPayMethod = payMethod?.value
      const formatedStatus = status?.value
      const idPlan = plan?.value

      return {
        name,
        cpfCustomer: cpf,
        payday: payday?.getFormattedDate().replaceAll('/', '-'),
        idPlan,
        payMethod: formatedPayMethod,
        status: formatedStatus
      }
    }
  },
  table: {
    columns: ["Número", "Data pagamento", "Valor", "Forma pagamento", "Status"],
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
