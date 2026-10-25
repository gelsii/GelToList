import React from "react";
import { Routes, Route } from "react-router";
import RootLayout from "./layouts/RootLayout";
import TabsNavsComponent from "./components/ui/TabsNavsComponent";
import Signin from "./auth/components/Signin";
import HomeLayout from "./layouts/HomeLayout";
import Signup from "./auth/components/Signup";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AuthLayout />}>
          <Route index element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<HomeLayout />}>
          <Route path="/todoList" element={<TabsNavsComponent />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
