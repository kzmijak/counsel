import { NgModule } from "@angular/core";
import { WorkplaceService } from "../services/workplace.service";
import { PersonService } from "../services/person.service";

@NgModule({
    providers: [WorkplaceService, PersonService]
})
export class ModelModule{}