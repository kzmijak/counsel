import { Person } from "./person.model";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { ChatPerson } from "./chatperson.model";

export class Chat
{
    constructor
    (
        public chatId?: number,
        public title?: string,
        public messages?: Message[],
        public people?: ChatPerson[],
        public _People?: Person[]
    ){}
}