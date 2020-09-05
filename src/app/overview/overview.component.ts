import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../login/login.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    this.authService.checkCredentials();
  }

}
