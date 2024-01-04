import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignIn from "./components/authentifications/SignIn";
import SignUp from "./components/authentifications/SignUp";
import EditMode from "./components/appModes/EditMode";
import PrincipalView from './components/appModes/PrincipalView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path={"/"} element={<SignUp />} />
            <Route path={"/signin"} element={<SignIn />} />
            <Route path={"/edit"} element={<EditMode />} />
            <Route path={"/principalview"} element={<PrincipalView />} />
        </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();