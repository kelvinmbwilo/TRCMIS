import {Person} from './person';

export interface TeamMember {
  id: string;
  display: string;
  identifier: string;
  uuid: string;
  isDataProvider: string;
  person: Person;
  teamRole: string;
  locations: any;
  team?: any;
}
