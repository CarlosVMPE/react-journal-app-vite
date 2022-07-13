export const errorsConfig = [
    { code: 'auth/email-already-in-use', message: 'Error: Usuario ya existe' },
    { code: 'auth/invalid-email', message: 'Error: Debe escribir email y password correctos' },
    { code: 'auth/user-not-found', message: 'Error: Usuario no existe' },
    { code: 'auth/wrong-password', message: 'Error: Credenciales incorrectas' },
]

export const findErrorMessage = (error) => {

    const errorList = errorsConfig.find(e => e.code === error.code);

    // Return the default error by firebase
    if(!errorList) return error.message;

    return errorList.message;



}