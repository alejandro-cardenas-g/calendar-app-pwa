import { Redirect } from "react-router-dom";

export const PrivateRoute = ({children, isAuth}) => {
    return (
        
        (isAuth)
        ? children
        : <Redirect to="/login"/>

    )
}
