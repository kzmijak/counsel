import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

const messagesUrl = "/api/message/"

@Injectable()
export class MessageService
{
    constructor(private http:HttpClient){}

    getMessages(): Observable<Message[]>
    {
        return this.http.get<any>(messagesUrl);
    }

    getMessage(id:number): Observable<Message>
    {
        return this.http.get<any>(messagesUrl + id);
    }

    insertMessage(message:Message): Observable<Message>
    {
        return this.http.put<any>(messagesUrl, message);
    }
}