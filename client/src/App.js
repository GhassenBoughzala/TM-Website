/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useEffect, lazy, Suspense } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Layout, Space } from "antd";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import setAuthToken from "./helpers/authToken";
import { refreshJwt, verifUser } from "./redux/auth/authActions";
import decode from "jwt-decode";
import store from "./redux/store";

import UserRoute from "./helpers/routes/UserRoute";
import AdminRoute from "./helpers/routes/AdminRoute";

import Profile from "./views/Profile";
import AdminView from "./views/AdminView";
import SubscriptionResult from "./views/SubscriptionResult";
import PaymentResult from "./views/PaymentResult";
import ScrollToTop from "./helpers/scrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader";

const ContactUs = lazy(() => import('./views/ContactUs'));
const Home = lazy(() => import('./views/Home'));
const PageNotFound = lazy(() => import('./views/Page404'));
const StudentLife = lazy(() => import('./views/StudentLife'));
const About = lazy(() => import('./views/About'));
const Scholarships = lazy(() => import('./views/Scholarships'));
const Login = lazy(() => import('./views/Login'));
const Register = lazy(() => import('./views/Register'));
const Courses = lazy(() => import('./views/Courses'));
const CourseFR = lazy(() => import('./views/courses/CourseFR'));
const CourseTN = lazy(() => import('./views/courses/CourseTN'));
const CourseLB = lazy(() => import('./views/courses/CourseLB'));
const CourseAR = lazy(() => import('./views/courses/CourseAR'));
const CourseEN = lazy(() => import('./views/courses/CourseEN'));

function App() {
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

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

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer position="bottom-right" />
        <HelmetProvider>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Layout style={{ backgroundColor: "white" }}>
              <Navbar />
              <Routes>

                <Route exact path="/" element={<Suspense fallback={<Loader/>}> <Home/></Suspense>}/>
                <Route exact path="*" element={<Suspense fallback={<Loader/>}> <PageNotFound/></Suspense>}/>
                <Route exact path="/student-life" element={<Suspense fallback={<Loader/>}> <StudentLife/></Suspense>}/>
                <Route exact path="/about" element={<Suspense fallback={<Loader/>}> <About/></Suspense>}/>
                <Route exact path="/contact" element={<Suspense fallback={<Loader/>}> <ContactUs/></Suspense>}/>
                <Route exact path="/scholarships" element={<Suspense fallback={<Loader/>}> <Scholarships/></Suspense>}/>

                <Route exact path="/login" element={<Suspense fallback={<Loader/>}> <Login/></Suspense>}/>
                <Route exact path="/register" element={<Suspense fallback={<Loader/>}> <Register/></Suspense>}/>

                <Route exact path="/language-courses" element={<Suspense fallback={<>...</>}> <Courses/></Suspense>}/>
                <Route exact path="/learn-arabic" element={<Suspense fallback={<>...</>}> <CourseAR/></Suspense>}/>
                <Route exact path="/learn-tunisian-arabic" element={<Suspense fallback={<>...</>}> <CourseTN/></Suspense>}/>
                <Route exact path="/learn-libyan-arabic" element={<Suspense fallback={<>...</>}> <CourseLB/></Suspense>}/>
                <Route exact path="/learn-french" element={<Suspense fallback={<>...</>}> <CourseFR/></Suspense>}/>
                <Route exact path="/learn-english" element={<Suspense fallback={<>...</>}> <CourseEN/></Suspense>}/>
                
                {/* User Routes */}
                <Route exact path="/profil" element={<UserRoute />}>
                  <Route exact path="/profil" Component={Profile}></Route>
                </Route>
                <Route exact path="/subscription" element={<UserRoute />}>
                  <Route exact path="/subscription" Component={SubscriptionResult}></Route>
                </Route>
                <Route exact path="/payment-result" element={<UserRoute />}>
                  <Route exact path="/payment-result" Component={PaymentResult}></Route>
                </Route>

                {/* Admin Routes */}
                <Route exact path="/admin-dashboard" element={<AdminRoute />}>
                  <Route exact path="/admin-dashboard" Component={AdminView}></Route>
                </Route>

              </Routes>
            </Layout>
          </Space>
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  );
}

library.add(fab, fas, far);
export default App;
