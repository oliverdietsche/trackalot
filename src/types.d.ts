export interface ITrackEntry {
  id: string;
  name: string;
  logs: ILog[];
}

export interface ILog {
  id: string;
  name: string;
  entries: ILogEntry[];
}

export interface ILogEntry {
  start: Date;
  /**
   * Duration in seconds
   */
  duration: number;
}
