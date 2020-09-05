/**
 * Created by Florian on 09.06.2017.
 */
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
/**
 * Created by Florian on 02.05.2017.
 */
export class BackendInterface{

    protected allRequirementsFile = 'requirements.php';
    protected oldSystemRequirementsFile = 'oldSystemRequirements.php';
    protected newSystemRequirementsFile = 'newSystemRequirements.php';
    protected addToNewSystemFile = 'addToNewSystem.php';
    protected addToOldSystemFile = 'addToOldSystem.php';
    protected addAdminFile = 'addAdmin.php';
    protected addModulAdminFile = 'addModulAdmin.php';
    protected addDevelopmentTeamFile = 'addDevelopmentTeam.php';
    protected addEmployeeFile = 'addEmployee.php';
    protected addStudentAssistantFile = 'addStudentAssistant.php';
    protected addStudentFile = 'addStudent.php';
    protected addBasisFactorFile = 'addBasisFactor.php';
    protected addLeistungsFactorFile = 'addLeistungsFactor.php';
    protected addBegeisterungsFactorFile = 'addBegeisterungsFactor.php';
    protected addNichtFunktionalFile = 'addNichtFunktional.php';
    protected addFunktionalFile = 'addFunktional.php';
    protected getAllGroupsFile = 'getAllGroups.php';
    protected addGroupToReqFile = 'addGroupToReq.php';
    protected getAllSubpointsFile = 'getAllSubpoints.php';
    protected deleteSubpointFile = 'deleteSubpoint.php';
    protected addSubpointFile = 'addSubpoint.php';
    protected addGroupFile = 'addGroup.php';
    protected deleteGroupFile = 'deleteGroup.php';
    protected getCalculationSettingsFile = 'getCalculationSettings.php';
    protected addReqToDbFile = 'addReqToDb.php';
    protected deleteReqFile = 'deleteReq.php';
    protected setVotesFile = 'setVotes.php';
    protected addDescriptionFile = 'addDescription.php';
    protected updateRequirementFile = 'updateReq.php';
    protected getRequirementsByGroupFile = 'getRequirementsByGroup.php';
    protected addLabelFile = 'addLabel.php';
    protected getLabelsByGroupFile = 'getLabelsByGroup.php';
    protected getLabelsByRequirementFile = 'getLabelsByRequirement.php';
    protected addLabelToRequirementFile = 'addLabelToRequirement.php';
    protected deleteLabelFromRequirementFile = 'deleteLabelFromRequirement.php';
    protected deleteLabelFile = 'deleteLabel.php';
    protected moveLabelFile = 'moveLabelFromRequirement.php';
    protected getConfigFile = 'getCalculationSettings.php';
    protected path = 'https://req.herborn-software.com/backend/';

    constructor(protected http: Http){}

    protected handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string = "";
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    protected extractData(res: Response) {
        let body = res.json();
        return body;
    }


    protected get<T>(relativeRoute:string) : Observable<T>{
        return this.http.get(this.path+relativeRoute)
            .map(this.extractData)
            .catch(this.handleError);
    }
}