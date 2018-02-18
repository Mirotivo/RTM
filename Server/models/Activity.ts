import { User } from "./User";

export class Activity {
    _id:string;
    Name:string;
    Description:string;
    StartDate:string;
    Members:User[];
    constructor() { }
}
