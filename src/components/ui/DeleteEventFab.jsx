import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDeleting } from '../../actions/calendar';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {

        dispatch(eventStartDeleting());

    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
        >
            <i className="fas fa-trash"></i>
            <span> Eliminar</span>
        </button>
    )
}
