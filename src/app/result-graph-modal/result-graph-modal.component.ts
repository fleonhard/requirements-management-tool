import { Component, OnInit } from '@angular/core';
import {SharedElements} from "../helper/sharedElements.service";
import {RequirementService} from "../requirement/requirement.service";
import {preparseElement} from "@angular/compiler/src/template_parser/template_preparser";
import {Group} from "../group/Group";

@Component({
  selector: 'app-result-graph-modal',
  templateUrl: './result-graph-modal.component.html',
  styleUrls: ['./result-graph-modal.component.css']
})
export class ResultGraphModalComponent implements OnInit {
  ngOnInit():void {
  }

  public group:Group;

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [0,1,2,3,4,5,6,7,8,9,10];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

  constructor(private sharedElements:SharedElements, private requirementsService:RequirementService){
    this.prepare();
  }

  prepare(){
    this.lineChartData = [];
    for(let i = 1; i<100; i++){
      this.lineChartData.push({
        data: new Array(10),
        label: ''
      });
    }
    this.prepareRadarChart();
  }

  public randomize():void {
    if(this.sharedElements.groupToVisualize == null) return;
    this.group = this.sharedElements.groupToVisualize;
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < 10; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  prepareRadarChart(){
    if(this.sharedElements.groupToVisualize == null) return;
    this.group = this.sharedElements.groupToVisualize;
    var requirements = this.group.requirements.filter(r => r.watching == 1).sort((r1, r2) => r1.result - r2.result);
    let lineChartData:Array<any> = new Array(this.lineChartData.length);


    for (let i = 0; i < this.lineChartData.length; i++) {

      if(requirements[i] != null){
        var m = requirements[i].priority/requirements[i].storypoints;
        lineChartData[i] = {data: new Array(requirements[i].storypoints), label: "F"+requirements[i].id};
        for (let j = 0; j < requirements[i].storypoints; j++) {
          lineChartData[i].data[j] = m*j;
        }
      }else {
        lineChartData[i] = { data : new Array(this.lineChartData[i].data.length), label: ''};
      }
    }
    this.lineChartData = lineChartData;
  }
}
