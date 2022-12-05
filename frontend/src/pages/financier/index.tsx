import EmployeesHomeTemplate from "@templates/employeesHomeTemplate/EmployeesHomeTemplate";

export default EmployeesHomeTemplate({
  buttons: [
    {to: '/customers',  label: 'Clientes'},
    {to: '/expenses',  label: 'Despezas'},
    {to: '/payments', label: 'Pagamentos'}
  ]
})