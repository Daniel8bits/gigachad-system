import EmployeesHomeTemplate from "@templates/employeesHomeTemplate/EmployeesHomeTemplate";
import AttendantPages from "@utils/enums/AttendantPages";

export default EmployeesHomeTemplate<AttendantPages>({
  buttons: [
    {to: AttendantPages.CUSTOMERS,  label: 'Clientes'},
    {to: AttendantPages.PAYMENTS,  label: 'Pagamentos'},
  ]
})