import {Requirement, Label} from "../requirement/Requirement";
/**
 * Created by Florian on 09.06.2017.
 */

export class Group{
    public requirements:Requirement[] = [];
    public labels:Label[] = [];

    public resultValue:number = 0;
    public votes:number = 0;
    public storypoints:number = 0;

    constructor(public id:number, public label:string){}
}