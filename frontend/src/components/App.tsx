import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { indigo } from "@material-ui/core/colors";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InventoryPage from "../pages/InventoryPage";
import CustomerPage from "../pages/CustomerPage";
import OrderPage from "../pages/OrderPage";
import InvoicePage from "../pages/InvoicePage";

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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<InventoryPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/invoice" element={<InvoicePage />} />
              <Route path="/orders" element={<OrderPage />} />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
