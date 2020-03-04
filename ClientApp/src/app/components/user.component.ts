import { Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { Person } from "../models/person.model";
import { Workplace } from "../models/workplace.model";

@Component({
    selector: "user-component",
    templateUrl: "user.component.html"
})
export class UserComponent
{
    @Input() selectedPeople?: Person[];
    @Input() loggedIn: Person;
    @Input() workplace: Workplace;
    @Output() setLoggedIn = new EventEmitter();
    @Output() logOut = new EventEmitter();
    @Output() register = new EventEmitter();
    public innerHeight: number;
    public innerWidth: number = 350;

    constructor(){}

    ngOnInit() 
    {
        console.log("UserComponent.ngOnInit()");
        this.innerHeight = window.innerHeight - 70;
    }

    reset()
    {
        this.selectedPeople = null;
        localStorage.removeItem("selectedPeople");
    }

    register$(fname:string, lname:string, role:string, email:string, password:string, image:string)
    {
        let p = {
            Image:image, fName:fname, lName:lname, role:role, email:email, password:password, workplace:this.workplace
        }
        this.register.emit(p);
    }

    logIn(email:string, password:string)
    {
        if(this.selectedPerson.email == email && this.selectedPerson.password == password)
        {
            this.setLoggedIn.emit(this.selectedPerson.personId);
        }
    }

    logOut$()
    {
        this.logOut.emit();
    }

    get selectedPerson(){
        if(this.selectedPeople)
        {
            return this.selectedPeople[this.selectedPeople.length - 1];
        }
        return null;
    }
}