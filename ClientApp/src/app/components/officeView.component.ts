import { Component, OnInit} from "@angular/core";
import { Workplace } from "../models/workplace.model";
import { WorkplaceService } from "../services/workplace.service";
import { PersonService } from "../services/person.service";
import { Person } from "../models/person.model";
import { Chat } from "../models/chat.model";
import { ChatService } from "../services/chat.service";

@Component({
    selector: "office-view-component",
    templateUrl: "officeView.component.html"
})
export class OfficeViewComponent implements OnInit{
    public innerWidth: any;
    public innerHeight: any;

    constructor(private wpservice: WorkplaceService, private pservice: PersonService, private cservice: ChatService ){}

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
        });
        this.cservice.getChats().subscribe(Response => {
            localStorage.setItem("chatHistory", JSON.stringify(Response));
        })
    }

    get workplace():Workplace
    {
        return JSON.parse(localStorage.getItem('workplace'));
    }

    get people():Person[]
    {
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

    editMe(person:Person)
    {
        this.pservice.updatePerson(person).subscribe(Response => {
            this.setLoggedIn(person.personId);
            this.ngOnInit();
        });
    }

    deleteMe()
    {
        let id = this.loggedIn.personId;
        this.pservice.deletePerson(id).subscribe(Response => {
            this.ngOnInit();
        })
    }
    
    get chatHistory(): Chat[]
    {
        return JSON.parse(localStorage.getItem("chatHistory"));
    }

    addChat(chat:Chat)
    {
        console.log("ADDING!")
        console.log(chat)
        this.cservice.insertChat(chat).subscribe(Response => console.log(Response));
    }

    editChat(chat:Chat)
    {
        console.log("UPDATING!")
        this.cservice.updateChat(chat);
    }
}