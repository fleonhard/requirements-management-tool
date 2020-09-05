/**
 * Created by Florian on 09.06.2017.
 */


import {Injectable} from "@angular/core";
import {Group} from "../group/Group";
import {Requirement} from "../requirement/Requirement";
import {Config} from "../requirement/requirement.service";
import {SORT_NONE} from "../group/group.component";


@Injectable()
export class SharedElements{
    public groups:Group[] = [];
    public tmpRequirement:Requirement;
    public editRequirement:Requirement;
    public deleteRequirement:Requirement;
    public alerts:any = [];
    public groupToAddLabel:Group;

    public showBanned:boolean = true;
    public showWatching:boolean = true;
    public showDone:boolean = true;

    public filterGroups:boolean=true;
    public filterLabels:boolean=true;
    public filterDescription:boolean=true;
    public filterId:boolean=true;

    public showEmptyGroups:boolean=true;

    public filterString:string='';

    public config:Config;


    addAlert(type:string, msg:string){
        this.alerts.push({
            type: type,
            msg: `(${(new Date()).toLocaleTimeString()}):`+" "+msg,
            timeout: 5000
        });
    }

    getFilterStringArray ():string[]{
        return this.filterString.toLowerCase().split("; ", 20);
    }













    public groupToVisualize:Group;

}