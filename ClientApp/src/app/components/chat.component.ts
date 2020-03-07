import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Person } from "../models/person.model";
import { Chat } from "../models/chat.model";
import { Message } from "../models/message.model";

@Component({
    selector: "chat-component",
    templateUrl: "chat.component.html"
})
export class ChatComponent implements OnInit
{
    @Input() loggedIn: Person;
    @Input() selectedPeople: Person[];
    @Input() chatHistory: Chat[];
    @Input() selectedChat?: Chat;
    @Input() messages?: Message[];
    @Output() selectChat = new EventEmitter();
    @Output() addChat = new EventEmitter();
    @Output() editChat = new EventEmitter();
    @Output() exitChat = new EventEmitter();
    @Output() sendMessage = new EventEmitter();
    public innerHeight: number;
    public innerWidth: number = 350;


    constructor(){}

    ngOnInit() 
    {
        this.innerHeight = window.innerHeight - 70;
    }

    startChat()
    {
        let selectedChat: Chat;
        let needadd = true;
        if(this.selectedPeople.length > 1)
        {

            let array1 = this.selectedPeople.map( c => c.personId).sort( (a,b) => a-b).toString();
            this.chatHistory.forEach(chat => {
                let array2 = chat.people.map( c => c.personId).sort( (a,b) => a-b).toString();
                console.log("CHAT COMPARISON")
                console.log(array1)
                console.log(array2)
                console.log(array1 == array2)
                if(array1 == array2)
                {
                    console.log(array1 == array2)
                    selectedChat = chat;
                    needadd = false;
                }
            })
            if(needadd)
            {
                console.log("HEY FUCK IM HERE!!!!!")
                
                let ntitle:string = "";
                this.selectedPeople.forEach( c => {
                    ntitle += c.fName + " " + c.lName + ", "
                })
                ntitle = ntitle.substr(0, ntitle.length - 2);
                console.log(ntitle)

                selectedChat = {
                    title: ntitle
                }
                this.addChat.emit(selectedChat);
            }
            else
            {
                this.selectChat.emit(selectedChat);
            }
        }
    }

    editChat$(title:string)
    {
        this.selectedChat.title = title;
        this.editChat.emit(this.selectedChat);
    }

    get chatActive():boolean
    {
        if(this.selectedChat)
            return true;
        return false;
    }

    exitChat$()
    {
        this.exitChat.emit();
    }
}

/*

        console.log("CHAT INPUT")
        console.log(chat)
        let chatPeople: ChatPerson[] = [];
        let chatPerson: ChatPerson = new ChatPerson;
        chat._People.forEach( p => {
            p._Chats = null;
            chatPerson.person = p;
            chatPerson.personId = p.personId;
            chatPerson.chat = chat;
            chatPeople.push(chatPerson);
        })
        chat.people = chatPeople;
        chat.messages = null;
        chat._People = null;
        console.log("CHAT SET")
        console.log(chat)
        return this.http.post(chatsUrl, chat);
*/