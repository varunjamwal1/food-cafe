import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import store from "./redux/store";

import { SnackbarProvider } from "notistack";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

/* React Query Client */
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>

      <QueryClientProvider client={queryClient}>
        <SnackbarProvider autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          
          <App />

        </SnackbarProvider>
      </QueryClientProvider>

    </Provider>
  </StrictMode>
);
