import { ThemeOptions, Theme } from "@material-ui/core/styles/createMuiTheme";

declare module "@material-ui/core/styles/createMuiTheme" {
  export interface ThemeOptions {
    colors?: {
      main?: string;
    };
  }

  export interface Theme {
    colors: {
      main: string;
    };
  }
}
