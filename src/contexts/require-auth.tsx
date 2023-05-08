import {ReactElement, useContext} from "react";
import {UserContext} from "./user-context";
import LoginView from "../views/LoginView";

interface Props {
    children: ReactElement,
    accessBy: string,
}

export const RequireAuth = ({children, accessBy} : Props) => {
    const auth = useContext(UserContext);

    if (auth.role === "Admin")
        return <>
            {children}
        </>
    else {
        return ( auth.role === accessBy )
            ? <>
                {children}
            </>
            : <LoginView/>
    }

}
