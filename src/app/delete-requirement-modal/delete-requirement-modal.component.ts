import { Component, OnInit } from '@angular/core';
import {SharedElements} from "../helper/sharedElements.service";
import {RequirementService} from "../requirement/requirement.service";

@Component({
  selector: 'app-delete-requirement-modal',
  templateUrl: './delete-requirement-modal.component.html',
  styleUrls: ['./delete-requirement-modal.component.css']
})
export class DeleteRequirementModalComponent implements OnInit {

  constructor(private sharedElements:SharedElements, private requirementsService:RequirementService) { }

  ngOnInit() {
  }

  getRequirement(){
    return this.sharedElements.deleteRequirement;
  }

  delete(){
    this.requirementsService.deleteRequirement(this.sharedElements.deleteRequirement.id).subscribe( data =>{
      var group = this.sharedElements.groups.filter(group => group.id === this.sharedElements.deleteRequirement.groupId)[0];
      var index = group.requirements.indexOf(this.sharedElements.deleteRequirement, 0);
      if (index > -1) {
        group.requirements.splice(index, 1);
      }
      this.sharedElements.addAlert("success","Anforderung F"+this.sharedElements.deleteRequirement.id+" wurde erfolgreich gelöscht!");
    });
  }

  getGroupName(){
    return this.sharedElements.groups.filter(group => group.id === this.sharedElements.deleteRequirement.groupId)[0].label;
  }

}
