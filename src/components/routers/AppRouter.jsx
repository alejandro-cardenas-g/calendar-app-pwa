import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { startChecking } from "../../actions/auth"
import { LoginScreen } from "../auth/LoginScreen"
import { CalendarScreen } from "../calendar/CalendarScreen"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector( state => state.auth );
    
    useEffect(() => {

        dispatch(startChecking());
        
    }, [dispatch])

    if(checking) {
        return (<h5>Espere...</h5>);
    }

    return (

        <BrowserRouter>

            <Switch>

                <Route exact path="/">
                    <PrivateRoute 
                        isAuth={ !!uid }
                    >
                        <CalendarScreen />
                    </PrivateRoute>
                </Route>

                <Route exact path="/login">
                    <PublicRoute
                        isAuth={!!uid}
                    >
                        <LoginScreen/>
                    </PublicRoute>
                </Route>

                <Redirect to="/"/>


            </Switch>

        </BrowserRouter>
    )
}
