import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./global.css";
import theme from "./theme.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import { AuthContextProvider } from "./context/Auth.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import { GOOGLE_CLIENT_ID } from "./helper/config.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
