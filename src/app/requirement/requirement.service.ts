/**
 * Created by Florian on 09.06.2017.
 */

import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Requirement, Label} from "./Requirement";
import {Http} from "@angular/http";
import {BackendInterface} from "../helper/BackendInterface";
import {SharedElements} from "../helper/sharedElements.service";

export class Config{
    constructor(public basiscomponentpoints:number, public leistungscomponentpoints:number, public begeisterungscomponentpoints:number, public votepoint:number){}
}

@Injectable()
export class RequirementService extends BackendInterface{

    constructor(http:Http, private sharedElements:SharedElements){
        super(http);

    }

    getRequirementsByGroup(groupId:number):Observable<Requirement[]>{
        return this.get<Requirement[]>(this.getRequirementsByGroupFile+"?groupId="+groupId);
    }

    getCongig():Observable<Config[]>{
        return this.get<Config[]>(this.getConfigFile);
    }

    addRequirementToDb(req:Requirement):Observable<Requirement[]>{
        return this.get<Requirement[]>(this.addReqToDbFile+this.getFullRequirementsParams(req));
    }

    updateRequirement(req:Requirement):Observable<Requirement[]>{
        return this.get<Requirement[]>(this.updateRequirementFile+this.getFullRequirementsParams(req));
    }

    addLabelToRequirement(id:number, reqId:number):Observable<Label[]>{
        return this.get<Label[]>(this.addLabelToRequirementFile+"?id="+id+"&reqId="+reqId);
    }

    getLabelsByRequirement(id:number):Observable<Label[]>{
        return this.get<Label[]>(this.getLabelsByRequirementFile+"?id="+id);
    }

    deleteLabelFromRequirement(id:number, reqId:number){
        return this.get<Label[]>(this.deleteLabelFromRequirementFile+"?id="+id+"&reqId="+reqId);
    }

    deleteRequirement(id:number):Observable<Requirement[]>{
        return this.get<Requirement[]>(this.deleteReqFile+"?id="+id);
    }

    changeGroup(reqId:number, groupId:number):Observable<Requirement[]>{
        return this.get<Requirement[]>(this.addGroupToReqFile+"?reqId="+reqId+"&groupId="+groupId);
    }

    getDescription(requirement:Requirement, description:string):string{

        let priority:string = "";
        if(requirement.basisfaktor==1) priority = "muss";
        else if(requirement.leistungsfaktor==1) priority = "soll";
        else if(requirement.begeisterungsfaktor==1) priority = "wird";

        let rolePart = "";
        let parts:string[] = [];
        let i:number = 0;
        if(requirement.developmentteam==1) parts[i++] = "dem Entwickler-Team";
        if(requirement.admin==1) parts[i++] = "einem Admin";
        if(requirement.moduladmin==1) parts[i++] = "einem Modulverantwortlichen";
        if(requirement.employee==1) parts[i++] = "einem Mitarbeiter";
        if(requirement.studentassistant==1) parts[i++] = "einer Studentischen Hilfskraft";
        if(requirement.student==1) parts[i++] = "einem Studenten";

        if(parts.length>0){
            let y:number = 0;
            parts.forEach(part => {
                if(y == 0){
                    rolePart += part;
                }else {
                    if(y<parts.length-1){
                        rolePart += ", "+part;
                    }else {
                        rolePart += " und "+part;
                    }
                }
                y++;
            })
            rolePart += " die Möglichkeit geben,"
        }

        let firstPart = 'Das zu entwickelnde System';
        if(requirement.oldSystem==1) firstPart = 'Das bestehende System';

        return firstPart+" "+priority+" "+rolePart+" "+description+".";
    }

    copy(requirement:Requirement):Requirement{
        return new Requirement(
            requirement.id,
            requirement.description,
            requirement.votes,
            requirement.groupId,
            requirement.basisfaktor,
            requirement.leistungsfaktor,
            requirement.begeisterungsfaktor,
            requirement.developmentteam,
            requirement.admin,
            requirement.moduladmin,
            requirement.employee,
            requirement.studentassistant,
            requirement.student,
            requirement.oldSystem,
            requirement.newSystem,
            requirement.funktional,
            requirement.nichtfunktional,
            requirement.storypoints,
            requirement.done,
            requirement.watching,
            requirement.banned
        )
    }

    map(to:Requirement, from:Requirement) {
        to.id = from.id;
        to.description = from.description;
        to.votes = from.votes;
        to.groupId = from.groupId;
        to.basisfaktor = from.basisfaktor;
        to.leistungsfaktor = from.leistungsfaktor;
        to.begeisterungsfaktor = from.begeisterungsfaktor;
        to.developmentteam = from.developmentteam;
        to.admin = from.admin;
        to.moduladmin = from.moduladmin;
        to.employee = from.employee;
        to.studentassistant = from.studentassistant;
        to.student = from.student;
        to.oldSystem = from.oldSystem;
        to.newSystem = from.newSystem;
        to.funktional = from.funktional;
        to.nichtfunktional = from.nichtfunktional;
        to.storypoints = from.storypoints;
        to.watching = from.watching;
        to.done = from.done;
        to.banned = from.banned;
    }

    private getFullRequirementsParams(req:Requirement) {
        return "?id="+req.id+
        "&description="+req.description+
        "&votes="+req.votes+
        "&oldSystem="+req.oldSystem+
        "&newSystem="+req.newSystem+
        "&admin="+req.admin+
        "&moduladmin="+req.moduladmin+
        "&employee="+req.employee+
        "&developmentteam="+req.developmentteam+
        "&studentassistant="+req.studentassistant+
        "&student="+req.student+
        "&basisfaktor="+req.basisfaktor+
        "&leistungsfaktor="+req.leistungsfaktor+
        "&begeisterungsfaktor="+req.begeisterungsfaktor+
        "&funktional="+req.funktional+
        "&nichtfunktional="+req.nichtfunktional+
        "&groupId="+req.groupId+
        "&storypoints="+req.storypoints+
        "&done="+req.done+
        "&watching="+req.watching+
        "&banned="+req.banned
    }

    getPriority(requirement:Requirement){
        if(requirement == null || requirement.banned==1 || requirement.done == 1) return 0;
        var maxVotes:number = 11;
        //this.sharedElements.groups.forEach(g => g.requirements.forEach( r => {
        //    if(r.votes > maxVotes) maxVotes = r.votes;
        //}));
        var config:Config = this.sharedElements.config;
        var priority:number = 0;
        if(requirement.basisfaktor==1) priority += +config.basiscomponentpoints;
        else if(requirement.leistungsfaktor==1) priority += +config.leistungscomponentpoints;
        else if(requirement.begeisterungsfaktor==1) priority += +config.begeisterungscomponentpoints;
        priority += +requirement.votes * +config.votepoint;
        return priority / (maxVotes * +config.votepoint + +config.basiscomponentpoints)*100;
    }

    getResultValue(requirement:Requirement){
        if(!(requirement.watching == 1)) return 0;
        return 100- Math.sqrt((((requirement.storypoints-1)*10) * ((requirement.storypoints-1)*10))+((100 - requirement.priority)*(100 - requirement.priority)));
    }
}