import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./routes/Home";
import Test from "./routes/Test";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Explore from "./routes/Explore";
import ExploreDetail from "./routes/ExploreDetail";
import Planner from "./routes/Planner";
import SavePlanDetail from "./components/forms/SavePlanDetail";
import Cookies from "js-cookie";
import { useAuth } from "./hooks/useAuth";
import IsLoggedIn from "./middleware/IsLoggedIn";
import IsNotLoggedIn from "./middleware/IsNotLoggedIn";
import { LocationsContextProvider } from "./context/LocationsContext";
import { ModalProvider } from "./context/ModalContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* WITH LAYOUT */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Test />} />
        <Route element={<IsNotLoggedIn />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="explore">
          <Route index element={<Explore />} />
          <Route path=":id" element={<ExploreDetail />} />
        </Route>
        <Route path="planner">
          <Route element={<IsLoggedIn />}>
            <Route index element={<Planner />} />
          </Route>
        </Route>
      </Route>
      {/* NO LAYOUT */}
      <Route element={<IsLoggedIn />}>
        <Route path="planner/create" element={<SavePlanDetail />} />
      </Route>
    </Route>
  )
);

const App = () => {
  const { login } = useAuth();
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      login(JSON.parse(storedUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <LocationsContextProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </LocationsContextProvider>
  );
};

export default App;
