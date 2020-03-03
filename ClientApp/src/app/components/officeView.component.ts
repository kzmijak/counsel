import { Component, OnInit} from "@angular/core";
import { Workplace } from "../models/workplace.model";
import { WorkplaceService } from "../services/workplace.service";
import { PersonService } from "../services/person.service";
import { Person } from "../models/person.model";

@Component({
    selector: "office-view-component",
    templateUrl: "officeView.component.html"
})
export class OfficeViewComponent implements OnInit{
    public innerWidth: any;
    public innerHeight: any;
    public workplace: Workplace;
    public loggedIn?: Person;

    constructor(private wpservice: WorkplaceService, private pservice: PersonService ){}

    ngOnInit() 
    {
        console.log("OfficeViewComponent.ngOnInit()");  
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.workplace = JSON.parse(localStorage.getItem('workplace'));
    }

    get person():Person
    {
        console.log("OfficeViewComponent.person() (get)" );
        
        if(this.pservice.person)
        {
            return this.pservice.person;
        }
    }
    get people():Person[]
    {
        let temp: Person[] = [];
        this.pservice.people.forEach(p => {
            if(p.workplace.workplaceId == this.workplace.workplaceId)
                temp.push(p);
        });
        return temp;
    }

    setSelectedPerson(id:number)
    {
        this.pservice.getPerson(id);
        console.log(this.person);
        localStorage.setItem("selectedPerson", JSON.stringify(this.pservice.person));
        console.log("wow I made it, selected:" + this.selectedPerson.personId);
    }

    get selectedPerson(): Person
    {
        console.log("Attempting to return json...");
        return JSON.parse(localStorage.getItem("selectedPerson"));
    }
}