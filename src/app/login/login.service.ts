
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
export class User {
    constructor(
        public email: string,
        public password: string) { }
}

var users = [
    new User('ppfherborn','adminadmin123123'),
];

@Injectable()
export class AuthenticationService {

    userLabel:string = "c1c0f48d5c8a9ad0ffbc3ac11fccaad9dcda183b";

    constructor(
        private _router: Router){}

    logout() {
        localStorage.removeItem(this.userLabel);
        this._router.navigate(['login']);
    }

    login(user){
        var authenticatedUser = users.filter(u => u.email === user.email)[0];
        if (authenticatedUser && authenticatedUser.password === user.password){
            localStorage.setItem(this.userLabel, JSON.stringify(authenticatedUser));
            this._router.navigate(['']);
            return true;
        }
        return false;

    }

    checkCredentials(){
        if (!this.isLoggedIn()){
            this._router.navigate(['login']);
        }
    }

    isLoggedIn(): boolean{
        return localStorage.getItem(this.userLabel) !== null;
    }
}