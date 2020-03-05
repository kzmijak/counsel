import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "../models/person.model";
import { Observable } from "rxjs";

const personUrl = "/api/person/";
const personUrlShort = "/api/person"

@Injectable()
export class PersonService
{
    constructor(private http:HttpClient){
    }

    getPeople(): Observable<Person[]>
    {
        return this.http.get<any>(personUrl);
    }
    
    getPerson(id:number): Observable<Person>
    {
        return this.http.get(personUrl + id);
    }

    insertPerson(person:any): Observable<any>
    {
        return this.http.post(personUrlShort, person)
    }

    updatePerson(person:any): Observable<any>
    {
        return this.http.put(personUrl + person.personId, person);
    }

    deletePerson(id:number): Observable<any>
    {
        return this.http.delete(personUrl + id);
    }
}