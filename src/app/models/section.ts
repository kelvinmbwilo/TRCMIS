export interface Section {
  id: string;
  name: string;
  categories: string[];
  items: {
    id: string;
    name: string;
    dataElements: string[];
  }[];
  categoryItems?: any;
}
