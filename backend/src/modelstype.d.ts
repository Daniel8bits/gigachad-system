// TypeScript Version: 2.3
import { NextFunction } from 'express';

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

export type a = {
  nu: number
}
