import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./login/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    this.authService.checkCredentials();
  }
}
