import { Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { Person } from "../models/person.model";

@Component({
    selector: "user-component",
    templateUrl: "user.component.html"
})
export class UserComponent
{
    @Input() selectedperson?: Person;
    @Input() loggedIn: Person;
    @Output() onClick = new EventEmitter();
    public innerHeight: number;
    public innerWidth: number = 350;

    constructor(){}

    ngOnInit() 
    {
        console.log("UserComponent.ngOnInit()");
        this.innerHeight = window.innerHeight - 70;
    }

    get mode():string
    {
        if(this.loggedIn)
        {
            if(this.selectedperson == this.loggedIn)
            {
                return "Your profile";
            }
            if(this.selectedperson != this.loggedIn)
            {
                return "Informations about " + this.selectedperson.fname + ":";
            }
        }
        if(this.loggedIn == null)
        {
            if(this.selectedperson == null)
            {
                return "Register";
            }
            if(this.selectedperson != null)
            {
                return "Log In";
            }
        }
    }
}