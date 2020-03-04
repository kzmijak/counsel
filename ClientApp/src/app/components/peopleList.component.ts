import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Person } from "../models/person.model";
import { PersonService } from "../services/person.service";

@Component({
    selector: "people-list-component",
    templateUrl: "peopleList.component.html"
})
export class PeopleListComponent{
    @Input() people?: Person[];
    @Input() loggedIn: Person;
    @Input() selectedPeople: Person[];
    public innerHeight: number;
    public innerWidth: number;
    private shadowColor?: string;

    constructor(private pservice:PersonService){}
    
    ngOnInit() 
    {
        console.log("PeopleListComponent.ngOnInit()");
        this.innerHeight = window.innerHeight - 70;
        this.innerWidth = window.innerWidth - 700;
    }
    
    async selectPerson(id:number)
    {
        if(this.loggedIn)
        {
            // If the user is logged in and selected someone else's profile, this profile will be added to the selected list
            if(this.loggedIn.personId != id && !(this.selectedPeople.map(c => c.personId).includes(id)))
            {
                console.log(this.selectedPeople.map(c => c.personId));
                this.addSelectedPerson(id);
            }
            // If the user is logged in and selected his own profile, then all the rest will be removed from selection
            if(this.loggedIn.personId == id)
            {
                this.selectedPeople
                .filter(c => c.personId!=this.loggedIn.personId)
                .forEach(c => {
                    this.removeSelectedPerson(c.personId);
                })
            }
            if(this.selectedPeople.map(c => c.personId).includes(id) && this.loggedIn.personId != id)
            {
                this.removeSelectedPerson(id);
            }
        }
        if(!this.loggedIn)
        {
            // if the user is not logged in, only one selection can be made at time
            await this.addSelectedPerson(id);
            if(this.selectedPeople != null && this.selectedPeople.length > 0)
                this.removeSelectedPerson(this.selectedPeople[0].personId);
        }
        //this.ngOnInit();
    }

    async addSelectedPerson(id:number): Promise<any>
    {
        return new Promise( resolve => {
            
        this.pservice.getPerson(id).subscribe(Response => {
            console.log("task 1")
            let temp:Person[] = JSON.parse(localStorage.getItem("selectedPeople")) ? JSON.parse(localStorage.getItem("selectedPeople")) : [];
            temp.push(Response);
            localStorage.setItem("selectedPeople", JSON.stringify(temp));
            console.log(Response);
            resolve();
        })
        })
    }

    removeSelectedPerson(id:number)
    {
        console.log("task 2")
        let temp:Person[] = JSON.parse(localStorage.getItem("selectedPeople"));
        temp = temp.filter(obj => obj.personId != id);
        localStorage.setItem("selectedPeople", JSON.stringify(temp));
    }

    selected(id:number)
    {
        let temp:string;
        if(this.selectedPeople == null)
        {
            temp = "white";
        }
        else
        {
            temp = "white";
            this.selectedPeople.forEach(p => {
                if(p.personId == id)
                {
                    temp = "violet"
                }
                if(this.loggedIn)
                {
                    if(this.loggedIn.personId == id)
                    temp = "darkviolet"
                }
            })
        }
        return "0 0 2px 2px " + temp ;
    }
}