import { Component, OnInit } from '@angular/core';
import {GroupService} from "../group/group.service";
import {Group} from "../group/Group";
import {SharedElements} from "../helper/sharedElements.service";
import {RequirementService} from "../requirement/requirement.service";
import {Requirement} from "../requirement/Requirement";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  ngOnInit():void {
  }

  constructor(private groupService:GroupService, private sharedElements:SharedElements, private requirementService:RequirementService) {
    this.groupService.getGroups().subscribe(groups => this.sharedElements.groups = groups);
    this.requirementService.getCongig().subscribe(configs => this.sharedElements.config = configs[0]);
  }

  getGroups(){
    return this.sharedElements.groups;
  }
  deleteGroup(id:number){
    this.groupService.deleteGroup(id).subscribe(groups => this.sharedElements.groups = groups);
  }

  addGroup(label:string){
    this.groupService.addGroup(label).subscribe(groups => this.sharedElements.groups = groups);
  }

  checkShowGroup(group:Group){
    if(this.sharedElements.showEmptyGroups) return true;

    var found:boolean = false;
    if(this.sharedElements.filterGroups){
      this.sharedElements.getFilterStringArray().forEach(filterString => {
        if(filterString.length > 0 && !found && group.label.toLowerCase().indexOf(filterString) > -1) found = true;
      });
    }
    if(found) return true;

    return this.groupService.filterRequirements(group).length > 0;
  }
}
