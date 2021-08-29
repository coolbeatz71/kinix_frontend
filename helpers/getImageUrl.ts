import { ImageLoaderProps } from 'next/image';
import { IMAGES_URL } from '@constants/platform';

const getImageUrl = (): string | undefined => IMAGES_URL || undefined;

export const imgLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    return `${getImageUrl()}/${src}?w=${width}&q=${quality || 75}`;
};

export const avatarLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    return `${src}?w=${width}&q=${quality || 75}`;
};

export default getImageUrl;
