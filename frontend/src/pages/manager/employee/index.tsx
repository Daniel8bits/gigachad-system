import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/filterTableTemplate/FilterTableTemplate'
import TemplateActions from '@templates/TemplateActions'
import { IEmployee } from 'gigachad-shareds/models'

export default FilterPageTemplate<IEmployee>({
  endpoint: '/employee',
  title: 'Consultar Funcionários',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT, TemplateActions.NEW],
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
        /*
        {
          id: '5',
          title: 'Data de admissão',
          type: InputType.DATEPICKER,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }*/
      ]
    ],
    validate: data => {
      const cpfEmployee = data.textfieldValues.get('1')
      const name = data.textfieldValues.get('2')
      const address = data.textfieldValues.get('3')
      const ctps = data.textfieldValues.get('4')
      const admissionDate = data.dateValues.get('5')
      //const administrative = data.checkValues.get('6')

      //if (!cpfEmployee && !name && !address && !ctps && !admissionDate) return false;

      return true
    },
    format: data => {
      const cpfEmployee = data.textfieldValues.get('1')
      const name = data.textfieldValues.get('2')
      const address = data.textfieldValues.get('3')
      const ctps = data.textfieldValues.get('4')
      const admissionDate = data.dateValues.get('5')
      //const administrative = data.checkValues.get('6')

      //console.log(admissionDate?.toString())
      return {
        cpfEmployee,
        name,
        address,
        ctps,
        admissionDate: admissionDate?.getFormattedDate().replaceAll('/', '-'),
        //administrative: String(administrative)
      }
    }
  },
  table: {
    columns: ["Nome", "Endereço", "CPF", "CTPS", "Data Admissão"],
    description: data => ({
      id: data.cpf,
      display: {
        name: data.Users.name,
        address: data.address,
        cpfEmployee: data.cpf,
        ctps: data.ctps,
        admissiondate: new Date(data.admissiondate).toLocaleString("pt-BR", { day: 'numeric', month: 'numeric', year: 'numeric' })
      } 
    })
  }
})