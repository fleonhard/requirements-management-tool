import {Component, OnInit, Input} from '@angular/core';
import {Requirement, Label} from "./Requirement";
import {RequirementService} from "./requirement.service";
import {SharedElements} from "../helper/sharedElements.service";

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {

  @Input()
  requirement:Requirement;

  constructor(private requirementService:RequirementService, private sharedElements:SharedElements){
  }

  ngOnInit() {
    this.requirementService.getLabelsByRequirement(this.requirement.id).subscribe( labels => {
      this.requirement.labels = labels;
    });
    this.calculateValues();
  }

  getDescription(){
    return this.requirementService.getDescription(this.requirement, this.requirement.description);
  }

  getGroupLabels(){
    return this.sharedElements.groups.filter(group => group.id === this.requirement.groupId)[0].labels;
  }

  getColorString(color:string){
    return "#"+color;
  }

  calculateValues(){
    this.requirement.priority = this.requirementService.getPriority(this.requirement);
    this.requirement.result = this.requirementService.getResultValue(this.requirement);
  }

  deleteLabelFromRequirement(label:Label){
    this.requirementService.deleteLabelFromRequirement(label.id, this.requirement.id).subscribe( labels =>{
      var index = this.requirement.labels.indexOf(label, 0);
      if (index > -1) {
        this.requirement.labels.splice(index, 1);
      }
      this.sharedElements.addAlert("success","Label "+label.label+" wurde erfolgreich von F"+this.requirement.id+" entfernt!");
    });
  }

  addLabelToRequirement(label:Label){
    if(this.requirement.labels.filter(l => l.id === label.id).length > 0){
      this.sharedElements.addAlert("danger","Das Label "+label.label+" konnte nicht zu F"+this.requirement.id+" hinzugefügt werden, da es schon vorhanden ist!");
      return;
    }
    this.requirementService.addLabelToRequirement(label.id, this.requirement.id).subscribe(newLabel =>{
      console.log(newLabel[0]);
      this.requirement.labels.push(newLabel[0]);
      this.sharedElements.addAlert("success","Das Label "+newLabel[0].label+" wurde erfolgreich zu F"+this.requirement.id+" hinzugefügt!")
    });
  }

  prepareEditRequirement(){
    this.sharedElements.editRequirement = this.requirement;
  }

  prepareDeleteRequirement(){
    this.sharedElements.deleteRequirement = this.requirement;
  }

  isOldSystem():boolean{
    return this.requirement.oldSystem==1;
  }
}
