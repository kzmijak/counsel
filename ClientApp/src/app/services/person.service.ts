import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "../models/person.model";

const personUrl = "/api/person/"

@Injectable()
export class PersonService
{
    constructor(private http:HttpClient){
        console.log("PersonService() constructor");
        this.getPeople();
    }

    getPeople()
    {
        this.http.get<any>(personUrl + "all").subscribe(response => {this.people = response});
        console.log("PersonService.getPeople()");
    }
    
    getPerson(id:number)
    {
        this.http.get(personUrl + id).subscribe(response =>{
            this.person = new Person;
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+ (response as Person).personId);
            this.person = response;
            console.log("------------------------------"+ this.person.personId);
        } )
        console.log("PersonService.getPerson(id="+ id +")");
    }


    person:Person;
    people:Person[] = [];
}