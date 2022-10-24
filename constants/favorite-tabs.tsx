import React, { ReactNode } from 'react';
import { LikeFilled, ShareAltOutlined, StarFilled } from 'icons';
import { RiBookmark3Fill, RiPlayList2Fill } from 'react-icons/ri';

export enum EnumFavoriteTabTitle {
    PLAYLIST = 'playlists',
    BOOKMARKS = 'bookmarks',
    RATED_VIDEO = 'ratedVideo',
    SHARED_VIDEO = 'sharedVideo',
    LIKED_ARTICLE = 'likedArticle',
}

export interface IFavoriteTab {
    icon: ReactNode;
    title: EnumFavoriteTabTitle;
}

const favoriteTabs: IFavoriteTab[] = [
    {
        title: EnumFavoriteTabTitle.PLAYLIST,
        icon: <RiPlayList2Fill className="anticon" />,
    },
    {
        title: EnumFavoriteTabTitle.BOOKMARKS,
        icon: <RiBookmark3Fill className="anticon" />,
    },
    {
        icon: <LikeFilled className="anticon" />,
        title: EnumFavoriteTabTitle.LIKED_ARTICLE,
    },
    {
        title: EnumFavoriteTabTitle.SHARED_VIDEO,
        icon: <ShareAltOutlined className="anticon" />,
    },
    {
        icon: <StarFilled className="anticon" />,
        title: EnumFavoriteTabTitle.RATED_VIDEO,
    },
];

export default favoriteTabs;
