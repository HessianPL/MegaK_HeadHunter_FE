import React, { useState } from "react";
import './App.css';
import { ToastContainer} from 'react-toastify';
import { Route, Routes } from "react-router-dom";
import { AdminView } from "./views/AdminView";
import { StudentView } from "./views/StudentView";
import { RecruiterView } from "./views/RecruiterView";
import LoginView from "./views/LoginView";
import ForgottenPasswordView from './views/ForgottenPasswordView';
import { UserContext } from "./contexts/user-context";
import {RequireAuth} from "./contexts/RequireAuth";

function App() {
    const [id, setId] = useState('');
    const [role, setRole] = useState(undefined);

  return (
    <>
      <ToastContainer theme="colored"/>
      <UserContext.Provider value={{id, setId, role, setRole}}>
        <Routes>
          <Route path="/login" element={<LoginView/>}/>
            <Route
                path="/admin"
                element={
                    <RequireAuth accessBy = "Admin">
                        <AdminView/>
                    </RequireAuth>
                }
            />
          <Route
              path="/student"
              element={
                  <RequireAuth accessBy="Student">
                      <StudentView/>
                  </RequireAuth>
              }
          />
          <Route path="/recruiter" element={<RecruiterView/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
