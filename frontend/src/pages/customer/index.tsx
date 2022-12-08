import EmployeesHomeTemplate from "@templates/employeesHomeTemplate/EmployeesHomeTemplate";
import CustomerPages from "@utils/enums/CustomerPages";

export default EmployeesHomeTemplate<CustomerPages>({
  buttons: [
    {to: CustomerPages.CALENDAR,          label: 'Calendário'},
    {to: CustomerPages.TRAININGS,         label: 'Treinamentos'},
    {to: CustomerPages.PLANS,             label: 'Planos'},
    {to: CustomerPages.PAYMENTS,          label: 'Pagamentos'},
    {to: CustomerPages.CREDIT_CARDS,      label: 'Cartões'},
    {to: CustomerPages.TUTORIALS,         label: 'Tutoriais'},
  ]
})