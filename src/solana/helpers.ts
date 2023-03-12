import { UtilityAction } from "../interface/derug.interface";

export const mapUtilityAction = (action: UtilityAction) => {
  switch (action) {
    case UtilityAction.Add: {
      return { add: {} };
    }
    case UtilityAction.Remove: {
      return { remove: {} };
    }
    default:
      throw new Error("Not implemented");
  }
};
