import { User } from "./User";
export declare class Envelope {
    _id: string;
    Sender: User;
    Receiver: User;
    Message: string;
    constructor();
}
