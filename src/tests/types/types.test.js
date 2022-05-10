import { types } from "../../types/types";

describe('Pruebas en types', () => { 

    test('Los types deben de ser iguales', () =>{

        expect(types).toEqual({

            uiOpenModal: '[UI] Open Modal',
            uiCloseModal: '[UI] Close Modal',
        
            eventStartAddNew: '[Event] Start Add New',
            eventAddNew: '[Event] Add New',
            eventSetActive: '[Event] Set Active',
            eventSetInactive: '[Event] Set Inactive',
            eventUpdate: '[Event] Update Event',
            eventDelete: '[Event] Delete Event',
            eventLoaded: '[Event] Loaded',
            eventPurge: '[Event] Purge',
        
            authCheckingFinish: '[Auth] Finish Login State',
            authStartLogin: '[Auth] Start Login',
            authLogin: '[Auth] Login',
            authStartRegister: '[Auth] start Register',
            authStartTokenRenew: '[Auth] Start Token Renew',
            authLogout: '[Auth] Logout'
        
        });

    });

});