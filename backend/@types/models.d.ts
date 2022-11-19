
export = GigachadSystem

export as namespace GigachadSystem

declare namespace GigachadSystem {

  /*  ENUMS  */
  
  enum UserType {
    user = 0,
    customer = 2,
    employee = 4,
    attendant = 8,
    manager = 16,
    financer = 32,
    trainer = 64
  }
  
  enum TypeExpense {
    equipamentBuy = 'equipamentBuy',
    equipamentMaintenance = 'equipamentMaintenance',
    billPayment = 'billPayment',
    employeePayment = 'employeePayment',
    others = 'others'
  }
  
  enum FrequencyPlan {
    montly = 'montly',
    semmiannual = 'semmiannual',
    quarterly = 'quarterly',
    annual = 'annual'
  }
  
  
  /*  INTERFACES  */
  
  interface IUser {
    cpf: string
    name: string
    password: string
    email: string
    phone: string
  }
  
  interface IEmployee {
    cpf: string
    administrative: string
    ctps: string
    admissionDate: Date
    address: string
    Users: IUser
  }
  
  interface IAdministrative {
    cpf: string
    role: 'financer' | 'attendant' | 'manager'
    Employee: IEmployee
  }
  
  interface ITrainer {
    cpf: string
    cref: string
    Employee: IEmployee
  }
  
  interface ICustomer {
    cpf: string
    idCurrentPlan: number
    Users: IUser
  }
  
  interface ICreditCard {
    numbers: string
    holder: string
    expirationDate: string
    cvv: string
  }
  
  interface ICustomerCreditCard {
    cpfCustomer: string
    numbersCreditCard: string
    Customer: ICustomer
    CreditCard: ICreditCard
  }
  
  interface IDateDoneItem {
    idTraining: number
    cpfCustomer: number
    date: Date
    idExercise: number
  }
  
  interface IDateTraining {
    idTraining: number
    cpfCustomer: number
    date: Date
  }
  
  interface IEquipment {
    qrCode: string
    name: string
    maintenanceDate: Date
  }
  
  interface IExercise {
    id: number
    name: string
  }
  
  interface IExerciseItem {
    idExercise: number
    idTraining: number
    cpfCustomer: string
    weight: number
    series: number
    repetition: number
  }
  
  interface IExpense {
    id: number
    qrCodeEquipmen: string
    date: Date
    totalValue: number
    description: string
    typeExpense: TypeExpense
  }
  
  interface IInvoice {
    id: number
    cpfCustomer: string
    idPlan: number
    cardNumbers: string | null
    value: number
    status: string
    payday: string
    payMethod: string
  }
  
  interface IPlan {
    id: number
    name: string
    description: string
    value: number
    frequency: FrequencyPlan
    available: boolean
  }
  
  interface ITraining {
    id: number
    cpfCustomer: string
    cpfTrainer?: string | null
    name: string
    creationDate: Date
  }
  
  interface ITutorial {
    idExercise: number
    video_url: string
    image: JSON
    explanation: string
  }

}
