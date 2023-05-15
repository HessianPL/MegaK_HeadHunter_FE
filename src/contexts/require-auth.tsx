import {ReactElement, useContext} from "react";
import {UserContext} from "./user-context";
import LoginView from "../views/LoginView";
import {NotFoundView} from "../views/NotFoundView";

interface Props {
    children: ReactElement,
    accessBy: string,
}

export const RequireAuth = ({children, accessBy} : Props) => {
    const auth = useContext(UserContext);
    const authFromCookie = JSON.parse(localStorage.getItem("cookieUser") || "[{}]");
    let role = auth.role;
    if (typeof role === "undefined")
         role = authFromCookie.role;
         if ( !role)
            return <NotFoundView/>

    if (auth.role === "Admin" )
        return <>
            {children}
        </>
    else {
        return ( auth.role === accessBy )
            ? <>
                {children}
            </>
            : <NotFoundView/>
    }
}
