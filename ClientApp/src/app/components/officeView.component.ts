import { Component, OnInit} from "@angular/core";
import { Workplace } from "../models/workplace.model";
import { WorkplaceService } from "../services/workplace.service";
import { PersonService } from "../services/person.service";
import { Person } from "../models/person.model";
import { Chat } from "../models/chat.model";
import { Message } from "../models/message.model";
import { ChatService } from "../services/chat.service";
import { MessageService } from "../services/message.service";

@Component({
    selector: "office-view-component",
    templateUrl: "officeView.component.html"
})
export class OfficeViewComponent implements OnInit{
    public innerWidth: any;
    public innerHeight: any;

    constructor(private wpservice: WorkplaceService, private pservice: PersonService, private cservice: ChatService, private mservice: MessageService ){}

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
        localStorage.removeItem("selectedChat")
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


    async addChat(chat:Chat)
    {
        await this.addChatPromise(chat);
        this.selectedPeople.forEach( person => {
          this.cservice.insertChatPerson(this.selectedChat, person).subscribe();
          console.log(this.selectedChat.chatId);
        })
    }

    async addChatPromise(chat:Chat): Promise<any>
    {
        return new Promise( resolve => {
            this.cservice.insertChat(chat).subscribe( Response => {
                localStorage.setItem("selectedChat", JSON.stringify(Response));
                resolve();
            });
        })
    }

    get selectedChat(): Chat
    {
        return JSON.parse(localStorage.getItem("selectedChat"));
    }

    selectChat(chat:Chat)
    {
        localStorage.setItem("selectedChat", JSON.stringify(chat));
        console.log("MESSAGES");
        let temp = [];
        this.mservice.getMessages().subscribe(Response => {
            Response.forEach( m => {
                if(this.selectedChat.messages.map(c => (c as Message).messageId).includes((m as Message).messageId))
                {
                    console.log(m);
                    temp.push(m);
                }
                localStorage.setItem("messages", JSON.stringify(temp));
                console.log(temp);
            })
        })
    }

    editChat(chat:Chat)
    {
        this.cservice.updateChat(chat).subscribe(Response => {
            this.ngOnInit();
        });
    }

    exitChat(chat:Chat)
    {
        localStorage.removeItem("selectedChat");
    }

    get messages(): Message[]
    {
        return JSON.parse(localStorage.getItem("messages"));
    }
}