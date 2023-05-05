import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "./user-context";

export const RequireAuth = ({children, accessBy}) => {
  const auth = useContext(UserContext);

  if (auth.role === "Admin")
    return children
  else {
    return ( auth.role === accessBy )
        ? children
        : <Navigate to="/login" ></Navigate>;
  }

}
