import {Component, OnInit, SecurityContext} from '@angular/core';
import {SharedElements} from "../helper/sharedElements.service";


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {


  constructor(private sharedElements:SharedElements) {
  }

  getAlerts(){
    return this.sharedElements.alerts;
  }

  ngOnInit() {
  }

}
