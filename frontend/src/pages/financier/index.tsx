import EmployeesHomeTemplate from "@templates/employeesHomeTemplate/EmployeesHomeTemplate";
import FinancierPages from "@utils/enums/FinancierPages";

export default EmployeesHomeTemplate<FinancierPages>({
  buttons: [
    {to: FinancierPages.CUSTOMERS,  label: 'Clientes'},
    {to: FinancierPages.EXPENSES,  label: 'Despezas'},
    {to: FinancierPages.PAYMENTS, label: 'Pagamentos'}
  ]
})