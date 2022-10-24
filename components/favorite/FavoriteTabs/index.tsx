import { FC } from 'react';
import { Tabs } from 'antd';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import useDarkLight from '@hooks/useDarkLight';
import favoriteTabs, { EnumFavoriteTabTitle } from '@constants/favorite-tabs';

const DynamicPlaylistsList = dynamic(() => import('@components/lists/PlaylistsList'));
const DynamicBookmarksList = dynamic(() => import('@components/lists/BookmarksList'));
const DynamicRatedVideosList = dynamic(() => import('@components/lists/RatedVideosList'));
const DynamicSharedVideosList = dynamic(() => import('@components/lists/SharedVideosList'));
const DynamicLikedArticlesList = dynamic(() => import('@components/lists/LikedArticlesList'));

import styles from './index.module.scss';

const { TabPane } = Tabs;

const FavoriteTabs: FC = () => {
    const { t } = useTranslation();
    const { value } = useDarkLight();

    const getTabsContent = (title: string): JSX.Element => {
        switch (title) {
            case EnumFavoriteTabTitle.PLAYLIST:
                return <DynamicPlaylistsList />;
            case EnumFavoriteTabTitle.BOOKMARKS:
                return <DynamicBookmarksList />;
            case EnumFavoriteTabTitle.LIKED_ARTICLE:
                return <DynamicLikedArticlesList />;
            case EnumFavoriteTabTitle.SHARED_VIDEO:
                return <DynamicSharedVideosList />;
            case EnumFavoriteTabTitle.RATED_VIDEO:
                return <DynamicRatedVideosList />;
            default:
                return <DynamicPlaylistsList />;
        }
    };

    return (
        <Tabs defaultActiveKey="0" className={styles.favoriteTabs} data-theme={value} type="card">
            {favoriteTabs.map((tab, idx) => (
                <TabPane
                    key={idx}
                    tab={
                        <div className="d-flex justify-content-between align-items-center">
                            {tab.icon} {t(tab.title)}
                        </div>
                    }
                >
                    {getTabsContent(tab.title)}
                </TabPane>
            ))}
        </Tabs>
    );
};

export default FavoriteTabs;
