import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fadeIn} from '../../../shared/animations/router-animation';
import {Team} from '../../../models/team';
import {UserService} from '../../../services/user.service';
import {TeamService} from '../../../services/team.service';
import {HttpClientService} from '../../../services/http-client.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
  animations: [fadeIn]
})
export class AddMemberComponent implements OnInit {
  orgunit: any = null;
  orgunitnames: string = '';
  @Input() roles: any[];
  @Input() team: Team;
  @Input() teamRoles: any[];
  @Output() close = new EventEmitter();
  @Output() saved = new EventEmitter();
  teamMemberForm: FormGroup;
  orgunit_tree_config: any = {
    show_search: true,
    search_text: 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Organisation units...',
    multiple: true,
    multiple_key: 'control', // can be control or shift
    placeholder: 'Assigned Location'
  };
  loading: boolean = false;
  private personObject: any;
  private userObject: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private teamService: TeamService,
    private http: HttpClientService
  ) {
  }

  ngOnInit() {
    this.teamMemberForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      familyName: [''],
      gender: ['', Validators.required],
      age: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      roles: [[], Validators.required],
      team: [''],
      teamRole: [''],
      assignedLocation: [''],
      isProvider: ['']
    });
    if (this.team) {
      this.teamMemberForm.patchValue({
        team: this.team.uuid
      });
    }
  }

  changeOrgUnit(orgunit) {
    this.orgunit = orgunit;
    this.teamMemberForm.patchValue({
      assignedLocation: orgunit.value
    });
    this.orgunitnames = orgunit.items.map(d => d.name).join(', ');
  }

  closeForm() {
    this.close.emit();
  }

  save() {
    const formData = this.teamMemberForm.value;
    const person = {
      names: [
        {
          givenName: formData.firstName,
          familyName: formData.familyName
        }
      ],
      gender: formData.gender,
      age: formData.age
    };
    const userObject = {
      password: formData.password,
      person,
      roles: this.roles.filter(role => formData.roles.indexOf(role.uuid) !== -1),
      username: formData.username
    };
    this.loading = true;
    this.userService.createUser(userObject).subscribe((userResponse) => {
      this.userObject = userResponse;

      const teamMember = {
        person: { uuid: this.userObject.person.uuid},
        teamRole: formData.teamRole,
        locations: [
          {uuid: formData.assignedLocation}
        ],
        team: {uuid: this.team.uuid},
        isDataProvider: true,
        identifier: this.userObject.person.uuid
      };

      this.teamService.createTeamMember(teamMember).subscribe((teamMemberResponse) => {
        console.log(teamMemberResponse);
        this.loading = false;
        this.saved.emit();
        this.close.emit();
        this.http.showSuccess('Team member has been created successful');
      }, (teamMemberError) => {
      });
    }, (userError) => {
    });
  }

}
