export interface LaunchType {
    patch: string | null,
    smallPatch: string | null,
    name: string,
    rocket: string,
    details: string | null
}

export interface StateType {
    currentLaunch: LaunchType,
    showModal: boolean,
    launches: LaunchType[],
    isLoading: boolean
}


export type ReducerActionType =
  | { type: 'setShowModal'; payload: boolean }
  | { type: 'setCurrentLaunch'; payload: LaunchType | null }
  | { type: 'setLaunches'; payload: LaunchType[] }
  | { type: 'setIsLoading'; payload: boolean };

export interface ServerLaunchResponse {
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch: string | null;
    mission_patch_small: string | null;
  };
  details: string | null;
}