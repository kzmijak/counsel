import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Person } from "../models/person.model";
import { Chat } from "../models/chat.model";

@Component({
    selector: "chat-component",
    templateUrl: "chat.component.html"
})
export class ChatComponent implements OnInit
{
    @Input() loggedIn: Person;
    @Input() selectedPeople: Person[];
    @Input() chatHistory: Chat[];
    @Output() addChat = new EventEmitter();
    @Output() editChat = new EventEmitter();
    public innerHeight: number;
    public innerWidth: number = 350;
    private chatActive: boolean = false;
    private selectedChat: Chat;

    constructor(){}

    ngOnInit() 
    {
        this.innerHeight = window.innerHeight - 70;
    }

    startChat()
    {
        if(this.selectedPeople.length > 1)
        {
            this.chatActive = true;

            let array1 = this.selectedPeople.map( c => c.personId);
            this.chatHistory.forEach(chat => {
                let array2 = chat.people.map( c => c.personId);
                if(array1.toString() === array2.toString())
                {
                    this.selectedChat = chat;
                }
                else
                {
                    let ntitle:string = "";
                    this.selectedPeople.forEach( c => {
                        console.log("IN LOOP")
                        console.log(c)
                        ntitle += c.fName + " " + c.lName + ", "
                    })
                    ntitle = ntitle.substr(0, ntitle.length - 2);
                    console.log(ntitle)

                    this.selectedChat = {
                        title: ntitle, people: this.selectedPeople
                    }
                    this.addChat.emit(this.selectedChat);
                }
            })
        }
    }

    editChat$(title:string)
    {
        this.selectedChat.title = title;
        this.editChat.emit(this.selectedChat);
    }


}