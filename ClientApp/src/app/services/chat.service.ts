import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Chat } from "../models/chat.model";
import { ChatPerson } from "../models/chatperson.model";

const chatsUrl = "/api/chat/";

@Injectable()
export class ChatService
{
    constructor(private http:HttpClient){}

    getChats(): Observable<Chat[]>
    {
        return this.http.get<any>(chatsUrl);
    }

    getChat(id:number): Observable<Chat>
    {
        return this.http.get(chatsUrl + id);
    }

    insertChat(chat:Chat): Observable<Chat>
    {
        let chatpersonarray =  []
        chat.people.forEach( c => {
            let p = { chatId: chat.chatId, personId: c.personId}
            chatpersonarray.push(p)
        })

        let p = {
            title:chat.title, people: chatpersonarray
        }
        console.log("BEFORE PUTTING PEOPLE")
        console.log(p);
        this.getChat(1).subscribe(Response => {
            console.log("GETTING RESPONSE")
            console.log(Response)})

        return this.http.post(chatsUrl, p);
    }

    updateChat(chat:any): Observable<Chat>
    {
        return this.http.put(chatsUrl + chat.chatId, chat);
    }
}