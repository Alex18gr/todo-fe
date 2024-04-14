export interface NavItemModel {
  label: string;
  icon?: string;
  path: any[];
  action: () => void;
}
