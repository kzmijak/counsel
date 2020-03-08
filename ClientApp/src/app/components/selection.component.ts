import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PersonService } from "../services/person.service";
import { Person } from "../models/person.model";
import { Chat } from "../models/chat.model";

@Component({
    selector:"selection-component",
    templateUrl: "selection.component.html"
})
export class SelectionComponent implements OnInit
{
    public innerWidth: any;
    public innerHeight: any;
    @Input() loggedIn: Person;
    @Input() people: Person[];
    @Input() selectedPeople: Person[];
    @Input() chatHistory: Chat[];
    @Output() findPeople = new EventEmitter;
    @Output() selectPeople = new EventEmitter

    constructor(){}

    ngOnInit() 
    {
        console.log("SelectionComponent.ngOnInit()");
        this.innerWidth = window.innerWidth - 700;
        this.innerHeight = 180;
    }

    findPeople$(sfullname:string, semail:string, srole:string)
    {
        let rtrn = { fullname: sfullname, email: semail, role: srole};
        this.findPeople.emit(rtrn);
    }

    get yourChats(): Chat[]
    {
        let rtrn = [];
        this.chatHistory.forEach( c => {
            if(c._People.map(c => c.personId).includes(this.loggedIn.personId) && c.messages.length > 0)
            {
                rtrn.push(c);
            }
        })
        return rtrn;
    }

    selectPeople$(people:Person[])
    {
        this.selectPeople.emit(people);
    }
}