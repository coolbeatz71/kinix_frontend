import axios from 'axios';
import { SHA1 } from 'crypto-js';
import { IMAGES_API_KEY, IMAGES_API_URL, IMAGES_API_SECRET } from '@constants/platform';
import getNotification from '@helpers/getNotification';

const uploadImageCloudinary = async (
    file: File,
    currentImage: string | null | undefined,
    folderName: 'articles' | 'avatars' | 'ads' | 'stories',
): Promise<unknown> => {
    const formData = new FormData();

    formData.append('folder', folderName);
    formData.append('file', file, file.name);
    formData.append('api_key', IMAGES_API_KEY);

    if (!currentImage) {
        const timestamp = new Date().getTime();
        const plainText = `folder=${folderName}&timestamp=${timestamp}${IMAGES_API_SECRET}`;
        formData.append('timestamp', `${timestamp}`);
        formData.append('signature', `${SHA1(plainText)}`);
    } else {
        const splitted = currentImage?.split(`${folderName}/`);
        const fileName = splitted[1]?.split('.')[0];
        const imagePublicId = `${fileName}`;
        const timestamp = new Date().getTime();
        const plainText = `folder=${folderName}&public_id=${imagePublicId}&timestamp=${timestamp}${IMAGES_API_SECRET}`;

        formData.append('public_id', imagePublicId);
        formData.append('timestamp', `${timestamp}`);
        formData.append('signature', `${SHA1(plainText)}`);
    }

    try {
        const { data } = await axios.post(`${IMAGES_API_URL}/upload`, formData);
        return data.url;
    } catch (err) {
        getNotification('error', (err as Error)?.message);
        return err;
    }
};

export default uploadImageCloudinary;
