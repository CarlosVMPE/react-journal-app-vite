import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";
import { authSlice, checkingCredentials, login, logout } from "./authSlice"

describe('Test in authSlice', () => {
    test('should be return the initialState and named "auth"', () => {
        const state = authSlice.reducer(initialState, {});
        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState);
    });

    test('should be do the authentication', () => {

        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });

    test('should be do the logout without errorMessage', () => {
        const state = authSlice.reducer(authenticatedState, logout())
        expect(state).toEqual(notAuthenticatedState);
    });

    test('should be do the logout with errorMessage', () => {
        const state = authSlice.reducer(authenticatedState, logout({ errorMessage: 'Usuario no autenticado' }));
        expect(state).toEqual({
            status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Usuario no autenticado'
        })
    });

    test('should be change the status for "checking"', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking');
    });
});