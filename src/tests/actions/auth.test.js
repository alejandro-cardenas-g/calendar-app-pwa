import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

jest.mock('sweetalert2', ()=>({
    fire: jest.fn()
}));

let token = '';

describe('Pruebas en action auth', () => { 

    beforeEach(() =>{
        store = mockStore(initialState);
        jest.clearAllMocks();
    })

    test('StartLogin Correcto', async() =>{

        await store.dispatch(startLogin("alejandro@gmail.com", "123456"));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        token = localStorage.setItem.mock.calls[0][1];

    });

    test('StartLogin incorrecto', async() =>{

        await store.dispatch(startLogin("alejandro@gmail.com", "12345226"));

        const actions = store.getActions();

        expect(actions.length).toBe(0);

        expect(Swal.fire).toHaveBeenCalledWith("Error", "Contraseña incorrecta", "error");

    });

    test('StartRegister Correcto', async() => {

        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: 123,
                    name: 'Ale',
                    token: 'acb123abc'
                }
            }
        }));

        await store.dispatch(startRegister("test@gmail.com", "12345226", 'test'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: 123,
                name: 'Ale'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'acb123abc');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });

    test('startCheking correcto', async() => {

        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: 123,
                    name: 'Ale',
                    token: 'acb123abc'
                }
            }
        }));

        await store.dispatch(startChecking());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload:{
                uid:123,
                name: 'Ale'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));

    });

});