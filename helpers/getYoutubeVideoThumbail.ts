import getVideoId from 'get-video-id';

const getYoutubeVideoThumbnail = (videoUrl: string): string => {
    const video = getVideoId(videoUrl);
    return `https://img.youtube.com/vi/${video.id}/sddefault.jpg`;
};

export default getYoutubeVideoThumbnail;
