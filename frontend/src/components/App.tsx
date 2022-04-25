import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { indigo } from "@material-ui/core/colors";

const queryClient = new QueryClient();

const theme = createTheme({
  // @ts-expect-error
  colors: {
    main: indigo[500],
  },
});

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <div></div>
        </QueryClientProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </React.Fragment>
  );
}
