import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setSaving } from "./journalSlice";
import { startDeletingNote, startLoadingNotes, startNewNote, startSaveNote, startUploadingfiles } from "./thunks";

jest.setTimeout(30000);
jest.mock('../../firebase/providers');
jest.mock('../../helpers/loadNotes');

const deleteImage = async(uid) => {
    // Borrar de Firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
}

describe('Testing in Thunks - Journal', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());


    test('startNewNote should be create a new blank note', async () => {

        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid } })

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: 'New Note',
            id: expect.any(String),
            date: expect.any(Number)
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: 'New Note',
            id: expect.any(String),
            date: expect.any(Number)
        }));

        // Borrar de Firebase
        deleteImage(uid)
    });

    test('should be call loadNotes when is startLoadingNotes', async () => {
        const uid = 'TEST-UID';
        const mockNotes = [
            {
                id: '0YOze872AOTFxtQUpPVO',
                date: 1657850315646,
                title: 'Pasear a las mascotas',
                body: 'Siempre es bueno salir a pasear con tu mascota preferida o pasar tiempo con ellos',
                imageUrls: []
            }
        ]
        getState.mockReturnValue({ auth: { uid: uid } });

        await loadNotes.mockReturnValue(mockNotes);

        await startLoadingNotes()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(setNotes(mockNotes))

        // Borrar de Firebase
        deleteImage(uid)
    });

    test('should be call loadNotes when is startLoadingNotes - Error', async () => {
        const uid = null;
        getState.mockReturnValue({ auth: { uid: uid } });

        await startLoadingNotes()(dispatch, getState).catch((e) => {
            expect(e.message).toBe('El UID del usuario no existe')
        });

        deleteImage(uid)
    });

    test('should be call setSaving in startSaveNote', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({
            auth: { uid: uid }, journal: {
                isSaving: true,
                messageSaved: '',
                notes: [
                    {
                        id: '0YOze872AOTFxtQUpPVO',
                        date: 1657850315646,
                        title: 'Pasear a las mascotas',
                        body: 'Siempre es bueno salir a pasear con tu mascota preferida o pasar tiempo con ellos',
                        imageUrls: [
                            'https://imagedemo.jpg'
                        ]
                    }
                ],
                active: {
                    title: 'Pasear a las mascotas',
                    body: 'Siempre es bueno salir a pasear con tu mascota preferida o pasar tiempo con ellos',
                    id: '0YOze872AOTFxtQUpPVO',
                    date: 1657850315646,
                    imageUrls: ['https://imagedemo.jpg']
                }
            }
        });

        await startSaveNote()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(setSaving());

        // Borrar de Firebase
        deleteImage(uid)
    });

    test('should call setSaving in startUploadingfiles', async () => {
        await startUploadingfiles()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(setSaving());
        

        await startUploadingfiles(['file1'])(dispatch);
        expect(dispatch).toHaveBeenCalledWith(setSaving());
    });


    test('should be call deleteNoteById in startDeletingNote', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({
            auth: { uid: uid }, journal: {
                isSaving: true,
                messageSaved: '',
                notes: [
                    {
                        id: '0YOze872AOTFxtQUpPVO',
                        date: 1657850315646,
                        title: 'Pasear a las mascotas',
                        body: 'Siempre es bueno salir a pasear con tu mascota preferida o pasar tiempo con ellos',
                        imageUrls: [
                            'https://imagedemo.jpg'
                        ]
                    }
                ],
                active: {
                    title: 'Pasear a las mascotas',
                    body: 'Siempre es bueno salir a pasear con tu mascota preferida o pasar tiempo con ellos',
                    id: '0YOze872AOTFxtQUpPVO',
                    date: 1657850315646,
                    imageUrls: ['https://imagedemo.jpg']
                }
            }
        });

        await startDeletingNote()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(deleteNoteById('0YOze872AOTFxtQUpPVO'));

        // Borrar de Firebase
        deleteImage(uid)
    });
})