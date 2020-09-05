import { Component, OnInit } from '@angular/core';
import {SharedElements} from "../helper/sharedElements.service";
import {GroupService} from "../group/group.service";
import {selector} from "rxjs/operator/multicast";
import {Label} from "../requirement/Requirement";

@Component({
  selector: 'app-edit-labels-for-group-modal',
  templateUrl: './edit-labels-for-group-modal.component.html',
  styleUrls: ['./edit-labels-for-group-modal.component.css']
})
export class EditLabelsForGroupModalComponent implements OnInit {


  selectedColor;
  colors:string[] = [
    "#ef9a9a",
    "#F48FB1",
    "#CE93D8",
    "#B39DDB",
    "#9FA8DA",
    "#90CAF9",
    "#81D4FA",
    "#80DEEA",
    "#80CBC4",
    "#A5D6A7",
    "#C5E1A5",
    "#E6EE9C",
    "#FFF59D",
    "#FFE082",
    "#FFA726",
    "#FFCC80",
    "#FFAB91",
    "#BCAAA4",
    "#EEEEEE",
    "#B0BEC5"
  ];

  constructor(private sharedElements:SharedElements, private groupService:GroupService) {
    this.setSelectedColor(this.colors[0]);
  }

  ngOnInit() {
  }

  setSelectedColor(color:string){
    this.selectedColor = color;
  }

  getGroup(){
    return this.sharedElements.groupToAddLabel;
  }

  getColorString(color:string){
    return "#"+color;
  }

  deleteLabel(label:Label){
    this.groupService.deleteLabel(label.id).subscribe(reqs => {
      let groups = this.sharedElements.groups;
      for(let group of groups){
        for(let req of group.requirements){
          if(reqs.filter(r => r.id === req.id).length > 0){
            var index = req.labels.indexOf(req.labels.filter(l => l.id === label.id)[0], 0);
            if (index > -1) {
              req.labels.splice(index, 1);
            }
          }
        }
      }
      var index = this.sharedElements.groupToAddLabel.labels.indexOf(this.sharedElements.groupToAddLabel.labels.filter(l => l.id === label.id)[0], 0);
      if (index > -1) {
        this.sharedElements.groupToAddLabel.labels.splice(index, 1);
      }
      this.sharedElements.addAlert("success","Label "+label.label+" wurde erfolgreich gelöscht!");
    });
  }

  addLabel(label:string){
    let color = this.selectedColor.replace('#','');
    this.groupService.addLabel(this.getGroup().id, label, color).subscribe(newLabel => {
      this.getGroup().labels.push(newLabel[0]);
      this.sharedElements.addAlert("success","Label "+newLabel[0].label+" wurde erfolgreich zur Gruppe "+this.getGroup().label+" hinzugefügt!");
    } );
  }

}
