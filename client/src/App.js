import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { Layout, Space } from "antd";

function App() {
  return (
    <BrowserRouter>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout style={{backgroundColor: "white"}}>
          <Navbar />
          <Routes>
            <Route exact path="/" Component={Home}></Route>
            <Route exact path="/language-courses"></Route>
            <Route exact path="/student-life"></Route>
            <Route exact path="/about"></Route>
          </Routes>
          <Footer/>
        </Layout>
      </Space>
    </BrowserRouter>
  );
}

export default App;
