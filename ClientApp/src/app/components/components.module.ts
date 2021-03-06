import { NgModule } from "@angular/core";
import { WorkplaceSelectionComponent } from "./workplaceSelection.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { OfficeViewComponent } from "./officeView.component";
import { NavigationComponent } from "./navigation.component";
import { SelectionComponent } from "./selection.component";
import { UserComponent } from "./user.component";
import { PeopleListComponent } from "./peopleList.component";
import { ChatComponent } from "./chat.component";

@NgModule({
    declarations: [
        WorkplaceSelectionComponent,
        OfficeViewComponent,
        NavigationComponent,
        SelectionComponent,
        UserComponent,
        PeopleListComponent,
        ChatComponent
    ],
    imports: [ BrowserModule, RouterModule, FormsModule]
})
export class ComponentsModule{}