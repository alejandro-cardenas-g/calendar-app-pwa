import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { setActive, eventStartLoading } from '../../../actions/calendar';
import { act } from '@testing-library/react';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {
        uid: 1231,
        name: "dasda",
    },
    calendar: {
        events: [],
        activeEvent: null
    },
    ui:{
        modalOpen: false
    }
};

let store = mockStore(initialState);

store.dispatch = jest.fn();

// jest.mock('../../../actions/calendar', () => ({
//     eventStartDeleting: jest.fn()
// }));

jest.mock('../../../actions/calendar', () => ({
    setActive: jest.fn(),
    eventStartLoading: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
)

describe('Pruebas en CalendarScreen', () => { 

    test('Debe mostrarse correctamente', () =>{

        expect(wrapper).toMatchSnapshot();

    });

    test('Pruebas con las interacciones del calendario', () => {

        const calendar = wrapper.find('Calendar');

        const cmensajes = calendar.prop('messages');

        expect(cmensajes).toEqual(messages);

        calendar.prop('onDoubleClickEvent')();
        
        expect( store.dispatch ).toHaveBeenCalledWith({type: types.uiOpenModal});
        
        calendar.prop('onSelectEvent')({
            start: 'hola'
        });

        expect( setActive ).toHaveBeenCalledWith({start: 'hola'})


        act(() => {

            calendar.prop('onView')('week');

            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');

        });


    });

});