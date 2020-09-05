import { Component, OnInit } from '@angular/core';
import {SharedElements} from "../helper/sharedElements.service";
import {GroupService} from "../group/group.service";
import {RequirementService} from "../requirement/requirement.service";
import {Requirement} from "../requirement/Requirement";

@Component({
  selector: 'app-edit-requirement-modal',
  templateUrl: './edit-requirement-modal.component.html',
  styleUrls: ['./edit-requirement-modal.component.css']
})
export class EditRequirementModalComponent implements OnInit {


  blockComplete:boolean = false;
  tmpRequirement:Requirement;
  currentRequirement:Requirement;

  constructor(private sharedElements:SharedElements, private groupService:GroupService, private requirementService:RequirementService) { }

  ngOnInit() {
  }

  getGroupName(){
    return this.sharedElements.groups.filter(group => group.id === this.sharedElements.editRequirement.groupId)[0].label;
  }

  getTmpRequirement(){
    if(this.currentRequirement != this.sharedElements.editRequirement){
      this.currentRequirement = this.sharedElements.editRequirement;
      this.tmpRequirement = this.requirementService.copy(this.sharedElements.editRequirement);
    }
    return this.tmpRequirement;
  }

  setDescription(description:string){
    this.tmpRequirement.description = description;
  }

  getDescription(){
    return this.requirementService.getDescription(this.tmpRequirement, this.tmpRequirement.description);
  }

  toggleAdmin(){
    this.tmpRequirement.admin = (this.tmpRequirement.admin==1)?0:1;
  }

  toggleDevelpomentTeam(){
    this.tmpRequirement.developmentteam = (this.tmpRequirement.developmentteam==1)?0:1;
  }

  toggleModulAdmin(){
    this.tmpRequirement.moduladmin = (this.tmpRequirement.moduladmin==1)?0:1;
  }

  toggleStudent(){
    this.tmpRequirement.student = (this.tmpRequirement.student==1)?0:1;
  }

  toggleEmployee(){
    this.tmpRequirement.employee = (this.tmpRequirement.employee==1)?0:1;
  }

  toggleStudentAssistant(){
    this.tmpRequirement.studentassistant = (this.tmpRequirement.studentassistant==1)?0:1;
  }

  addToNewSystem(){
    this.tmpRequirement.newSystem = 1;
    this.tmpRequirement.oldSystem = 0;
  }

  addToOldSystem(){
    this.tmpRequirement.newSystem = 0;
    this.tmpRequirement.oldSystem = 1;
  }

  addBegeisterungsFactor(){
    this.tmpRequirement.begeisterungsfaktor = 1;
    this.tmpRequirement.leistungsfaktor = 0;
    this.tmpRequirement.basisfaktor = 0;
  }

  addBasisFactor(){
    this.tmpRequirement.begeisterungsfaktor = 0;
    this.tmpRequirement.leistungsfaktor = 0;
    this.tmpRequirement.basisfaktor = 1;
  }

  addLeistungsFactor(){
    this.tmpRequirement.begeisterungsfaktor = 0;
    this.tmpRequirement.leistungsfaktor = 1;
    this.tmpRequirement.basisfaktor = 0;
  }

  addFunktional(){
    this.tmpRequirement.funktional = 1;
    this.tmpRequirement.nichtfunktional = 0;
  }

  addNichtFunktional(){
    this.tmpRequirement.funktional = 0;
    this.tmpRequirement.nichtfunktional = 1;
  }

  addRequirementToDb(){
    this.blockComplete = true;
    this.requirementService.updateRequirement(this.tmpRequirement).subscribe( data => {
      this.requirementService.map(this.sharedElements.editRequirement, data[0]);
      this.blockComplete = false;
      this.sharedElements.addAlert("success","Anforderung F"+this.sharedElements.editRequirement.id+" wurde erfolgreich editiert!");
    });
  }


  setBanned(){
    this.getTmpRequirement().banned = 1;
    this.getTmpRequirement().done = 0;
    this.getTmpRequirement().watching = 0;
  }

  setWatching(){
    this.getTmpRequirement().banned = 0;
    this.getTmpRequirement().done = 0;
    this.getTmpRequirement().watching = 1;
  }

  setDone(){
    this.getTmpRequirement().banned = 0;
    this.getTmpRequirement().done = 1;
    this.getTmpRequirement().watching = 0;
  }

  increaseVotes(){
    this.tmpRequirement.votes++;
  }

  decreaseVotes(){
    if(this.tmpRequirement.votes==0) return;
    this.tmpRequirement.votes--;
  }

  setStoryPoints(points:number) {
    this.getTmpRequirement().storypoints = points;
  }


}
