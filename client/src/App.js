import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import { Layout, Space } from "antd";
const { Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout style={{backgroundColor: "white"}}>
          <Navbar />
          <Routes>
            <Route exact path="/" Component={Home}></Route>
          </Routes>
          <Footer>Footer</Footer>
        </Layout>
      </Space>
    </BrowserRouter>
  );
}

export default App;
