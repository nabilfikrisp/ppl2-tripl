import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Explore from "./routes/Explore";
import AboutUs from "./routes/AboutUs";
import Faq from "./routes/Faq";
import ExploreDetail from "./routes/ExploreDetail";
import Planner from "./routes/Planner";
import SavePlanDetail from "./components/forms/SavePlanDetail";
import Cookies from "js-cookie";
import { useAuth } from "./hooks/useAuth";
import IsLoggedIn from "./middleware/IsLoggedIn";
import IsNotLoggedIn from "./middleware/IsNotLoggedIn";
import { LocationsContextProvider } from "./context/LocationsContext";
import { ModalProvider } from "./context/ModalContext";
import PlanDetail from "./routes/PlanDetail";
import MyProfile from "./routes/MyProfile";
import ForgotPassword from "./routes/ForgotPassword";
import ResetPassword from "./routes/ResetPassword";
import Unknown404 from "./components/404";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<Unknown404 />}>
      {/* WITH LAYOUT */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="faq" element={<Faq />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route element={<IsNotLoggedIn />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset/:token" element={<ResetPassword />} />
        </Route>
        <Route path="explore">
          <Route index element={<Explore />} />
          <Route path=":id" element={<ExploreDetail />} />
        </Route>
        <Route path="planner">
          <Route element={<IsLoggedIn />}>
            <Route index element={<Planner />} />
            <Route path=":id" element={<PlanDetail />} />
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
