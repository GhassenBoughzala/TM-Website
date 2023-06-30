import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./views/Home";
import Navbar from "./components/Navbar/Navbar";
import { Layout, Space } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./views/Login";
import Register from "./views/Register";
import PageNotFound from "./views/Page404";
import Courses from "./views/Courses";

function App() {
  return (
    <Provider store={store}>
<BrowserRouter>
          <ToastContainer position="bottom-right" />
          <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
            <Layout style={{ backgroundColor: "white" }}>
              <Navbar />
              <Routes>
                <Route exact path="/" Component={Home}></Route>
                <Route exact path="*" Component={PageNotFound}></Route>
                <Route exact path="/login" Component={Login}></Route>
                <Route exact path="/register" Component={Register}></Route>
                <Route exact path="/language-courses" Component={Courses}></Route>
                <Route exact path="/student-life"></Route>
                <Route exact path="/about"></Route>
              </Routes>
            </Layout>
          </Space>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
