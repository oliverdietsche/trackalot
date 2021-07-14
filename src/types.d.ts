export type TTrackerList = {
  id: string;
  name: string;
}[];

export interface ITracker {
  id: string;
  name: string;
  activities: IActivity[];
  activeActivityId?: string;
}

export interface IActivity {
  id: string;
  name: string;
  logs: ILog[];
}

export interface ILog {
  /**
   * Start date and time in RFC3339 format
   */
  start: string;
  /**
   * Start date and time in RFC3339 format
   */
  end?: string;
}

export type TSvgIcon = 'play-icon' | 'cancel-icon' | 'edit-icon';
