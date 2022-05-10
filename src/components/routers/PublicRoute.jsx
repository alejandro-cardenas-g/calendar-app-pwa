import { Redirect } from "react-router-dom";

export const PublicRoute = ({children, isAuth}) => {
    return (
        
        (isAuth)
        ? <Redirect to="/"/>
        : children

    )
}
