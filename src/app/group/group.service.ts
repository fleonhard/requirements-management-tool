/**
 * Created by Florian on 09.06.2017.
 */

import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Group} from "./Group";
import {BackendInterface} from "../helper/BackendInterface";
import {Http} from "@angular/http";
import {Label, Requirement} from "../requirement/Requirement";
import {SharedElements} from "../helper/sharedElements.service";


@Injectable()
export class GroupService extends BackendInterface{
    
    constructor(http:Http, private sharedElements:SharedElements){
        super(http);
        
    }

    getGroups():Observable<Group[]>{
        return this.get<Group[]>(this.getAllGroupsFile);
    }

    addGroup(label:string):Observable<Group[]>{
        return this.get<Group[]>(this.addGroupFile+"?label="+label);
    }

    deleteGroup(id:number):Observable<Group[]>{
        return this.get<Group[]>(this.deleteGroupFile+"?id="+id);
    }

    addLabel(id:number, label:string, color:string):Observable<Label[]>{
        return this.get<Label[]>(this.addLabelFile+"?groupId="+id+"&color="+color+"&label="+label);
    }

    getLabelsByGroup(id:number):Observable<Label[]>{
        return this.get<Label[]>(this.getLabelsByGroupFile+"?groupId="+id);
    }

    deleteLabel(id:number):Observable<Requirement[]>{
        return this.get<Requirement[]>(this.deleteLabelFile+"?id="+id);
    }

    moveLabel(labelId:number, groupId:number, reqId:number):Observable<Label[]>{
        return this.get<Label[]>(this.moveLabelFile+"?groupId="+groupId+"&labelId="+labelId+"&reqId="+reqId);
    }

    filterRequirements(group:Group){
        if(group.requirements == null || group.requirements.length <=0) return group.requirements;
        return group.requirements.filter(req => this.filterRequirement(req, group));
    }

    private filterRequirement(req:Requirement, group:Group) {
        if(!this.sharedElements.showWatching && req.watching==1) return false;
        if(!this.sharedElements.showDone && req.done==1) return false;
        if(!this.sharedElements.showBanned && req.banned==1) return false;
        if(this.sharedElements.filterString.length <= 0) return true;

        var or:boolean = false;
        this.sharedElements.getFilterStringArray().forEach( filterString => {
            var and:boolean = true;
            filterString.split(", ", 20).forEach( andFilter => {
                if(filterString.length > 0){
                    if(this.sharedElements.filterGroups && group.label.toLowerCase().indexOf(andFilter)> -1){}
                    else if(this.sharedElements.filterDescription && req.description.toLowerCase().indexOf(andFilter)> -1){}
                    else if(this.sharedElements.filterId && (""+req.id).toLowerCase().indexOf(andFilter)> -1){}
                    else if(this.sharedElements.filterId && ("F"+req.id).toLowerCase().indexOf(andFilter)> -1){}
                    else if(this.sharedElements.filterLabels && req.labels != null && req.labels.filter(label => label.label.toLowerCase().indexOf(andFilter) > -1).length > 0){}
                    else and = false;
                }
            });
            if(and) or = true;
        });
        return or;
    }
}