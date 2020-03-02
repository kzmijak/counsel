import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "../models/person.model";

const personUrl = "/api/person/"

@Injectable()
export class PersonService
{
    constructor(private http:HttpClient){
        this.getPeople();
    }

    getPeople()
    {
        this.http.get<any>(personUrl + "all").subscribe(response => {this.people = response});
    }
    
    getPerson(id:number)
    {
        this.http.get(personUrl + id).subscribe(response => {this.person = response});
    }


    person:Person;
    people:Person[] = [];
}