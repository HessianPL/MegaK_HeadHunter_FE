import React, {useContext, useState} from "react";
import './App.css';
import { ToastContainer} from 'react-toastify';
import { Route, Routes } from "react-router-dom";
import { AdminView } from "./views/AdminView";
import { StudentView } from "./views/StudentView";
import { RecruiterView } from "./views/RecruiterView";
import LoginView from "./views/LoginView";
import { UserContext } from "./contexts/user-context";
import {NotFoundView} from "./views/NotFoundView";
import {RequireAuth} from "./contexts/require-auth";
import { ResetPasswordView } from "./views/ResetPasswordView";
import SignupView from "./views/SignupView";
import ForgottenPasswordView from "./views/ForgottenPasswordView";
import { EditStudentView } from "./views/EditStudentView";

function App() {
    const [id, setId] = useState('');
    const [role, setRole] = useState(undefined);
    const user = useContext(UserContext);

  return (
    <>
      <ToastContainer theme="dark"/>
      <UserContext.Provider value={{id, setId, role, setRole}}>
        <Routes>
            <Route path="/*" element={<NotFoundView/>}/>
            <Route path="/login" element={<LoginView/>}/>
            <Route path="/forgotten-password" element={<ForgottenPasswordView/>}/>
            <Route path="/register/:id/:registerToken" element={<SignupView/>}/>
            <Route path="/new-password/:id/:registerToken" element={<ResetPasswordView/>}/>

            <Route
                path="/admin"
                element={
                    <RequireAuth accessBy="Admin">
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
            <Route
                path="/student/edit"
                element={
                    <RequireAuth accessBy="Student">
                        <EditStudentView/>
                    </RequireAuth>
                }
            />

          <Route
              path="/recruiter"
              element={
                  <RequireAuth accessBy="HR">
                     <RecruiterView/>
                  </RequireAuth>
                      }
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
