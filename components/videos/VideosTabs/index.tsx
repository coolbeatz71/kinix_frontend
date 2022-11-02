import React, { FC } from 'react';
import { Tabs } from 'antd';
import dynamic from 'next/dynamic';
import toLower from 'lodash/toLower';
import { useTranslation } from 'react-i18next';
import useDarkLight from '@hooks/useDarkLight';
import videosTabs, { EnumVideoTabTitle } from '@constants/videos-tabs';

const DynamicLyrics = dynamic(() => import('@components/common/Lyrics'));
const DynamicPopularVideoList = dynamic(() => import('@components/lists/PopularVideoList'));

import styles from './index.module.scss';

const { TabPane } = Tabs;

export interface IVideosTabsProps {
    lyrics: string;
}

const VideosTabs: FC<IVideosTabsProps> = ({ lyrics }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();

    const getTabsContent = (title: string): JSX.Element => {
        switch (title) {
            case EnumVideoTabTitle.LYRICS:
                return <DynamicLyrics content={lyrics} />;
            default:
                return <DynamicPopularVideoList />;
        }
    };

    return (
        <Tabs defaultActiveKey="0" className={styles.videosTabs} data-theme={value}>
            {videosTabs.map((tab) => (
                <TabPane tab={t(toLower(tab.title))} key={tab.title}>
                    {getTabsContent(tab.title)}
                </TabPane>
            ))}
        </Tabs>
    );
};

export default VideosTabs;
