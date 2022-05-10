import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe('Prueba en fetch helper', () => { 

    let token = '';

    test('Fetch Sin token debe funcionar', async() =>{

        const data = {
            email: "alejandro@gmail.com",
            password: "123456" 
        };

        const res = await fetchSinToken('auth', {
            email: "alejandro@gmail.com",
            password: "123456" 
        }, 'POST');

        expect(res instanceof Response).toBeTruthy();

        const body = await res.json();

        expect(body.ok).toBeTruthy();

        token = body.token;

    });

    test('Fetch con token debe funcionar', async() => {

        localStorage.setItem('token', token);

        const res = await fetchConToken('auth/renew');

        const body = await res.json();

        expect(body.ok).toBeTruthy();
        expect(!!body.uid).toBeTruthy();

    });

});