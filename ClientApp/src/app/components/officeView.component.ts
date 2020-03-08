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

    async ngOnInit() 
    {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;

        await this.setPeople();
        await this.setChats();
        this.readyToLoad = true;
    }

    private readyToLoad:boolean = false;

    async setPeople()
    {
        return new Promise( resolve => {
            let temp = [];
            this.pservice.getPeople().subscribe(Response => {
            Response.forEach(p => {
                if(p.workplace.workplaceId == this.workplace.workplaceId)
                    temp.push(p);
                })
                localStorage.setItem("people", JSON.stringify(temp));
                localStorage.setItem("_backup_people", JSON.stringify(temp));
                resolve();
            });
        })
    }

    async setChats()
    {
        return new Promise( resolve => {
            this.cservice.getChats().subscribe(Response => {
                localStorage.setItem("chatHistory", JSON.stringify(Response));
                resolve();
            })
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
        if(chat.messages == null)
        {
            chat.messages = [];
        }
        localStorage.setItem("selectedChat", JSON.stringify(chat));
        let temp = [];
        this.mservice.getMessages().subscribe(Response => {
            Response.forEach( m => {
                if(chat.messages.length > 0 && this.selectedChat.messages.map(c => (c as Message).messageId).includes((m as Message).messageId))
                {
                    temp.push(m);
                }
            })
            localStorage.setItem("messages", JSON.stringify(temp));
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
        let val = JSON.parse(localStorage.getItem("messages"));
        if(val == undefined)
        {
            return [];
        }
        return val;
    }

    sendMessage(msg:Message)
    {
        this.mservice.insertMessage(msg).subscribe();
        this.ngOnInit();
    }

    findPeople(selection:any)
    {
        this.resetSelection();
        let newpeople: Person[] = [];
        if(!selection.fullname)
        {
            selection.fullname = '';
        }
        if(!selection.email)
        {
            selection.email = '';
        }
        if(!selection.role)
        {
            selection.role = '';
        }
        selection.fullname = selection.fullname.toLowerCase();
        selection.email = selection.email.toLowerCase();
        selection.role = selection.role.toLowerCase();

        this.people.forEach( p => {
            let fullname = (  p.fName + " " + p.lName ).toLowerCase();
            if( 
                fullname.includes(selection.fullname)
                && p.email.toLowerCase().includes(selection.email)
                && p.role.toLowerCase().includes(selection.role)
            )
            {
                newpeople.push(p);
            }
        })
        console.log(newpeople);
        localStorage.setItem("people", JSON.stringify(newpeople));
    }

    resetSelection()
    {
        localStorage.setItem("people", localStorage.getItem("_backup_people"));
    }

    selectPeople(people:Person[])
    {
        localStorage.setItem("selectedPeople", JSON.stringify(people)); 
    }
}