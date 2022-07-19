import { demoWithNotes, demoNotes, initialState } from "../../fixtures/journalFixtures"
import { addNewEmptyNote, clearNotesLogout, deleteNoteById, journalSlice, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"

describe('Test in journalSlice', () => {
    test('should be retur the initialState named "journal"', () => {
        const state = journalSlice.reducer(initialState, {});
        expect(journalSlice.name).toBe('journal');
        expect(state).toEqual(initialState);
    });

    test('should be set saving in true in savingNewNote', () => {
        const { isSaving } = journalSlice.reducer(initialState, savingNewNote());
        expect(isSaving).toBeTruthy();
    });

    test('should be create new Notes in addNewEmptyNote', () => {
        const { notes, isSaving } = journalSlice.reducer(initialState, addNewEmptyNote(demoNotes));
        expect(notes.length).toBeGreaterThanOrEqual(1);
        expect(isSaving).toBeFalsy();
    });

    test('should be set the active note', () => {
        const { active, messageSaved } = journalSlice.reducer(initialState, setActiveNote(demoNotes));
        expect(active).toEqual(demoNotes);
        expect(messageSaved).toBe('');
    })

    test('should be set Notes', () => {
        const { notes } = journalSlice.reducer(initialState, setNotes(demoNotes))
        expect(notes).toEqual(demoNotes);
    });

    test('should be set isSaving in true', () => {
        const { isSaving, messageSaved } = journalSlice.reducer(initialState, setSaving());
        expect(isSaving).toBeTruthy();
        expect(messageSaved).toBe('');
    });

    test('should be update the note', () => {
        const action = {
            id: 'ZYOze872AOTFxtQUpPV1',
            date: 1857850315646,
            title: 'Caminar por 15 min después de cada 3-4 horas de trabajo',
            body: 'Tomarse pausas durante el día es bueno para caminar un poco y despejar cuerpo y mente.',
            imageUrls: []
        };

        const { notes, messageSaved } = journalSlice.reducer(demoWithNotes, updateNote(action));
        expect(notes).toContain(action);
        expect(messageSaved).toBe('Caminar por 15 min después de cada 3-4 horas de trabajo, actualizada correctamente.');
    });

    test('should be set new images for the active Note', () => {
        const demo = {
            ...demoWithNotes,
            active:
            {
                id: '0YOze872AOTFxtQUpPVO',
                date: 1657850315646,
                title: 'Pasear a las mascotas',
                body: 'Siempre es bueno salir a pasear con tu mascota preferida o pasar tiempo con ellos',
                imageUrls: [
                    'image1'
                ]
            }
        };
        const { active } = journalSlice.reducer(demo, setPhotosToActiveNote(['imagedemo']));
        expect(active.imageUrls).toContain('imagedemo');
    });

    test('should clear the Notes when the user logout', () => {
        const { isSaving, messageSaved, notes, active } = journalSlice.reducer(demoWithNotes, clearNotesLogout());
        expect(isSaving).toBeFalsy();
        expect(messageSaved).toBe('');
        expect(notes).toEqual([]);
        expect(active).toBeNull();
    });

    test('should delete the note by id', () => {
        const noteDeleted = {
            id: '0YOze872AOTFxtQUpPVO',
            date: 1657850315646,
            title: 'Pasear a las mascotas',
            body: 'Siempre es bueno salir a pasear con tu mascota preferida o pasar tiempo con ellos',
            imageUrls: [
                'image1'
            ]
        }
        const { active, notes } = journalSlice.reducer(demoWithNotes, deleteNoteById(noteDeleted.id));
        expect(active).toBeNull();
        expect(notes).not.toContain(noteDeleted);
    })
})