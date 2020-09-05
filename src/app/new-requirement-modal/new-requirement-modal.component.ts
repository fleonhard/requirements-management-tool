import { Component, OnInit } from '@angular/core';
import {SharedElements} from "../helper/sharedElements.service";
import {GroupService} from "../group/group.service";
import {RequirementService} from "../requirement/requirement.service";

@Component({
  selector: 'app-new-requirement-modal',
  templateUrl: './new-requirement-modal.component.html',
  styleUrls: ['./new-requirement-modal.component.css']
})
export class NewRequirementModalComponent implements OnInit {

  constructor(private sharedElements:SharedElements, private groupService:GroupService, private requirementService:RequirementService) { }

  ngOnInit() {
  }

  blockComplete:boolean = false;

  getGroupName(){
    return this.sharedElements.groups.filter(group => group.id === this.sharedElements.tmpRequirement.groupId)[0].label;
  }

  getTmpRequirement(){
    return this.sharedElements.tmpRequirement;
  }

  setDescription(description:string){
    this.sharedElements.tmpRequirement.description = description;
  }

  getDescription(){
    return this.requirementService.getDescription(this.sharedElements.tmpRequirement, this.sharedElements.tmpRequirement.description);
  }

  toggleAdmin(){
    this.sharedElements.tmpRequirement.admin = (this.sharedElements.tmpRequirement.admin==1)?0:1;
  }

  toggleDevelpomentTeam(){
    this.sharedElements.tmpRequirement.developmentteam = (this.sharedElements.tmpRequirement.developmentteam==1)?0:1;
  }

  toggleModulAdmin(){
    this.sharedElements.tmpRequirement.moduladmin = (this.sharedElements.tmpRequirement.moduladmin==1)?0:1;
  }

  toggleStudent(){
    this.sharedElements.tmpRequirement.student = (this.sharedElements.tmpRequirement.student==1)?0:1;
  }

  toggleEmployee(){
    this.sharedElements.tmpRequirement.employee = (this.sharedElements.tmpRequirement.employee==1)?0:1;
  }

  toggleStudentAssistant(){
    this.sharedElements.tmpRequirement.studentassistant = (this.sharedElements.tmpRequirement.studentassistant==1)?0:1;
  }

  addToNewSystem(){
    this.sharedElements.tmpRequirement.newSystem = 1;
    this.sharedElements.tmpRequirement.oldSystem = 0;
  }

  addToOldSystem(){
    this.sharedElements.tmpRequirement.newSystem = 0;
    this.sharedElements.tmpRequirement.oldSystem = 1;
  }

  addBegeisterungsFactor(){
    this.sharedElements.tmpRequirement.begeisterungsfaktor = 1;
    this.sharedElements.tmpRequirement.leistungsfaktor = 0;
    this.sharedElements.tmpRequirement.basisfaktor = 0;
  }

  addBasisFactor(){
    this.sharedElements.tmpRequirement.begeisterungsfaktor = 0;
    this.sharedElements.tmpRequirement.leistungsfaktor = 0;
    this.sharedElements.tmpRequirement.basisfaktor = 1;
  }

  addLeistungsFactor(){
    this.sharedElements.tmpRequirement.begeisterungsfaktor = 0;
    this.sharedElements.tmpRequirement.leistungsfaktor = 1;
    this.sharedElements.tmpRequirement.basisfaktor = 0;
  }

  addFunktional(){
    this.sharedElements.tmpRequirement.funktional = 1;
    this.sharedElements.tmpRequirement.nichtfunktional = 0;
  }

  addNichtFunktional(){
    this.sharedElements.tmpRequirement.funktional = 0;
    this.sharedElements.tmpRequirement.nichtfunktional = 1;
  }

  setStoryPoints(points:number) {
    this.getTmpRequirement().storypoints = points;
  }

  addRequirementToDb(){
    this.blockComplete = true;
    this.requirementService.addRequirementToDb(this.sharedElements.tmpRequirement).subscribe( data => {
      let group = this.sharedElements.groups.filter(group => group.id === this.sharedElements.tmpRequirement.groupId)[0];
      group.requirements[group.requirements.length] = data[0];
      this.blockComplete = false;
      this.sharedElements.addAlert("success","Anforderung wurde erfolgreich erstellt! ID: "+data[0].id);
    });
  }

  increaseVotes(){
    this.sharedElements.tmpRequirement.votes++;
  }

  decreaseVotes(){
    if(this.sharedElements.tmpRequirement.votes==0) return;
    this.sharedElements.tmpRequirement.votes--;
  }

}
