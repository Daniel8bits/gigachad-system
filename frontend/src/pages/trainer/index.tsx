import EmployeesHomeTemplate from "@templates/employeesHomeTemplate/EmployeesHomeTemplate";
import TrainerPages from "@utils/enums/TrainerPages";

export default EmployeesHomeTemplate<TrainerPages>({
  buttons: [
    {to: TrainerPages.CUSTOMERS,  label: 'Clientes'}
  ]
})