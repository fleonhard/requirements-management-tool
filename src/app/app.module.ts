import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';

import {routes} from "./app.router";
import { NavigationComponent } from './navigation/navigation.component';
import { GroupComponent } from './group/group.component';
import { RequirementComponent } from './requirement/requirement.component';
import {GroupService} from "./group/group.service";
import { GroupsComponent } from './groups/groups.component';
import {CommonModule} from "@angular/common";
import {RequirementService} from "./requirement/requirement.service";
import {SharedElements} from "./helper/sharedElements.service";
import { LoginComponent } from './login/login.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {AuthenticationService} from "./login/login.service";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { ViewTestComponent } from './view-test/view-test.component';
import {Ng2DragDropModule} from "ng2-drag-drop/index";
import { NewRequirementModalComponent } from './new-requirement-modal/new-requirement-modal.component';
import { EditRequirementModalComponent } from './edit-requirement-modal/edit-requirement-modal.component';
import { DeleteRequirementModalComponent } from './delete-requirement-modal/delete-requirement-modal.component';
import { AlertComponent } from './alert/alert.component';
import {AlertModule} from "ngx-bootstrap/index";
import { EditLabelsForGroupModalComponent } from './edit-labels-for-group-modal/edit-labels-for-group-modal.component';
import {ChartsModule} from "ng2-charts/index";
import { ResultGraphModalComponent } from './result-graph-modal/result-graph-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    NavigationComponent,
    GroupComponent,
    RequirementComponent,
    GroupsComponent,
    LoginComponent,
    ViewTestComponent,
    NewRequirementModalComponent,
    EditRequirementModalComponent,
    DeleteRequirementModalComponent,
    AlertComponent,
    EditLabelsForGroupModalComponent,
    ResultGraphModalComponent
  ],
  imports: [
      Ng2DragDropModule,
    CommonModule,
    BrowserModule,
    routes,
    BootstrapModalModule,
    BootstrapModalModule.forRoot({container:document.body}),
    HttpModule,
    FormsModule,
      AlertModule.forRoot(),
      ChartsModule
  ],
  providers: [
      GroupService,
      RequirementService,
      SharedElements,
      AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
