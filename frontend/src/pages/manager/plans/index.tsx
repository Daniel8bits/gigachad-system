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

const typeFrequency = [
    { value: 'montly', label: 'Mensal' },
    { value: 'semmiannual', label: 'Semi anual' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'annual', label: 'Anual' },
]

export default FilterPageTemplate<APIType>({
    endpoint: '/plan',
    title: 'Consultar Planos',
    actions: [TemplateActions.OPEN, TemplateActions.EDIT, TemplateActions.NEW],
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
                    title: 'Disponível',
                    type: InputType.CHECKBOX,
                    size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
                }

            ],
            [
                {
                    id: '4',
                    title: 'Valor',
                    type: InputType.TEXTFIELD,
                    size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
                },
                {
                    id: '5',
                    title: 'Frequencia',
                    type: InputType.COMBOBOX,
                    items: typeFrequency,
                    size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
                }
            ],
        ],
        validate: data => {
            const name = data.textfieldValues.get('1')
            const description = data.textfieldValues.get('2')
            const available = data.checkValues.get('3')
            const value = data.textfieldValues.get('4')

            //if(!name && !description && !value && !available) return false;

            return true
        },
        format: data => {
            const name = data.textfieldValues.get('1')
            const description = data.textfieldValues.get('2')
            const available = data.checkValues.get('3')
            const value = data.textfieldValues.get('4')
            const frequency = data.comboValues.get('5')

            return {
                name,
                description,
                value,
                available: String(available),
                frequency: frequency?.value
            }
        }
    },
    table: {
        columns,
        description: data => ({
            id: String(data.id),
            display: {
                name: data.name,
                description: data.description,
                value: data.value,
                frequency: typeFrequency.find(e => e.value === data.frequency)?.label,
                available: data.available ? 'Disponivel' : 'Não disponivel'
            }
        }),
        paging: true,
    }
})