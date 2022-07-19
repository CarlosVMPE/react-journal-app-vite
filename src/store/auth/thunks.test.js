import { checkingAuthentication, startGoogleSignIn,
        startCreatingUserWithEmailPassword,
        startLoginWithEmailPassword, startLogout } from ".";
import { checkingCredentials, login, logout } from "./"
import { demoUser } from '../../fixtures/authFixtures';
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";

jest.mock('../../firebase/providers');
const dispatch = jest.fn();

beforeEach(() => jest.clearAllMocks());

describe('Testing in AuthThunks', () => {
    test('should be invoke checkingCredentials', async () => {
        await checkingAuthentication()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    });

    test('startGoogleSignIn should call checkingCredentials and login - correctly', async() => {
        const loginData = { ok: true, ...demoUser };
        await singInWithGoogle.mockResolvedValue( loginData );
        // thunk
        await startGoogleSignIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });
    
    test('startGoogleSignIn should call checkingCredentials and logout - error', async() => {
        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        await singInWithGoogle.mockResolvedValue( loginData );
        // thunk
        await startGoogleSignIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startLoginWithEmailPassword should be call checkingCredentials and loginWithEmailPassword - correctly', async() => { 
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue(loginData);
        
        await startLoginWithEmailPassword(formData)(dispatch);
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login( {
            uid: loginData.uid,
            email: loginData.email,
            displayName: loginData.displayName,
            photoURL: loginData.photoURL
        } ) );
     });
    
     test('startLoginWithEmailPassword should be call checkingCredentials and loginWithEmailPassword - error', async() => { 
        const loginData = { ok: false, ...demoUser, errorMessage: 'Error de credenciales' };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue(loginData);
        
        await startLoginWithEmailPassword(formData)(dispatch);
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( logout( { errorMessage: 'Error de credenciales' }) );
     });

     test('startCreatingUserWithEmailPassword should be call checkingCredentials and registerUserWithEmailPassword - correctly', 
        async() => { 
            const loginData = { ok: true, ...demoUser };
            const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

            await registerUserWithEmailPassword.mockResolvedValue(loginData);
            
            await startCreatingUserWithEmailPassword(formData)(dispatch);
            
            expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
            expect(dispatch).toHaveBeenCalledWith( login( {
                uid: loginData.uid,
                email: loginData.email,
                displayName: loginData.displayName,
                photoURL: loginData.photoURL
            }));
     });
     
     test('startCreatingUserWithEmailPassword should be call checkingCredentials and registerUserWithEmailPassword - error', 
        async() => { 
            const loginData = { ok: false, ...demoUser, errorMessage: 'Error al crear usuario'};
            const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

            await registerUserWithEmailPassword.mockResolvedValue(loginData);
            
            await startCreatingUserWithEmailPassword(formData)(dispatch);
            
            expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
            expect(dispatch).toHaveBeenCalledWith( logout( { errorMessage: 'Error al crear usuario' }));
     });
     

     test('should be call logoutFirebase, clearNotesLogout and logout', async() => { 
        await startLogout()( dispatch );

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith( clearNotesLogout() );
        expect(dispatch).toHaveBeenCalledWith( logout() );
      })
});