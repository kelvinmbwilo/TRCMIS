import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Team} from '../../models/team';
import {HttpClientService} from '../../services/http-client.service';
import {TeamService} from '../../services/team.service';
import {TeamMember} from '../../models/team-member';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  viewDetails: boolean = false;
  loading: boolean = false;
  saving_data: boolean = false;
  teams: Team[] = [];
  teamMembers: TeamMember[] = [];
  itemId: number;
  tableConfigurations = {
    tableColumns: [
      {name: 'teamIdentifier', label: 'Identifier'},
      {name: 'teamName', label: 'Name'},
      {name: 'supervisor', label: 'Supervisor'},
      {name: 'locationName', label: 'Location'},
      {name: 'members', label: 'Members', type: 'number'},
    ],
    tableCaption: '',
    tableNotifications: '',
    showSearch: true,
    showBorder: true,
    allowPagination: true,
    actionIcons: {edit: true, delete: true, more: true, print: false, customPrimary: true},
    doneLoading: false,
    deleting: {},
    active: {},
    customPrimaryMessage: 'Add Member',
    empty_msg: 'No Teams'
  };
  submitForm: FormGroup;
  smallForm: boolean = false;
  animationSize: string = 'full';
  view_data: string = '';
  formTitle: string = '';
  currentTeam: Team;
  roles: any[] = [];
  teamRoles: any[] = [];
  loadingMessage: string;

  constructor(
    private httpClient: HttpClientService,
    private teamService: TeamService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.prepareTeamWithMembers();
    this.getRoles();
    this.getTeamRoles();
  }

  async getItems() {
    this.loadingMessage = 'Getting Team information...';
    this.teams = await this.teamService.listTeams().toPromise();
  }

  async getTeamMembers() {

    this.loadingMessage = 'Getting Team Members information...';
    this.teamMembers = await this.teamService.listTeamMembers().toPromise();
  }

  async getTeamRoles() {
    this.teamRoles = await this.teamService.listTeamRoles().toPromise();
  }

  async getRoles() {
    const roles = await this.userService.listRoles().toPromise();
    console.log(roles);
    this.roles = roles.results;
    // this.roles = roles.results.filter(i => i.name ? i.name.indexOf('htmr') !== -1 : false);
  }


  prepareTeamWithMembers() {
    this.loading = true;
    this.getItems().then(items => {
      this.getTeamMembers().then(members => {
        this.loading = false;
        this.teams = this.teams.map((team: any) => ({
          id: team.uuid,
          uuid: team.uuid,
          display: team.display,
          teamName: team.teamName,
          teamIdentifier: team.teamIdentifier,
          supervisor: team.supervisor,
          supervisorUuid: team.supervisorUuid,
          supervisorTeam: team.supervisorTeam,
          supervisorTeamUuid: team.supervisorTeamUuid,
          supervisorIdentifier: team.supervisorIdentifier,
          location: {
            uuid: team.location ? team.location.uuid : '',
            display: team.location ? team.location.display : '',
            name: team.location ? team.location.name : '',
          },
          members: team.members,
          locationName: team.location ? team.location.display : '',
          teamMembers: this.teamMembers
            .filter(member => member.team ? member.team.uuid === team.uuid : false)
            .map((member: any) => ({
              display: member.display,
              identifier: member.identifier,
              id: member.uuid,
              uuid: member.uuid,
              isDataProvider: member.isDataProvider,
              person: member.person,
              teamRole: member.teamRole,
              locations: member.locations.map(location => ({
                uuid: location.uuid,
                display: location.display,
                name: location.name,
                parentLocation: location.parentLocation ? {uuid: location.parentLocation.uuid, display: location.parentLocation.display} : null,
                childLocations: location.childLocations.map(child => ({
                  uuid: child.uuid,
                  display: child.display
                }))
              }))
            }))
        }));
      });
    });
  }

  add() {
    this.viewDetails = true;
    this.currentTeam = null;
    this.view_data = 'addData';
    this.smallForm = true;
    this.formTitle = 'Create new Team';
    this.tableConfigurations = {
      ...this.tableConfigurations,
      tableColumns: [
        {name: 'teamName', label: 'Name'},
        {name: 'locationName', label: 'Location'},
        {name: 'members', label: 'Members', type: 'number'},
      ]
    };
  }

  viewMore(item) {
    console.log(item);
    this.currentTeam = item;
    this.smallForm = false;
    this.viewDetails = true;
    this.view_data = 'moreDetails';
    this.formTitle = `${item.teamName}`;
  }

  onUpdate(item: Team) {
    this.currentTeam = item;
    this.view_data = 'addData';
    this.viewDetails = true;
    this.formTitle = `Update ${item.teamName}`;
    this.smallForm = true;
    this.tableConfigurations = {
      ...this.tableConfigurations,
      tableColumns: [
        {name: 'teamName', label: 'Name'},
        {name: 'locationName', label: 'Location'},
        {name: 'members', label: 'Members', type: 'number'},
      ]
    };
  }

  addMember(team) {
   this.currentTeam = team;
   this.view_data = 'addMember';
   this.viewDetails = true;
   this.smallForm = false;
   this.animationSize = 'full';
   this.formTitle = `Add Team Member to ${team.teamName}`;
  }

  onDelete(item) {
    this.tableConfigurations.deleting = {};
    this.tableConfigurations.deleting[item.id] = true;
    this.teamService.deleteTeam(item).subscribe((success) => {
      this.httpClient.showSuccess('Team Deleted Successful');
      this.tableConfigurations.deleting = {};
      this.prepareTeamWithMembers();
    }, (error) => {
      this.tableConfigurations.deleting = {};
      this.httpClient.showError('Failed to Delete Team Please Try again letter');
    });
  }

  closeForm() {
    this.viewDetails = false;
    this.view_data = '';
    this.currentTeam = null;
    this.tableConfigurations = {
      ...this.tableConfigurations,
      tableColumns: [
        {name: 'teamIdentifier', label: 'Identifier'},
        {name: 'teamName', label: 'Name'},
        {name: 'supervisor', label: 'Supervisor'},
        {name: 'locationName', label: 'Location'},
        {name: 'members', label: 'Members', type: 'number'},
      ]
    };
  }

}
