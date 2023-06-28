import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./views/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { Layout, Space } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";

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
              <Route exact path="/language-courses"></Route>
              <Route exact path="/student-life"></Route>
              <Route exact path="/about"></Route>
            </Routes>
            <Footer />
          </Layout>
        </Space>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
