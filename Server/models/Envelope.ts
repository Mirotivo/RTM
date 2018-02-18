import { User } from "./User";

export class Envelope {
    _id:string;
    Sender:User;
    Receiver:User;
    Message:string;
    constructor() { }
}