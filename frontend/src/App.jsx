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
import { useAuth } from "./components/hooks/useAuth";
import IsLoggedIn from "./components/middleware/IsLoggedIn";

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
        <Route element={<IsLoggedIn />}>
          <Route index element={<Planner />} />
          <Route path="create" element={<SavePlanDetail />} />
        </Route>
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
  return <RouterProvider router={router} />;
};

export default App;
