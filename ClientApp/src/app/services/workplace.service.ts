import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Workplace } from "../models/workplace.model";
import { Observable } from "rxjs";

const workplaceUrl = "/api/workplace/"

@Injectable()
export class WorkplaceService
{
    constructor(private http:HttpClient)
    {
    }

    getWorkplaces()
    {
        return this.http.get<any>(workplaceUrl);
    }

    getWorkplace(id:number): Observable<Workplace>
    {
        return this.http.get(workplaceUrl + id);
    }
}