import { Person } from "./person.model";
import { Chat } from "./chat.model";

export class Message
{
    constructor
    (
        public messageId?:number,
        public sender?:Person,
        public content?:string,
        public timestamp?:Date,
        public chat?:Chat
    ){}
}