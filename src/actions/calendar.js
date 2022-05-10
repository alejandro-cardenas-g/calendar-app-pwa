import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const startAddNew = (event) => {
    return async(dispatch, getState) => {

        try{

            const { name } = getState().auth;

            const res = await fetchConToken('events', event, 'POST');

            const body = await res.json();

            if(body.ok){
                dispatch(eventAddNew({
                    ...event, 
                    id: body.evento.id,
                    user: {
                        _id: body.evento.user,
                        name
                    }
                }));
            }else{

                Swal.fire('Error', body.msg, 'error');

            }

        }catch(error){
            
            Swal.fire('Error', 'Ocurrió un error al intentar guardar el evento', 'error');

        }

    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const setActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const setInactive = () => ({
    type: types.eventSetInactive
});

export const eventStartUpdate = (evento) => {

    return async(dispatch, getState) => {

        const { activeEvent } = getState().calendar;

        const {name} = getState().auth;

        try {
            
            const res = await fetchConToken(`events/${activeEvent.id}`, evento, 'PUT');
            const body = await res.json();

            if(body.ok){

                dispatch(updateEvent( body.evento.id ,{
                    ...evento,
                    id: body.evento.id,
                    user: {
                        _id: body.evento.user,
                        name
                    }
                }));

            }else{

                return Swal.fire('Error', body.msg, 'error');

            }

        } catch (error) {
            
            return Swal.fire('Error', 'error al actualizar el evento', 'error');

        }
    
    }

}

const updateEvent = (id, event) => ({
    type: types.eventUpdate,
    payload: {
        id,
        event
    }
});

export const eventStartDeleting = () => {

    return async(dispatch, getState) => {

        const {activeEvent} = getState().calendar;

        try {
        
            const res = await fetchConToken(`events/${activeEvent.id}`, [], 'DELETE');
            
            const body = await res.json();

            if(body.ok){
                dispatch(DeleteEvent());
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            Swal.fire('Error', 'Ocurrió un problema al eliminar el evento. Intente de nuevo.', 'error')
        }

    }

}

const DeleteEvent = () => ({
    type: types.eventDelete,
});

export const eventStartLoading = () => {

    return async(dispatch) => {

        try {

            const res = await fetchConToken('events');
            const body = await res.json();
            
            const events = prepareEvents(body.eventos);

            dispatch(eventLoader(events));

        } catch (error) {
            
            Swal.fire('Error', 'Error al cargar eventos. Intente de nuevo','error' );

        }


    }

}

const eventLoader = (eventos) => ({
    type: types.eventLoaded,
    payload: eventos
})

export const eventPurge = () => ({
    type: types.eventPurge
});