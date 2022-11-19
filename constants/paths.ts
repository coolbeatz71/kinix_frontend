import EnumVideoCategory from './video-categories';
import EnumFavoriteTabTitle from '@interfaces/favoriteTabs';

export const HOME_PATH = '/';

export const ALL_VIDEOS_PATH = '/videos';
export const ALL_ARTICLES_PATH = '/articles';
export const SEARCH_RESULTS_PATH = '/results';
export const SETTING_PATH = '/account/settings';

export const PODCAST_PATH = `/videos?category=${EnumVideoCategory.PODCAST.toLowerCase()}`;
export const LEFOCUS_PATH = `/videos?category=${EnumVideoCategory.LEFOCUS.toLowerCase()}`;
export const FLEXBEATZ_PATH = `/videos?category=${EnumVideoCategory.FLEXBEATZ.toLowerCase()}`;
export const INTERVIEW_PATH = `/videos?category=${EnumVideoCategory.INTERVIEW.toLowerCase()}`;
export const MUSIC_VIDEO_PATH = `/videos?category=${EnumVideoCategory.MUSIC_VIDEO.toLowerCase()}`;

export const USER_VIDEOS_PLAYLIST_PATH = `/account/favorite?section=${EnumFavoriteTabTitle.PLAYLIST.toLowerCase()}`;
export const USER_VIDEOS_RATED_PATH = `/account/favorite?section=${EnumFavoriteTabTitle.RATED_VIDEO.toLowerCase()}`;
export const USER_VIDEOS_SHARED_PATH = `/account/favorite?section=${EnumFavoriteTabTitle.SHARED_VIDEO.toLowerCase()}`;
export const USER_ARTICLES_BOOKMARK_PATH = `/account/favorite?section=${EnumFavoriteTabTitle.BOOKMARKS.toLowerCase()}`;
export const USER_ARTICLES_LIKED_PATH = `/account/favorite?section=${EnumFavoriteTabTitle.LIKED_ARTICLE.toLowerCase()}`;
