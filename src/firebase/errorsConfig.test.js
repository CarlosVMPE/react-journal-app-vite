import { findErrorMessage } from "./errorsConfig"

describe('Testing in errorsConfig', () => {
    test('should be return the default errorMessage', () => {
        const message = findErrorMessage({ message: 'not-error-find' });
        expect(message).toBe('not-error-find');
    });

    test('should be return a custom errorMessage', () => {
        const message = findErrorMessage({ code: 'auth/email-already-in-use' });
        expect(message).toBe('Error: Usuario ya existe');
    });
})