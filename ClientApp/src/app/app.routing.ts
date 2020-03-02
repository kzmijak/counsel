import { Routes, RouterModule } from "@angular/router";
import { WorkplaceSelectionComponent } from "./components/workplaceSelection.component";
import { OfficeViewComponent } from "./components/officeView.component";

const routes: Routes = 
[
    {path: "", component: WorkplaceSelectionComponent},
    {path: "office", component: OfficeViewComponent}
]
export const RoutingConfig = RouterModule.forRoot(routes);