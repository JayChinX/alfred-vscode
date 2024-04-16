export declare function getRecentProjects(): Promise<RecentProjects>;
export declare type RecentProjects = RecentProject[];
export interface RecentProject {
  path: string;
  name: string;
  isFile: boolean?;
  frameTitle?: string;
  workspaceId?: string;
  activationTimestamp?: number;
  buildTimestamp?: number;
  projectOpenTimestamp?: number;
  frame?: RecentProjectFrame;
}
export interface RecentProjectFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  extendedState: number;
}
