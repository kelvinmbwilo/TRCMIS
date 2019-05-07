import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../../models/team';
import {fadeIn} from '../../../shared/animations/router-animation';
import {TeamService} from '../../../services/team.service';
import {HttpClientService} from '../../../services/http-client.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
  animations: [fadeIn]
})
export class AddTeamComponent implements OnInit {
  orgunit: any = null;
  orgunitnames: string = '';
  @Input() team: Team;
  @Output() close = new EventEmitter();
  @Output() saved = new EventEmitter();
  current_orgunits = [];
  @Input() orgunit_tree_config: any = {
    show_search : true,
    search_text : 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Organisation units...',
    multiple: true,
    multiple_key: 'control', // can be control or shift
    placeholder: 'Select Location'
  };
  teamName: string;
  teamIdentifier: string;
  startingLocation: string;
  loading: boolean = false;
  constructor(
    private teamService: TeamService,
    private http: HttpClientService
  ) { }

  ngOnInit() {
    if (this.team) {
      this.teamName = this.team.teamName;
      this.teamIdentifier = this.team.teamIdentifier;
      this.startingLocation = this.team.location.uuid;
      this.current_orgunits = [this.startingLocation];
    }
  }

  changeOrgUnit(orgunit) {
    this.orgunit = orgunit;
    this.orgunitnames = orgunit.items.map(d => d.name).join(', ');
  }

  closeForm() {
    this.close.emit();
  }

  save() {
    this.loading = true;
    const team = {
      teamName: this.teamName,
      teamIdentifier: this.teamIdentifier,
      location: this.orgunit.value
    };
    let resItems$;
    if (this.team) {
      resItems$ = this.teamService.updateTeam(team, this.team.uuid);
    } else {
      resItems$ = this.teamService.createTeam(team);
    }

    resItems$.subscribe((success) => {
      this.loading = false;
      this.saved.emit();
      this.closeForm();
      this.http.showSuccess('Team Created Successful');
    }, (error) => {
      this.loading = false;
      this.http.showError('Failed to Create Team please try again');
    });
  }


}
