import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClientService} from './http-client.service';

@Injectable({providedIn: 'root'})
export class TeamService {
  loadingMessage: string = 'Loading Teams';
  constructor(private http: HttpClientService) {
  }


  listTeams(): Observable<any> {
    return Observable.create(observer => {

      this.http.getOpenMRS(`team/team?v=default&limit=1000`)
        .subscribe((teamResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(teamResponse.results);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  createTeam(team) {
    return Observable.create(observer => {

      this.http.postOpenMRS(`team/team`, team)
        .subscribe((teamResponse: any) => {
            this.loadingMessage = 'Team created successfully';
            observer.next(teamResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'Team creation failed';
            observer.error('some error occur');
          });
    });
  }

  updateTeam(team, uuid) {
    return Observable.create(observer => {
      this.http.postOpenMRS(`team/team/` + uuid, team)
        .subscribe((teamResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(teamResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  deleteTeam(team) {
    return Observable.create(observer => {

      this.http.deleteOpenMRS(`team/team/` + team.uuid)
        .subscribe((teamResponse: any) => {
            this.loadingMessage = 'Deleted successfully';
            observer.next(teamResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'Deleting failed';
            observer.error('some error occur');
          });
    });
  }



  listTeamMembers(): Observable<any> {
    return Observable.create(observer => {

      this.http.getOpenMRS(`team/teammember?v=default&limit=1000`)
        .subscribe((teamResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(teamResponse.results);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  listTeamRoles(): Observable<any> {
    return Observable.create(observer => {

      this.http.getOpenMRS(`team/teamrole?v=default`)
        .subscribe((teamResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(teamResponse.results);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }


  createTeamMember(teamMember) {
    return Observable.create(observer => {

      this.http.postOpenMRS(`team/teammember`, teamMember)
        .subscribe((teamMemberResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(teamMemberResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  updateTeamMember(teamMember, uuid) {
    return Observable.create(observer => {
      this.http.putOpenMRS(`/team/teammember/` + uuid, teamMember)
        .subscribe((teamMemberResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(teamMemberResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  deleteTeamMember(teamMember): Observable<any> {
    return Observable.create(observer => {

      this.http.deleteOpenMRS(`/team/teammember/` + teamMember.uuid)
        .subscribe((teamMemberResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(teamMemberResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }


}
