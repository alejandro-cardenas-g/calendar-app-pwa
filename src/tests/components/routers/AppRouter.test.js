import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from '../../../components/routers/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// let store = mockStore(initialState);

// store.dispatch = jest.fn();

describe('Pruebas en AppRouter', () => { 

    test('Debe de mostrar el espere', () =>{

        const initialState = {
            auth:{
                checking: true
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>

                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();

    });

    test('Debe de mostrar la ruta pública', () =>{

        const initialState = {
            auth:{
                checking: false,
                uid: null,
                name: null
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>

                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);

    });

    test('Debe de mostrar la ruta pública', () =>{

        const initialState = {
            auth:{
                checking: false,
                uid: 23423242,
                name: "sdadasda"
            },
            calendar: {
                events: [],
                activeEvent: null
            },
            ui: {
                modalOpen: false
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>

                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.calendar-screen').exists()).toBe(true);

    });

});