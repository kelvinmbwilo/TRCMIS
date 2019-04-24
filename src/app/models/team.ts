export interface Team {
  uuid: string;
  identifier: string;
  teamName: string;
  voiced: string;
  location: string;
  supervisor: string;
  owns_team: string;
  reported_to: string;
  reported_by: string;
  members: string;
  confirmDelete: boolean;
}

