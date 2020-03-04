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

    constructor(private wpservice: WorkplaceService, private pservice: PersonService ){}

    ngOnInit() 
    {
        console.log("OfficeViewComponent.ngOnInit()");  
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;

        let temp = [];
        this.pservice.getPeople().subscribe(Response => {
            Response.forEach(p => {
                if(p.workplace.workplaceId == this.workplace.workplaceId)
                    temp.push(p);
            })
            localStorage.setItem("people", JSON.stringify(temp));
            console.log("Im finished subscribing");
        });
    }

    get workplace():Workplace
    {
        return JSON.parse(localStorage.getItem('workplace'));
    }

    get people():Person[]
    {
        console.log("Im retrieving subscribed data");
        return JSON.parse(localStorage.getItem('people'));
    }

    get selectedPeople(): Person[]
    {
        return JSON.parse(localStorage.getItem("selectedPeople"));
    }

    register(person:any)
    {
        this.pservice.insertPerson(person).subscribe(Response => {
            this.ngOnInit();
        })
    }

    setLoggedIn(id:number)
    {
        this.pservice.getPerson(id).subscribe(Response => {
            localStorage.setItem("loggedIn", JSON.stringify(Response));
            console.log("Login Successful. Logged as:");
            console.log(this.loggedIn);
            this.ngOnInit();
        })
    }

    logOut()
    {
        localStorage.removeItem("selectedPeople")
        localStorage.removeItem("loggedIn");
    }

    get loggedIn()
    {
        return JSON.parse(localStorage.getItem("loggedIn"));
    }
}