/*  ENUMS  */

export enum UserType {
    user = 0,
    customer = 2,
    employee = 4,
    attendant = 8,
    manager = 16,
    financer = 32,
    trainer = 64
}

export enum TypeExpense {
    equipamentBuy = 'equipamentBuy',
    equipamentMaintenance = 'equipamentMaintenance',
    billPayment = 'billPayment',
    employeePayment = 'employeePayment',
    others = 'others'
}

export enum FrequencyPlan {
    montly = 'montly',
    semmiannual = 'semmiannual',
    quarterly = 'quarterly',
    annual = 'annual'
}

/*  export interfaceS  */

export interface IUser {
    cpf: string
    name: string
    password: string
    email: string
    phone: string
    type: UserType
}

export interface IEmployee {
    cpf: string
    administrative: string
    ctps: string
    admissiondate: Date
    address: string
    Users: IUser
}

export interface IAdministrative {
    cpf: string
    role: 'financer' | 'attendant' | 'manager'
    Employee: IEmployee
}

export interface ITrainer {
    cpf: string
    cref: string
    Employee: IEmployee
}

export interface ICustomer {
    cpf: string
    idCurrentPlan: number
    Users: IUser
}

export interface ICreditCard {
    numbers: string
    holder: string
    expirationDate: string
    cvv: string
}

export interface ICustomerCreditCard {
    cpfCustomer: string
    numbersCreditCard: string
    Customer: ICustomer
    CreditCard: ICreditCard
}

export interface IDateDoneItem {
    idTraining: number
    cpfCustomer: number
    date: Date
    idExercise: number
}

export interface IDateTraining {
    idTraining: number
    cpfCustomer: number
    date: Date
}

export interface IEquipment {
    qrCode: string
    name: string
    maintenanceDate: Date
}

export interface IExercise {
    id: number
    name: string
}

export interface IExerciseItem {
    idExercise: number
    idTraining: number
    cpfCustomer: string
    weight: number
    series: number
    repetition: number
}

export interface IExpense {
    id: number
    qrCodeEquipmen: string
    date: Date
    totalValue: number
    description: string
    type: TypeExpense
}

export interface IInvoice {
    id: number
    cpfCustomer: string
    idPlan: number
    cardNumbers: string | null
    value: number
    status: string
    payday: string
    payMethod: string
    Plan: IPlan
}

export interface IPlan {
    id: number
    name: string
    description: string
    value: number
    frequency: FrequencyPlan
    available: boolean
}

export interface ITraining {
    id: number
    cpfCustomer: string
    cpfTrainer?: string | null
    name: string
    creationDate: Date
}

export interface ITutorial {
    idExercise: number
    video_url: string
    image: JSON
    explanation: string
}
