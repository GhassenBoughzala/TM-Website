import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/style.css";
import "./assets/css/antd-style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fonts/Averia_Serif_Libre/AveriaSerifLibre-Regular.ttf"
import 'react-toastify/dist/ReactToastify.css';
import './i18nextConf';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
