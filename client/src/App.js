import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useEffect } from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Home from "./views/Home";
import Navbar from "./components/Navbar/Navbar";
import { Layout, Space } from "antd";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import store from "./redux/store";
import Login from "./views/Login";
import Register from "./views/Register";
import PageNotFound from "./views/Page404";
import Courses from "./views/Courses";
import setAuthToken from "./helpers/authToken";
import { refreshJwt, verifUser } from "./redux/auth/authActions";
import decode from "jwt-decode";

import UserRoute from "./helpers/routes/UserRoute";
import AdminRoute from "./helpers/routes/AdminRoute";
import Profile from "./views/Profile";
import AdminView from "./views/AdminView";
import StudentLife from "./views/StudentLife";
import About from "./views/About";
import CourseFR from "./views/courses/CourseFR";
import CourseTN from "./views/courses/CourseTN";
import CourseLB from "./views/courses/CourseLB";
import CourseAR from "./views/courses/CourseAR";
import CourseEN from "./views/courses/CourseEN";
import Subscription from "./views/Subscription";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { ServerURL } from "./helpers/urls";

function App() {
  if (localStorage.accessToken) {
    setAuthToken(localStorage.accessToken);
    store.dispatch(verifUser());
  }

  useEffect(() => {
    console.log("app");
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const refreshToken = localStorage.getItem("refreshToken");
      const decodedToken = decode(accessToken);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        store.dispatch(refreshJwt({ refreshToken }));
        window.location.reload();
      }
    }
  }, []);

  const { PK } = axios
    .get(`${ServerURL}/api/subscription/config`)
    .then((r) => r, console.log("$$$"));
  const stripePromise = loadStripe(`${PK}`);

  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <ToastContainer position="bottom-right" />
          <HelmetProvider>
            <Space
              direction="vertical"
              style={{ width: "100%" }}
              size={[0, 48]}
            >
              <Layout style={{ backgroundColor: "white" }}>
                <Navbar />
                <Routes>
                  <Route exact path="/" Component={Home}></Route>
                  <Route exact path="*" Component={PageNotFound}></Route>
                  <Route exact path="/login" Component={Login}></Route>
                  <Route exact path="/register" Component={Register}></Route>
                  <Route
                    exact
                    path="/student-life"
                    Component={StudentLife}
                  ></Route>
                  <Route exact path="/about" Component={About}></Route>

                  <Route
                    exact
                    path="/language-courses"
                    Component={Courses}
                  ></Route>
                  <Route
                    exact
                    path="/language-courses/learn-arabic"
                    Component={CourseAR}
                  ></Route>
                  <Route
                    exact
                    path="/language-courses/learn-tunisian-arabic"
                    Component={CourseTN}
                  ></Route>
                  <Route
                    exact
                    path="/language-courses/learn-libyan-arabic"
                    Component={CourseLB}
                  ></Route>
                  <Route
                    exact
                    path="/language-courses/learn-french"
                    Component={CourseFR}
                  ></Route>
                  <Route
                    exact
                    path="/language-courses/learn-english"
                    Component={CourseEN}
                  ></Route>

                  <Route exact path="/profil" element={<UserRoute />}>
                    <Route exact path="/profil" Component={Profile}></Route>
                  </Route>

                  <Route exact path="/subscription" element={<UserRoute />}>
                    <Route
                      exact
                      path="/subscription"
                      Component={Subscription}
                    ></Route>
                  </Route>

                  <Route exact path="/admin-dashboard" element={<AdminRoute />}>
                    <Route
                      exact
                      path="/admin-dashboard"
                      Component={AdminView}
                    ></Route>
                  </Route>
                </Routes>
              </Layout>
            </Space>
          </HelmetProvider>
        </BrowserRouter>
      </Elements>
    </Provider>
  );
}

library.add(fab, fas, far);
export default App;
