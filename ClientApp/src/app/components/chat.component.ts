import { Component, OnInit } from "@angular/core";

@Component({
    selector: "chat-component",
    templateUrl: "chat.component.html"
})
export class ChatComponent implements OnInit
{
    public innerHeight: number;
    public innerWidth: number = 350;

    constructor(){}

    ngOnInit() 
    {
        console.log("ChatComponent.ngOnInit()")
        this.innerHeight = window.innerHeight - 70;
    }
}