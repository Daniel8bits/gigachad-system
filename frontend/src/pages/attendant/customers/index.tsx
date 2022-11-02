import FilterPageTable from '@templates/FilterTablePage'

export const CustomersAction = {

}

export default () => alert('Not implemented yet!')
/*
export default FilterPageTable({
  filter: {
    layout: [
      [
        {
          title: 'CPF', 
          value: api => api.cpf,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          title: 'CPF-Nome', 
          type: InputType.TEXTFIELD, 
          value: api => api.cpf + api.name,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ],
      [
        {
          title: 'CPF', 
          value: api => api.cpf,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        },
        {
          title: 'CPF-Nome', 
          type: InputType.TEXTFIELD, 
          value: api => api.cpf + api.name,
          size: { sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 }
        }
      ],
    ]
  },
  table: {
    content: [
      ["CPF", api => api.cpf],
      ["Nome", api => api.name],
      ["Email", api => api.email]
    ],
    paging: true,
  }
})*/