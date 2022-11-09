import { ReactNode } from 'react';
import { LikeFilled, ShareAltOutlined, StarFilled } from 'icons';
import { RiBookmark3Fill, RiPlayList2Fill } from 'react-icons/ri';
import {
    USER_VIDEOS_RATED_PATH,
    USER_VIDEOS_SHARED_PATH,
    USER_ARTICLES_LIKED_PATH,
    USER_VIDEOS_PLAYLIST_PATH,
    USER_ARTICLES_BOOKMARK_PATH,
} from './paths';
import EnumFavoriteTabTitle from '@interfaces/favoriteTabs';

export interface IFavoriteTab {
    href: string;
    icon: ReactNode;
    title: EnumFavoriteTabTitle;
}

const favoriteTabs: IFavoriteTab[] = [
    {
        href: USER_VIDEOS_PLAYLIST_PATH,
        title: EnumFavoriteTabTitle.PLAYLIST,
        icon: <RiPlayList2Fill className="anticon" />,
    },
    {
        href: USER_ARTICLES_BOOKMARK_PATH,
        title: EnumFavoriteTabTitle.BOOKMARKS,
        icon: <RiBookmark3Fill className="anticon" />,
    },
    {
        href: USER_ARTICLES_LIKED_PATH,
        icon: <LikeFilled className="anticon" />,
        title: EnumFavoriteTabTitle.LIKED_ARTICLE,
    },
    {
        href: USER_VIDEOS_SHARED_PATH,
        title: EnumFavoriteTabTitle.SHARED_VIDEO,
        icon: <ShareAltOutlined className="anticon" />,
    },
    {
        href: USER_VIDEOS_RATED_PATH,
        icon: <StarFilled className="anticon" />,
        title: EnumFavoriteTabTitle.RATED_VIDEO,
    },
];

export default favoriteTabs;
