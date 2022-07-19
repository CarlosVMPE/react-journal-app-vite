export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}

export const demoWithNotes = {
    isSaving: false,
    messageSaved: '',
    notes: [
        {
            id: '0YOze872AOTFxtQUpPVO',
            date: 1657850315646,
            title: 'Pasear a las mascotas',
            body: 'Siempre es bueno salir a pasear con tu mascota preferida o pasar tiempo con ellos',
            imageUrls: ['imageA']
        },
        {
            id: 'ZYOze872AOTFxtQUpPV1',
            date: 1857850315646,
            title: 'Caminar por 5 min después de cada 3-4 horas de trabajo',
            body: 'Tomarse pausas durante el día es bueno para caminar un poco y despejar cuerpo y mente.',
            imageUrls: ['imageB']
        }
    ],
    active: null
}

export const demoNote = [
    {
        id: '0YOze872AOTFxtQUpPVO',
        date: 1657850315646,
        title: 'Pasear a las mascotas',
        body: 'Siempre es bueno salir a pasear con tu mascota preferida o pasar tiempo con ellos',
        imageUrls: ['imageA']
    },
    {
        id: 'ZYOze872AOTFxtQUpPV1',
        date: 1857850315646,
        title: 'Caminar por 5 min después de cada 3-4 horas de trabajo',
        body: 'Tomarse pausas durante el día es bueno para caminar un poco y despejar cuerpo y mente.',
        imageUrls: ['imageB']
    }
]