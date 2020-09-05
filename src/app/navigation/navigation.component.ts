import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../login/login.service";
import {SharedElements} from "../helper/sharedElements.service";
import "../group/group.component";
import {
    SORT_STORYPOINTS, SORT_STATUS, SORT_PRIORITY, SORT_ID, SORT_RESULT, SORT_VOTES,
    SORT_NONE, SORT_ALPHABET
} from "../group/group.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  sortValue:number = SORT_NONE;
  sortForward:boolean = true;

  constructor(private authService:AuthenticationService, private sharedElements:SharedElements) { }

  ngOnInit() {
    this.authService.checkCredentials();
  }

  logout(){
    this.authService.logout();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getElements(){
    return this.sharedElements;
  }
  toggleShowEmptyGroups(){
    this.sharedElements.showEmptyGroups = !this.sharedElements.showEmptyGroups;
  }
  toggleShowBanned(){
    this.sharedElements.showBanned = !this.sharedElements.showBanned;
  }
  toggleShowWatching(){
    this.sharedElements.showWatching = !this.sharedElements.showWatching;
    console.log(this.sharedElements.showWatching);
  }
  toggleShowDone(){
    this.sharedElements.showDone = !this.sharedElements.showDone;
  }

  setSortByStoryPoints(){
    this.sortValue = SORT_STORYPOINTS;
    this.sort();
  }

  setSortByAlphabet(){
    this.sortValue = SORT_ALPHABET;
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


  toggleSortDirection(){
    this.sortForward = !this.sortForward;
    this.sort();
  }

  private sort() {
    if(this.sortForward){
      switch (this.sortValue){
        case SORT_NONE: break;
        case SORT_STORYPOINTS: this.sharedElements.groups.sort((a,b) => b.storypoints - a.storypoints); break;
        case SORT_ALPHABET: this.sharedElements.groups.sort((a,b) => {
          if(a.label < b.label) return -1;
          if(a.label > b.label) return 1;
          return 0;
        }); break;
        case SORT_VOTES: this.sharedElements.groups.sort((a,b) => b.votes - a.votes); break;
        case SORT_RESULT: this.sharedElements.groups.sort((a,b) => b.resultValue - a.resultValue); break;
      }
    }else {
      switch (this.sortValue){
        case SORT_NONE: break;
        case SORT_STORYPOINTS: this.sharedElements.groups.sort((b,a) => b.storypoints - a.storypoints); break;
        case SORT_ALPHABET: this.sharedElements.groups.sort((b,a) => {
          if(a.label < b.label) return -1;
          if(a.label > b.label) return 1;
          return 0;
        }); break;
        case SORT_VOTES: this.sharedElements.groups.sort((b,a) => b.votes - a.votes); break;
        case SORT_RESULT: this.sharedElements.groups.sort((b,a) => b.resultValue - a.resultValue); break;
      }
    }
  }
}
