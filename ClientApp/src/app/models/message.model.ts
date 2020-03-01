import { Person } from "./person.model";
import { Chat } from "./chat.model";

export class Message
{
    constructor
    (
        public id?:number,
        public sender?:Person,
        public content?:string,
        public timestamp?:Date,
        public chat?:Chat
    ){}
}