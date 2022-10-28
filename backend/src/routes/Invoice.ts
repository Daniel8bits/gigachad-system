import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User, { UserType } from '../models/User';
import InvoiceModel from '../models/Invoice';
class Invoice extends Route {

    static rules: Rules = {

    };


 

}

export default new Invoice