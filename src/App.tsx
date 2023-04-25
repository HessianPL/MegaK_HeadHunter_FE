import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { LoginView } from "./components/views/LoginView";
import { AdminView } from "./components/views/AdminView";
import { StudentView } from "./components/views/StudentView";
import { RecruiterView } from "./components/views/RecruiterView";

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
