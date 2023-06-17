import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import './components/Navbar.css';
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home}></Route>
        <Route exact path="/home" Component={Home}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
