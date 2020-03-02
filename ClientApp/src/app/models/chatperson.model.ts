import { Chat } from "./chat.model";
import { Person } from "./person.model";

export class ChatPerson
{
    constructor
    (
        public chatId?:number,
        public chat?: Chat,
        public personId?:number,
        public person?:Person
    ){}
}