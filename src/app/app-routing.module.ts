import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from "./views/customer/customer.component";
import {CustomerFormComponent} from "./views/customer/customer-form/customer-form.component";

const routes: Routes = [
    {path: '', redirectTo: 'customers', pathMatch: 'full'},
    {path: 'customers', component: CustomerComponent},
    {path: 'customers/create', component: CustomerFormComponent},
    {path: 'customers/:id', component: CustomerFormComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            relativeLinkResolution: 'legacy',
            onSameUrlNavigation: 'reload'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
