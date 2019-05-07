export interface Location {
  uuid: string;
  name: string;
  display: string;
  description: string;
  links: Array<any>;
  tags: Array<any>;
  parentLocation: any;
  childLocations: Array<any>;
  confirmDelete: false;
}
