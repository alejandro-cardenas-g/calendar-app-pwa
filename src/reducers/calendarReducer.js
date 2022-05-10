import { types } from "../types/types";

// const initialState = {
//     events: [{
//         title: 'Cumpleaños del jefe',
//         start: moment().toDate(),
//         end:  moment().add(2, 'hours').toDate(),
//         notes: 'Comprar el pastel',
//         user: {
//             _id: '123',
//             name: 'Andrés'
//         },
//         id: 23131231312111
//     }],
//     activeEvent: null
// }

const initialState = {
        events: [],
        activeEvent: null
    }

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            };

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };

        case types.eventSetInactive:
            return{
                ...state,
                activeEvent: null
            };

        case types.eventUpdate:
            return{
                ...state,
                events: state.events.map(
                    event => (action.payload.id === event.id) 
                    ?   action.payload.event
                    :   event
                )
            };

        case types.eventDelete:
            return{
                ...state,
                events: state.events.filter(
                    event => (state.activeEvent.id !== event.id) 
                ),
                activeEvent: null
            };

        case types.eventLoaded:
            return{
                ...state,
                events: [...action.payload]
            };

        case types.eventPurge:
            return{
                ...initialState
            }
    
        default:
            return state;
    }

};