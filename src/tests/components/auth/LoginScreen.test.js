import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);

store.dispatch = jest.fn();

// jest.mock('../../../actions/calendar', () => ({
//     eventStartDeleting: jest.fn()
// }));


jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));

jest.mock('sweetalert2',  () => ({
    fire: jest.fn()
}))

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
)

describe('Pruebas en el LoginScreen', () => { 

    beforeEach(() =>{
        jest.clearAllMocks();
    })

    test('Debe de mostrarse correctamente', () =>{


        expect(wrapper).toMatchSnapshot();

    });

    test('Debe de llamar el dispatch del login', () => {

        wrapper.find('input[name="lemail"]').simulate('change', {
            target: {
                name: 'lemail',
                value: 'asdadas@sda.com'
            }
        });
        wrapper.find('input[name="lpassword"]').simulate('change', {
            target: {
                name: 'lpassword',
                value: '1231415'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect(startLogin).toHaveBeenCalled();

    });

    test('No hay registro si las contrasñeas son diferentes', () => {

        wrapper.find('input[name="rname"]').simulate('change', {
            target: {
                name: 'rname',
                value: 'aaaaaa'
            }
        });
        wrapper.find('input[name="remail"]').simulate('change', {
            target: {
                name: 'remail',
                value: 'sadd@daaa.com'
            }
        });
        wrapper.find('input[name="rpassword"]').simulate('change', {
            target: {
                name: 'rpassword',
                value: '123456'
            }
        });
        wrapper.find('input[name="rconfirmar"]').simulate('change', {
            target: {
                name: 'rconfirmar',
                value: 'sadd@daaa.com'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect(Swal.fire).toHaveBeenCalledWith("Error", "Las contraseñas deben de ser iguales", "error");
        expect(startRegister).not.toHaveBeenCalled();
    });

    test('Registro con contraseñas iguales', () => {

        
        wrapper.find('input[name="rname"]').simulate('change', {
            target: {
                name: 'rname',
                value: 'aaaaaa'
            }
        });
        wrapper.find('input[name="remail"]').simulate('change', {
            target: {
                name: 'remail',
                value: 'sadd@daaa.com'
            }
        });
        wrapper.find('input[name="rpassword"]').simulate('change', {
            target: {
                name: 'rpassword',
                value: '123456'
            }
        });
        wrapper.find('input[name="rconfirmar"]').simulate('change', {
            target: {
                name: 'rconfirmar',
                value: '123456'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect(startRegister).toHaveBeenCalledWith("sadd@daaa.com", "123456", "aaaaaa");

    });

});