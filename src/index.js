import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import './index.css';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
        
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
