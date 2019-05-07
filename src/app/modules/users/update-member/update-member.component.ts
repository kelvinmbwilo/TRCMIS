import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TeamMember} from '../../../models/team-member';
import {Team} from '../../../models/team';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../../services/team.service';
import {HttpClientService} from '../../../services/http-client.service';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.scss']
})
export class UpdateMemberComponent implements OnInit {

  orgunit: any = null;
  orgunitnames: string = '';
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
  startingOu: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    public dialogRef: MatDialogRef<UpdateMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { member: TeamMember, team: Team, teamRoles: any[] },
    private http: HttpClientService
  ) {
  }

  ngOnInit() {
    this.teamMemberForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      familyName: [''],
      gender: ['', Validators.required],
      age: [''],
      team: [''],
      teamRole: [''],
      assignedLocation: [''],
      isProvider: ['']
    });
    if (this.data.team) {
      this.teamMemberForm.patchValue({
        team: this.data.team.uuid
      });
    }
    if (this.data.member) {
      this.teamMemberForm.patchValue({
        firstName: this.data.member.person.names
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
    this.loading = true;

    const teamMember = {
      person: {uuid: this.data.member.person.uuid},
      teamRole: formData.teamRole,
      locations: [
        {uuid: formData.assignedLocation}
      ],
      team: {uuid: this.data.team.uuid},
      isDataProvider: true,
      identifier: this.data.member.identifier
    };

    this.teamService.createTeamMember(teamMember).subscribe((teamMemberResponse) => {
      console.log(teamMemberResponse);
      this.loading = false;
      this.http.showSuccess('Team member has been updated successful');
    }, (teamMemberError) => {
    });
  }

}
