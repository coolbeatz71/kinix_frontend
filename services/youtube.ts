import axios from 'axios';
import { YOUTUBE_API } from '@constants/app';
import { IYoutubeVideo } from '@interfaces/youtube';
import { GOOGLE_API_KEY } from '@constants/platform';

export const getYoutubeVideoInfo = async (videoId: string | null): Promise<IYoutubeVideo> => {
    const part = 'snippet,contentDetails,statistics';
    const url = `${YOUTUBE_API}videos`;

    const { data } = await axios.get(url, {
        params: {
            part,
            id: videoId,
            key: GOOGLE_API_KEY,
        },
    });

    return data;
};
