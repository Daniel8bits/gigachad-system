import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/filterTableTemplate/FilterTableTemplate'
//import {columns, APIType} from '@middlewares/Endpoint'
import TemplateActions from '@templates/TemplateActions'

interface APIType {
  qrCode: string
  name: string
  maintenanceDate: string
}

const columns = ["Nome", "Identificação", "Data de Manutenção"]

export default FilterPageTemplate<APIType>({
  endpoint: '/equipament',
  title: 'Consultar Equipamentos',
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
            title: 'Identificação', 
            type: InputType.TEXTFIELD,
            size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
          }, 
          {
            id: '2',
            title: 'Data de Manutenção', 
            type: InputType.DATEPICKER,
            size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
          }
      ]
    ]
  },
  table: {
    columns,
    description: data => ({
      id: data.qrCode,
      display: {
        name: data.name,
        maintenanceDate: data.maintenanceDate
      }
    }),
    paging: true,
  }
})