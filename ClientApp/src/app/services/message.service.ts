import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Message } from "../models/message.model";

const messagesUrl = "/api/message/"

@Injectable()
export class MessageService
{
    constructor(private http:HttpClient){}

    getMessages(): Observable<Message[]>
    {
        return this.http.get<any>(messagesUrl);
    }

    getMessage(id:number): Observable<any>
    {
        return this.http.get(messagesUrl + id);
    }

    insertMessage(message:Message): Observable<any>
    {
        return this.http.post(messagesUrl, message);
    }
}