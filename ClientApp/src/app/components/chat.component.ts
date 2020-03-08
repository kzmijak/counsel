import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SystemJsNgModuleLoader, OnChanges, SimpleChange, SimpleChanges } from "@angular/core";
import { Person } from "../models/person.model";
import { Chat } from "../models/chat.model";
import { Message } from "../models/message.model";

@Component({
    selector: "chat-component",
    templateUrl: "chat.component.html"
})
export class ChatComponent implements OnInit, OnChanges
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

    ngOnChanges(changes:SimpleChanges)
    {
        console.log(changes);
    }

    startChat()
    {
        let selectedChat: Chat;
        let needadd = true;
        if(this.selectedPeople.length > 1)
        {

            let array1 = this.selectedPeople.map( c => c.personId).sort( (a,b) => a-b).toString();
            this.chatHistory.forEach(chat => {
                let array2 = chat._People.map( c => c.personId).sort( (a,b) => a-b).toString();
                if(array1 == array2)
                {
                    this.selectChat.emit(chat);
                    needadd = false;
                }
            })
            if(needadd)
            {   
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

    currentMessage(index,item)
    {
        this.msgprops = {
            timestamp: item.timestamp.toLocaleString,
            name: item.sender.fName + " " + item.sender.lName,
            content: item.content
        }
    }
    private msgprops:any;

    private taVal: any;
    sendMessage$()
    {
        var today = new Date();
        let text = this.taVal.substr(0, this.taVal.length - 1)
        let message = {
            content : text,
            sender: this.loggedIn,
            chat: this.selectedChat,
            timestamp: today }
        this.taVal = "";

        this.sendMessage.emit(message);
        this.startChat();
    }

    reloadComponent()
    {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ELOADING")
        this.startChat();
    }

    private reload = true;
}
