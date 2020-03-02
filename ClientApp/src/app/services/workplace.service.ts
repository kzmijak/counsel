import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Workplace } from "../models/workplace.model";

const workplaceUrl = "/api/workplace/"

@Injectable()
export class WorkplaceService
{
    constructor(private http:HttpClient)
    {
        this.getWorkplaces();
    }

    getWorkplaces()
    {
        this.http.get<any>(workplaceUrl + "all").subscribe(response => this.workplaces = response)
    }

    getWorkplace(id:number)
    {
        this.http.get(workplaceUrl + id).subscribe(response => this.workplace = response)
    }
    
    workplace: Workplace;
    workplaces: Workplace[] = [];
}