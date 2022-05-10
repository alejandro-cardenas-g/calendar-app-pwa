import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { eventPurge } from '../../actions/calendar';

export const Navbar = () => {

    const dispatch = useDispatch();
    
    const {name} = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(eventPurge());
        dispatch(startLogout());
    }

    return (
        <div className="navbar navbar-dark bg-dark px-3 mb-3">

            <span className="navbar-brand">
                {name}    
            </span>

            <button className="btn btn-outline-danger"
                onClick={handleLogout}
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>


        </div>
    )
}
