 
export interface AppState {
    locale: string;
    themeMode: 'light' | 'dark';
  }
  
  export type AppAction =
    | { type: 'SET_LOCALE'; payload: string }
    | { type: 'SET_THEME'; payload: 'light' | 'dark' };
  