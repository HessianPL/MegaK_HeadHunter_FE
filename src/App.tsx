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
import {StudentProfileForHR} from "./components/recruiter/StudentProfileForHR";

function App() {
    const [id, setId] = useState('');
    const [role, setRole] = useState(undefined);
    const user = useContext(UserContext);

  return (
    <>
      <ToastContainer theme="colored"/>
      <UserContext.Provider value={{id, setId, role, setRole}}>
        <Routes>
            <Route path="/" element={<LoginView/>}/>
            <Route path="/login" element={<LoginView/>}/>
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
              path="/recruiter"
              element={
                 <RequireAuth accessBy="HR">
                     <RecruiterView/>
                 </RequireAuth>
                      }
          />
            <Route
                path="/recruiter/studentCV/:idStudent"
                element={
                    <RequireAuth accessBy="HR">
                        <StudentProfileForHR/>
                    </RequireAuth>
                }
            />
            <Route path="/*" element={<NotFoundView/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
