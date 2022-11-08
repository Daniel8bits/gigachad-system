import EmployeesHomeTemplate from "@templates/employeesHomeTemplate/EmployeesHomeTemplate";
import ManagerPages from "@utils/enums/ManagerPages";
import Roles from "@utils/enums/Roles";

export default EmployeesHomeTemplate<ManagerPages>({
  role: Roles.MANAGER,
  buttons: [
    {to: ManagerPages.CUSTOMERS,  label: 'Clientes'},
    {to: ManagerPages.EMPLOYEES,  label: 'Funcionários'},
    {to: ManagerPages.EQUIPMENTS, label: 'Equipamentos'},
    {to: ManagerPages.EXPENSES,   label: 'Gastos'},
    {to: ManagerPages.PLANS,      label: 'Planos'},
    {to: ManagerPages.TUTORIALS,  label: 'Tutoriais'},
  ]
})