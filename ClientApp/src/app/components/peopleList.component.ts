import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Person } from "../models/person.model";

@Component({
    selector: "people-list-component",
    templateUrl: "peopleList.component.html"
})
export class PeopleListComonent{
    @Input() people?: Person[];
    @Output() selectPerson = new EventEmitter();
    public innerHeight: number;
    public innerWidth: number;

    constructor(){}

    ngOnInit() 
    {
        console.log("PeopleListComponent.ngOnInit()");
        this.innerHeight = window.innerHeight - 70;
        this.innerWidth = window.innerWidth - 700;
    }

    selectPerson$(id:number)
    {
        this.selectPerson.emit(id);
    }
}