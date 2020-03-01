import { Person } from "./person.model";

export class Workplace
{
    constructor
    (
        public id?:number,
        public entryCode?:string,
        public confirmationCode?:string,
        public employees:Person[] = []
    ){}
}