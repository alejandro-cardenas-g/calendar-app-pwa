import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { setActive, eventStartLoading, eventStartUpdate, setInactive, startAddNew } from '../../../actions/calendar';
import { act } from '@testing-library/react';
import { CalendarModal } from '../../../components/calendar/CalendarModal';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const finish = now.clone().add(1, 'hours');

const initialState = {
    auth: {
        uid: 1231,
        name: "dasda",
    },
    calendar: {
        events: [],
        activeEvent: {
            title: 'asda',
            notes: 'dadad',
            start: now.toDate(),
            end: finish.toDate()
        }
    },
    ui:{
        modalOpen: true
    }
};

let store = mockStore(initialState);

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
)

jest.mock('../../../actions/calendar', () => ({

    eventStartUpdate: jest.fn(),
    setInactive: jest.fn(),
    startAddNew: jest.fn()

}));

describe('Pruebas en el modal', () => { 

    beforeEach(() =>{
        jest.clearAllMocks();
    });

    test('Debe de mostrar el modal', () =>{

        expect(wrapper.find('Modal').prop('isOpen')).toBeTruthy();

    });

    test('Debe de llamar la acción de actualizar y cerrar el modal', () => {

        act(() => {
            wrapper.find('form').prop('onSubmit')({
                preventDefault(){}
            });
    
        });

        expect( eventStartUpdate ).toHaveBeenCalledWith({...initialState.calendar.activeEvent});
        expect( setInactive ).toHaveBeenCalledWith();
    });

    test('Debe de mostrar error si falta el título', () => {

        act(() => {

            wrapper.find('input[name="title"]').prop('onChange')(
                {
                    target: {
                        name: 'title',
                        value: ''
                    }
                }
            );

            wrapper.find('form').prop('onSubmit')({
                preventDefault(){}
            });
        });

        expect(wrapper.find('input[name="title"]').hasClass('false')).toBeTruthy();

    });

    test('Debe de crear un nuevo evento', () => {

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
                modalOpen: true
            }
        };

        const store2 = mockStore(initialState);

        store2.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store2}>
                <CalendarModal />
            </Provider>
        );
        
        // console.log(wrapper.find('form').html());


        act(() => {

            wrapper.find('input[name="title"]').prop('onChange')({
                target:{
                    name: 'title',
                    value: 'fasfrac4fsdf'
                }
            });

            wrapper.find('form').prop('onSubmit')({
                preventDefault(){}
            });

        });

    });

});