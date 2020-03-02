import { Person } from "./person.model";

export class Workplace
{
    constructor
    (
        public workplaceId?:number,
        public entryCode?:string,
        public confirmationCode?:string,
        public employees?:Person[] 
    ){}
}