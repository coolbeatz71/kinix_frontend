import { FC, useState, useEffect } from 'react';
import Link from 'next/link';

import Tabs from 'antd/lib/tabs';

import dynamic from 'next/dynamic';
import toLower from 'lodash/toLower';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import useDarkLight from '@hooks/useDarkLight';
import favoriteTabs from '@constants/favorite-tabs';
import EnumFavoriteTabTitle from '@interfaces/favoriteTabs';

const DynamicPlaylistsList = dynamic(() => import('@components/lists/PlaylistsList'));
const DynamicBookmarksList = dynamic(() => import('@components/lists/BookmarksList'));
const DynamicRatedVideosList = dynamic(() => import('@components/lists/RatedVideosList'));
const DynamicSharedVideosList = dynamic(() => import('@components/lists/SharedVideosList'));
const DynamicLikedArticlesList = dynamic(() => import('@components/lists/LikedArticlesList'));

import styles from './index.module.scss';

const { TabPane } = Tabs;

const FavoriteTabs: FC = () => {
    const { query } = useRouter();
    const { t } = useTranslation();
    const { value } = useDarkLight();

    const sectionQuery = query.section as string;
    const defaultSection = favoriteTabs[0].title?.toLowerCase();

    const [activeSection, setActiveSection] = useState<string>(sectionQuery || defaultSection);

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

    useEffect(() => {
        if (sectionQuery) setActiveSection(sectionQuery);
    }, [sectionQuery]);

    return (
        <Tabs
            type="card"
            data-theme={value}
            activeKey={activeSection}
            className={styles.favoriteTabs}
            defaultActiveKey={activeSection}
        >
            {favoriteTabs.map((tab) => (
                <TabPane
                    key={toLower(tab.title)}
                    tab={
                        <Link href={tab.href} shallow passHref>
                            <div className="d-flex justify-content-between align-items-center">
                                {tab.icon} {t(tab.title)}
                            </div>
                        </Link>
                    }
                >
                    {getTabsContent(tab.title)}
                </TabPane>
            ))}
        </Tabs>
    );
};

export default FavoriteTabs;
