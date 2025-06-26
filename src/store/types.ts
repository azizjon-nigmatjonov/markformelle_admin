// Route interface for better type safety
export interface Route {
  id: string;
  name: string;
  path: string;
  component?: string;
  children?: Route[];
}


export interface AlertData {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  duration?: number;
}

export interface WebsiteState {
  routes: Record<string, Route[]>;
  new_routes: Record<string, Route[]>;
  alert: AlertData | Record<string, unknown>;
  liteTableOpen: string;
  modalType: string;
}

export interface RootState {
  auth: unknown; 
  tableSize: unknown; 
  notification: unknown;
  sidebar: unknown;
  filter: unknown;
  table: unknown;
  machine: unknown;
  globalTool: unknown;
  translation: unknown;
  website: WebsiteState;
} 