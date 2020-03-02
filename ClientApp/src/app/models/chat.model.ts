import { Person } from "./person.model";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

export class Chat
{
    constructor
    (
        public chatId?: number,
        public people?: Person[],
        public messages?: Message[]
    ){}
}