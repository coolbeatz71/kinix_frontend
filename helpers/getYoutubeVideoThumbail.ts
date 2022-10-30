import getVideoId from 'get-video-id';

const getYoutubeVideoThumbnail = (videoUrl: string): string | void => {
    if (videoUrl) {
        const video = getVideoId(videoUrl);
        return `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
    }
};

export default getYoutubeVideoThumbnail;
