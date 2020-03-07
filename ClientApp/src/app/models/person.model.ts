import { Workplace } from "./workplace.model";
import { Chat } from "./chat.model";
import { ChatPerson } from "./chatperson.model";

export class Person
{
    constructor
    (
        public personId?:number,
        public image?:string,
        public fName?:string,
        public lName?:string,
        public role?:string,
        public email?:string,
        public password?:string,
        public workplace?:Workplace,
        public chats?:ChatPerson,
        public _Chats?:Chat[] 
    ){}
}