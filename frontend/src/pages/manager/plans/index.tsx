import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/filterTableTemplate/FilterTableTemplate'
import TemplateActions from '@templates/TemplateActions'


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
    title: 'Consultar Planos',
    actions: [TemplateActions.OPEN, TemplateActions.EDIT],
    filter: {
      layout: [
        [
          {
              id: '1',
              title: 'Nome',
              type: InputType.TEXTFIELD,
              size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
          },
          {
              id: '2',
              title: 'Descrição',
              type: InputType.TEXTFIELD,
              size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
          },
          {
              id: '3',
              title: 'Valor',
              type: InputType.TEXTFIELD,
              size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
          }
        ],
        [
          {
              id: '4',
              title: 'Disponível',
              type: InputType.CHECKBOX,
              size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
          }
        ],
      ]
    },
    table: {
        columns,
        description: data => ({
            id: String(data.id),
            display: {
                name: data.name,
                description: data.description,
                value: data.value,
                frequency: stringFrequency(data.frequency),
                available: data.available ? 'Disponivel' : 'Não disponivel'
            }
        }),
        paging: true,
    }
})

function stringFrequency(frequency: string) {
    switch (frequency) {
        case 'montly':
            return 'Por mês'
            break;

        case 'semmiannual':
            return 'Semi anual'
            break;

        case 'quarterly':
            return 'Trimestral'
            break;
        
        case 'annual':
            return 'Anual'
            break;
            
        default:
            return 0
    }
}