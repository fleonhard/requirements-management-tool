import {Component, OnInit, Input, group} from '@angular/core';
import {Group} from "./Group";
import {GroupService} from "./group.service";
import {SharedElements} from "../helper/sharedElements.service";
import {RequirementService} from "../requirement/requirement.service";
import {Requirement, Label} from "../requirement/Requirement";

export const SORT_NONE:number = 0;
export const SORT_STORYPOINTS:number = 1;
export const SORT_STATUS:number = 2;
export const SORT_VOTES:number = 3;
export const SORT_ID:number = 4;
export const SORT_PRIORITY:number = 5;
export const SORT_RESULT:number = 6;
export const SORT_ALPHABET:number = 7;

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input()
  group:Group;
  sortValue:number = SORT_NONE;
  sortForward:boolean = true;

  constructor(private groupService:GroupService, private sharedElements:SharedElements, private requirementsService:RequirementService) {
  }

  ngOnInit() {
    this.requirementsService.getRequirementsByGroup(this.group.id).subscribe(reqs => {
      this.group.requirements = reqs;
    });
    this.groupService.getLabelsByGroup(this.group.id).subscribe(labels => {
      this.group.labels = labels;
    });
  }

  setSortByStoryPoints(){
    this.sortValue = SORT_STORYPOINTS;
    this.sort();
  }

  setSortByStatus(){
    this.sortValue = SORT_STATUS;
    this.sort();
  }

  setSortByPriority(){
    this.sortValue = SORT_PRIORITY;
    this.sort();
  }

  setSortById(){
    this.sortValue = SORT_ID;
    this.sort();
  }

  setSortByResult(){
    this.sortValue = SORT_RESULT;
    this.sort();
  }

  setSortByVotes(){
    this.sortValue = SORT_VOTES;
    this.sort();
  }

  setNoSort(){
    this.sortValue = SORT_NONE;
  }
  
  getRequirements(){
    return this.groupService.filterRequirements(this.group);
  }

  prepareEditLabels(){
    this.sharedElements.groupToAddLabel = this.group;
  }

  deleteGroup(){
    this.requirementsService.getRequirementsByGroup(this.group.id).subscribe(data => {
      if(data.length > 0){
        this.sharedElements.addAlert("danger", "Gruppe "+this.group.id+" konnte nicht gelöscht werden, da sie noch "+data.length+" Anforderungen entällt!");
        return;
      }
      this.groupService.deleteGroup(this.group.id).subscribe(data => {
        var index = this.sharedElements.groups.indexOf(this.group, 0);
        if (index > -1) {
          this.sharedElements.groups.splice(index, 1);
        }
        this.sharedElements.addAlert("success","Gruppe "+this.group.label+" wurde erfolgreich gelöscht!");
      });
    });
  }

  createNewRequirement(){
    this.sharedElements.tmpRequirement = new Requirement(0,"",0,this.group.id,1,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0);
  }

  onItemDrop(event){
    var req:Requirement = event.dragData;
    if(req.groupId === this.group.id) return;
    for(let label of req.labels){
      this.groupService.moveLabel(label.id, this.group.id, req.id).subscribe( data => {

        let newLabel = data[0];

        if(this.group.labels.filter( ngl => ngl.label === newLabel.label && ngl.color === newLabel.color).length > 0){
          this.group.labels.filter( ngl => ngl.label === newLabel.label && ngl.color === newLabel.color).forEach( existingLabel => {
            this.groupService.deleteLabel(newLabel.id).subscribe( success => {
              this.requirementsService.deleteLabelFromRequirement(newLabel.id, req.id).subscribe( success2 => {
                req.labels.splice(req.labels.indexOf(newLabel, 0), 1);
                this.requirementsService.addLabelToRequirement(existingLabel.id, req.id).subscribe( newReqLabel => {
                  req.labels.push(newReqLabel[0]);
                });
              });
            });
          })
        }else {
          label.id = newLabel.id;
          this.group.labels.push(newLabel);
        }
      });
    }
    this.requirementsService.changeGroup(req.id, this.group.id).subscribe(data => {
      var group = this.sharedElements.groups.filter(group => group.id === req.groupId)[0];
      var index = group.requirements.indexOf(req, 0);
      if (index > -1) {
        group.requirements.splice(index, 1);
      }
      var newGroup:Group = this.sharedElements.groups.filter(group => group.id === data[0].groupId)[0];
      newGroup.requirements[newGroup.requirements.length] = data[0];
    });
  }

  toggleSortDirection(){
    this.sortForward = !this.sortForward;
    this.sort();
  }

  private sort() {
    if(this.sortForward){
      switch (this.sortValue){
        case SORT_NONE: break;
        case SORT_STORYPOINTS: this.group.requirements.sort((a,b) => b.storypoints - a.storypoints); break;
        case SORT_STATUS: this.group.requirements.sort((a,b) => (b.done*3+b.watching*2+b.banned) - (a.done*3+a.watching*2+a.banned)); break;
        case SORT_ID: this.group.requirements.sort((a,b) => b.id - a.id); break;
        case SORT_PRIORITY: this.group.requirements.sort((a,b) => b.priority - a.priority); break;
        case SORT_VOTES: this.group.requirements.sort((a,b) => b.votes - a.votes); break;
        case SORT_RESULT: this.group.requirements.sort((a,b) => b.result - a.result); break;
      }
    }else {
      switch (this.sortValue){
        case SORT_NONE: break;
        case SORT_STORYPOINTS: this.group.requirements.sort((b,a) => b.storypoints - a.storypoints); break;
        case SORT_STATUS: this.group.requirements.sort((b,a) => (b.done*3+b.watching*2+b.banned) - (a.done*3+a.watching*2+a.banned)); break;
        case SORT_ID: this.group.requirements.sort((b,a) => b.id - a.id); break;
        case SORT_PRIORITY: this.group.requirements.sort((b,a) => b.priority - a.priority); break;
        case SORT_VOTES: this.group.requirements.sort((b,a) => b.votes - a.votes); break;
        case SORT_RESULT: this.group.requirements.sort((b,a) => b.result - a.result); break;
      }
    }
  }

  getResult(){
    var result:number = 0;
    var ignoreCount:number = 0;
    this.group.requirements.forEach(req => {
      if((req.watching == 1)){
        req.priority = this.requirementsService.getPriority(req);
        req.result = this.requirementsService.getResultValue(req);
        result += req.result;
      }else {
        ignoreCount ++;
      }
    });
    this.group.resultValue = result / (this.group.requirements.length - ignoreCount);
    return this.group.resultValue;
  }

  getStoryPoints(){
    var sp:number = 0;
    this.group.requirements.forEach(req => {
      if((req.watching == 1)){
        sp+= +req.storypoints
      }
    });
    this.group.storypoints = sp;
    return this.group.storypoints;
  }

  getVotes(){
    var v:number = 0;
    this.group.requirements.forEach(req => {
      if((req.watching == 1)){
        v+= +req.votes
      }
    });
    this.group.votes = v;
    return this.group.votes;
  }

  prepareGraphVisualization(){
    this.sharedElements.groupToVisualize = this.group;
  }

}
