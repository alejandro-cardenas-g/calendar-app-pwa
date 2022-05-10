import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
    checking: true,
};


describe('Pruebas en el authReducer', () => { 

    test('Debe de retornar el estado por defecto', () =>{

        const state = authReducer(initialState, {});

        expect(state).toEqual(initialState);

    });

    test('Debe de autenticar al usuario', () => {
        
        const action = {
            type: types.authLogin,
            payload: {
                uid: 123123131,
                name: 'Carlangas'
            }
        };

        const state = authReducer(initialState, action);
        
        expect(state).toEqual({checking: false, uid: 123123131, name: 'Carlangas'});

    });

});