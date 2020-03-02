import { Workplace } from "./workplace.model";
import { Chat } from "./chat.model";

export class Person
{
    constructor
    (
        public personId?:number,
        public image?:string,
        public fname?:string,
        public lname?:string,
        public role?:string,
        public email?:string,
        public password?:string,
        public workplace?:Workplace,
        public chats?:Chat[] 
    ){}
}