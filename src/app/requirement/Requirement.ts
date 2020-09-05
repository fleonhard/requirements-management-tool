/**
 * Created by Florian on 09.06.2017.
 */

export class Label{
    constructor(public id:number, public color:string, public label:string){}
}

export class Requirement{

    public labels:Label[] = [];
    public priority:number = 0;
    public result:number = 0;

    constructor(public id:number,
                public description:string,
                public votes:number,
                public groupId: number,
                public basisfaktor: number,
                public leistungsfaktor: number,
                public begeisterungsfaktor: number,
                public developmentteam: number,
                public admin: number,
                public moduladmin: number,
                public employee: number,
                public studentassistant: number,
                public student: number,
                public oldSystem: number,
                public newSystem: number,
                public funktional: number,
                public nichtfunktional: number,
                public storypoints:number,
                public done:number,
                public watching:number,
                public banned:number

    ){};
}