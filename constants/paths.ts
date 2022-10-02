import EnumVideoCategory from './video-categories';

export const HOME_PATH = '/';

export const ALL_VIDEOS_PATH = '/videos';
export const ALL_ARTICLES_PATH = '/articles';
export const SETTING_PATH = '/settings';

export const PODCAST_PATH = `/videos?category=${EnumVideoCategory.PODCAST.toLowerCase()}`;
export const LEFOCUS_PATH = `/videos?category=${EnumVideoCategory.LEFOCUS.toLowerCase()}`;
export const FLEXBEATZ_PATH = `/videos?category=${EnumVideoCategory.FLEXBEATZ.toLowerCase()}`;
export const INTERVIEW_PATH = `/videos?category=${EnumVideoCategory.INTERVIEW.toLowerCase()}`;
export const MUSIC_VIDEO_PATH = `/videos?category=${EnumVideoCategory.MUSIC_VIDEO.toLowerCase()}`;

export const USER_VIDEOS_RATED_PATH = '/user/videos/rated';
export const USER_VIDEOS_SHARED_PATH = '/user/videos/shared';
export const USER_ARTICLES_LIKED_PATH = '/user/articles/liked';
export const USER_VIDEOS_PLAYLIST_PATH = '/user/videos/playlists';
export const USER_ARTICLES_BOOKMARK_PATH = '/user/articles/bookmarks';
