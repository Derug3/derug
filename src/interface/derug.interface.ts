export interface IUtilityData {
  title: string;
  description: string;
  action: UtilityAction;
}

export enum UtilityAction {
  Add,
  Remove,
}
