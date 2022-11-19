import React, { ReactNode } from 'react';
import { RiArticleLine } from 'react-icons/ri';
import { MenuUnfoldOutlined, VideoCameraFilled } from 'icons';
import EnumSearchResultTabTitle from '@interfaces/searchResultTabs';

export interface IFavoriteTab {
    icon: ReactNode;
    title: EnumSearchResultTabTitle;
}

const searchResultTabs: IFavoriteTab[] = [
    {
        title: EnumSearchResultTabTitle.ALL,
        icon: <MenuUnfoldOutlined />,
    },
    {
        icon: <RiArticleLine className="anticon" />,
        title: EnumSearchResultTabTitle.ARTICLES,
    },
    {
        title: EnumSearchResultTabTitle.VIDEOS,
        icon: <VideoCameraFilled />,
    },
];

export default searchResultTabs;
