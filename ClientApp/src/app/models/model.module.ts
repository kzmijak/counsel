import { NgModule } from "@angular/core";
import { WorkplaceService } from "../services/workplace.service";
import { PersonService } from "../services/person.service";
import { ChatService } from "../services/chat.service";
import { MessageService } from "../services/message.service";

@NgModule({
    providers: [WorkplaceService, PersonService, ChatService, MessageService]
})
export class ModelModule{}