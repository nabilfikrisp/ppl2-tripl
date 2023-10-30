import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Test from "./routes/Test.jsx";
import "./global.css";
import theme from "./theme.jsx";
import Home from "./routes/Home.jsx";
import SignIn from "./routes/SignIn.jsx";
import SignUp from "./routes/SignUp.jsx";
import Explore from "./routes/Explore.jsx";
import ExploreDetail from "./routes/ExploreDetail.jsx";
import Planner from "./routes/Planner.jsx";
import SavePlanDetail from "./components/forms/SavePlanDetail.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<Test />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="explore">
        <Route index element={<Explore />} />
        <Route path=":id" element={<ExploreDetail />} />
      </Route>
      <Route path="planner">
        <Route index element={<Planner />} />
        <Route path="create" element={<SavePlanDetail />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
