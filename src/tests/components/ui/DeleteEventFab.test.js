import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDeleting } from '../../../actions/calendar';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);

store.dispatch = jest.fn();

jest.mock('../../../actions/calendar', () => ({
    eventStartDeleting: jest.fn()
}));

const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab />
    </Provider>
)

describe('Pruebas en DeleteEventFab', () => { 

    test('Debe de mostrarse correctamente', () =>{

        expect(wrapper).toMatchSnapshot();

    });

    test('Debe de llamar el eventStartDelete al hacer click', () => {

        wrapper.find('button').prop('onClick')();

        expect( eventStartDeleting ).toHaveBeenCalled();

    });

});