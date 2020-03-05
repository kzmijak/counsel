import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from "@angular/core";
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
    @Output() register = new EventEmitter();
    @Output() setLoggedIn = new EventEmitter();
    @Output() logOut = new EventEmitter();
    @Output() editMe = new EventEmitter();
    @Output() deleteMe = new EventEmitter();
    public innerHeight: number;
    public innerWidth: number = 350;
    constructor(){}

    ngOnInit() 
    {
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
            Image:image, 
            fName:fname, 
            lName:lname, 
            role:role, 
            email:email, 
            password:password, 
            workplace:this.workplace
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

    editMe$(fname:string, lname:string, role:string, email:string, password:string, image:string)
    {
        let p = {
            personId:this.loggedIn.personId,
            Image:image, 
            fName:fname, 
            lName:lname, 
            role:role, 
            email:email, 
            password:password, 
            workplace:this.workplace
        }
        this.editMe.emit(p);
        this.imageError = false;
        this.imageUrlFix = image;
    }

    deleteMe$()
    {
        this.deleteMe.emit();
        this.logOut$();
    }

    imageHandler()
    {
        this.imageError = true;
    }
    
    private imageError:boolean = false;
    private 
    get imageUrlFix():string
    {
        if(this.imageError)
        {
            return "../../assets/images/logo.jpeg";
        }      
        if(this.loggedIn && !this.imageError)
        {
            return this.loggedIn.image
        }
        if(!this.loggedIn && this.selectedPeople)
        {
            return this.selectedPerson.image
        }
        if(!this.loggedIn && !this.selectedPeople)
        {
            return "../../assets/images/logo.jpeg";
        }
    }
}