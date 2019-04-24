export interface Location {
  uuid: string;
  name: string;
  display: string;
  links: Array<Object>;
  tags: Array<Object>;
  parentLocation: Object;
  childLocations: Array<Object>;
  confirmDelete: false;
}
