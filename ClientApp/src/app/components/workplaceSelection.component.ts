import { Component, Input } from "@angular/core";
import { Workplace } from "../models/workplace.model";
import { Router } from "@angular/router";
import { Person } from "../models/person.model";
import { Observable } from "rxjs";
import { WorkplaceService } from "../services/workplace.service";

@Component({
    selector: "workplace-selector",
    templateUrl: "workplaceSelection.component.html"
})
export class WorkplaceSelectionComponent
{
    constructor(private router:Router, private wpservices:WorkplaceService){}

    private pending?:string = "Start"

    private alert:boolean = false;

    Proceed(value1:string, value2:string): void
    {
        localStorage.clear();
        if(value1 != "" && value2 != "")
        {
            this.wpservices.getWorkplaces().subscribe(Response => {
                Response.forEach(wp => {
                    if(wp.entryCode== value1 && wp.confirmationCode == value2)
                    {
                        localStorage.setItem('workplace', JSON.stringify(wp));
                        this.router.navigateByUrl('/office');
                    }
                });
                this.alert=true;
            })
        }
    }
}