import {TeamMember} from './team-member';

export interface Team {
  id: string;
  uuid: string;
  display: string;
  teamName: string;
  teamIdentifier: string;
  supervisor: string;
  supervisorUuid: string;
  supervisorTeam: string;
  supervisorTeamUuid: string;
  supervisorIdentifier: string;
  location: {
    uuid: string;
    display: string;
    name: string;
  };
  members: number;
  locationName: string;
  teamMembers: TeamMember[];
}

