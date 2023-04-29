import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { AdminView } from "./views/AdminView";
import { StudentView } from "./views/StudentView";
import { RecruiterView } from "./views/RecruiterView";
import LoginView from "./views/LoginView";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView/>}/>
      <Route path="/admin" element={<AdminView/>}/>
      <Route path="/student" element={<StudentView/>}/>
      <Route path="/recruiter" element={<RecruiterView/>}/>
    </Routes>
  );
}

export default App;
