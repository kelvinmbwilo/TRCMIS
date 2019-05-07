import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../../models/team';
import {TeamService} from '../../../services/team.service';
import {HttpClientService} from '../../../services/http-client.service';
import {MatDialog} from '@angular/material';
import {UpdateMemberComponent} from '../update-member/update-member.component';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {

  constructor(
    private teamService: TeamService,
    private http: HttpClientService,
    public dialog: MatDialog,
    public userService: UserService
  ) {
  }

  @Input() team: Team;
  @Input() teamRoles: any[];
  @Output() close = new EventEmitter();
  @Output() saved = new EventEmitter();
  tableConfigurations = {
    tableColumns: [
      {name: 'identifier', label: 'Identifier'},
      {name: 'display', label: 'Name'},
      {name: 'age', label: 'Age'},
      {name: 'gender', label: 'Gender'},
      {name: 'teamRole', label: 'Team Role'},
      {name: 'locationNames', label: 'Location'},
    ],
    tableCaption: '',
    tableNotifications: '',
    showSearch: true,
    showBorder: true,
    allowPagination: true,
    actionIcons: {edit: false, delete: false, more: false, print: false},
    doneLoading: false,
    deleting: {},
    active: {},
    empty_msg: 'No Members for '
  };
  members: any[] = [];
  ngOnInit() {
    if (this.team && this.team.teamMembers) {
      this.tableConfigurations.empty_msg = `No members for ${this.team.display}`;
      this.members = this.team.teamMembers.map(
        (member: any) => {
          return {
            ...member,
            id: member.uuid,
            gender: member.person ? member.person.gender : '',
            age: member.person ? member.person.age : '',
            teamRole: member.teamRole ? member.teamRole.display : '',
            locationNames: member.locations && member.locations.length > 0
              ? member.locations.map(location => location.display).join(', ')
              : ''
          };
        }
      );
    }
  }

  onUpdate(event) {
    const dialogRef = this.dialog.open(UpdateMemberComponent, {
      width: '70%',
      data: {
        member: event,
        team: this.team,
        teamRoles: this.teamRoles
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  onDelete(item) {
    this.tableConfigurations.deleting = {};
    this.tableConfigurations.deleting[item.id] = true;
    this.teamService.deleteTeamMember(item).subscribe(
      resut => {
        this.tableConfigurations.deleting = {};
        this.http.showSuccess('Deleted Successful');
        this.userService.deletePerson(item.person).subscribe();
        this.saved.emit();
        this.members = this.members.filter(member => member.uuid !== item.uuid);
      }, error1 => {
        this.tableConfigurations.deleting = {};
        this.http.showError('Something went wrong while deleting');
      }
    );
  }

  closeForm() {
    this.close.emit();
  }


}
