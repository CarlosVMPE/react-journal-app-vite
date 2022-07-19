import { fireEvent, render, screen } from "@testing-library/react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { LoginPage } from "./LoginPage"
import { authSlice } from "../../store/auth"
import { MemoryRouter } from "react-router-dom"
import { notAuthenticatedState } from "../../fixtures/authFixtures"

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginEmailPassword = jest.fn();

jest.mock('../../store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginEmailPassword({email, password})
    }
}));

jest.mock('react-redux', () =>  ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Testing in LoginPage', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('should be show the component correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    })

    test('button Google should be call startGoogleSignIn', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);
        expect(mockStartGoogleSignIn).toHaveBeenCalled();
    });

    test('submit should be call startLoginEmailPassword', () => {
        const email = 'carlos123@gmail.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change(emailField, { target: { name: 'email', value: email } });
        
        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } });
        
        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm)

        expect(mockStartLoginEmailPassword).toHaveBeenCalledWith({
            email,
            password
        });

    })
})