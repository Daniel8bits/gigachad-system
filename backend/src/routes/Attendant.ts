import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
//import AttendantModel from '../models/Attendant';
import { UserType } from 'gigachad-shareds/models'

class Attendant extends Route {

    static rules: Rules = {

    };


 

}

export default new Attendant