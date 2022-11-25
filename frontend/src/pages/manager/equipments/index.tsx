import { InputType } from '@components/filter/Filter'
import FilterPageTemplate from '@templates/filterTableTemplate/FilterTableTemplate'
//import {columns, APIType} from '@middlewares/Endpoint'
import TemplateActions from '@templates/TemplateActions'

interface APIType {
  qrcode: string
  name: string
  maintenancedate: string
}

const columns = ["Nome", "Identificação", "Data de Manutenção"]

export default FilterPageTemplate<APIType>({
  endpoint: '/equipment',
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
            id: '3',
            title: 'Data de Manutenção', 
            type: InputType.DATEPICKER,
            size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
          }
      ]
    ],
    validate: data => {
      const name = data.textfieldValues.get('1')
      const qrCode = data.textfieldValues.get('2')
      const maintenanceDate = data.dateValues.get('3')

      if(!name && !qrCode && !maintenanceDate) return false;

      return true
    }, 
    format: data => {
      const name = data.textfieldValues.get('1')
      const qrcode = data.textfieldValues.get('2')
      const maintenancedate = data.dateValues.get('3')

      return {
        qrcode,
        name,
        maintenancedate: maintenancedate?.getFormattedDate().replaceAll('/', '-')
      }
    }

  },
  table: {
    columns,
    description: data => ({
      id: data.qrcode,
      display: {
        name: data.name,
        qrcode: data.qrcode,
        maintenancedate: new Date(data.maintenancedate).toLocaleDateString() 
      }
    }),
    paging: true, 
  }
})