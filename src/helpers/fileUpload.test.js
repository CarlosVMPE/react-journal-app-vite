import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "./fileUpload";

jest.setTimeout(30000);

cloudinary.config({
    cloud_name: 'react-fh-udemy',
    api_key: '798784611436442',
    api_secret: 'tCbKzvtq-t60ZEGHTAgSzlpkjGs',
    secure: true
})

describe('Test in fileUpload', () => {
    test('should be upload the file correctly to Cloudinary', async () => {
        const imageUrl = 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1e/f5/4f/1ef54f85-444d-ba4d-0c29-3c1f3d12f078/08UMGIM27993.rgb.jpg/1200x1200bf-60.jpg';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'folieadeux.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        // Cleaning image
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');
        await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        });
    });

    test('should be return null', async() => {
        const file = new File([], 'folieadeux.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    })
    
    test('should be return null without parameter', async() => {
        const file = null;
        const url = await fileUpload(file);
        expect(url).toBe(null);
    })
});