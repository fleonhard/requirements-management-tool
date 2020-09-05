import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {OverviewComponent} from "./overview/overview.component";
import {LoginComponent} from "./login/login.component";
import {ViewTestComponent} from "./view-test/view-test.component";

/**
 * Created by Florian on 01.06.2017.
 */

export const router: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full'},
    { path: 'overview', component: OverviewComponent},
    { path: 'login', component: LoginComponent},
    { path: 'test', component: ViewTestComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router, {
    useHash: true
});