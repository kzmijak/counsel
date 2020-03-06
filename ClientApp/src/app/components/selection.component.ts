import { Component, OnInit } from "@angular/core";
import { PersonService } from "../services/person.service";
import { Person } from "../models/person.model";

@Component({
    selector:"selection-component",
    templateUrl: "selection.component.html"
})
export class SelectionComponent implements OnInit
{
    public innerWidth: any;
    public innerHeight: any;

    constructor(){}

    ngOnInit() 
    {
        console.log("SelectionComponent.ngOnInit()");
        this.innerWidth = window.innerWidth - 700;
        this.innerHeight = 180;
    }
}