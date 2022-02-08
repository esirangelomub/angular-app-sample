import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {E404Component} from "./views/errors/e404.component";
import {DefaultScreenComponent} from "./views/containers";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '404',
        component: E404Component,
        data: {
            title: 'Page 404'
        }
    },
    {
        path: '',
        component: DefaultScreenComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./views/pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'customer',
                loadChildren: () => import('./views/pages/customer/customer.module').then((m) => m.CustomerModule)
            }
        ]
    },
    {path: '**', component: E404Component}
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
