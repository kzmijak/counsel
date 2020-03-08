import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Chat } from "../models/chat.model";
import { ChatPerson } from "../models/chatperson.model";
import { Person } from "../models/person.model";

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

    insertChat(chat:Chat): Observable<any>
    {
        return this.http.post(chatsUrl, chat);
    }

    insertChatPerson(nchat:Chat, nperson:Person): Observable<any>
    {
        let chatPerson = { chatId:nchat.chatId, chat:nchat , personId: nperson.personId, person:nperson }
        return this.http.post(chatsUrl + "cp", chatPerson);
    }

    updateChat(chat:any): Observable<Chat>
    {
        console.log(chat);
        return this.http.patch(chatsUrl + chat.chatId, chat);
    }
}