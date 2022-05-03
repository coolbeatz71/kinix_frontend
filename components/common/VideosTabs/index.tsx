import React, { FC } from 'react';
import videosTabs, { ETabTitle } from '@constants/videos-tabs';
import { Tabs } from 'antd';
import PopularVideoList from '../PopularVideoList';
import { upperFirst } from 'lodash';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';
import Lyrics from '../Lyrics';

const { TabPane } = Tabs;

const VideosTabs: FC = () => {
    const { value } = useDarkLight();

    const getTabsContent = (title: string): JSX.Element => {
        switch (title) {
            case ETabTitle.POPULAR:
                return <PopularVideoList fetched error={null} videos={[]} />;
            case ETabTitle.RATINGS:
                return <PopularVideoList fetched error={null} videos={[]} />;
            case ETabTitle.LYRICS:
                return <Lyrics content={''} />;
            default:
                return <PopularVideoList fetched error={null} videos={[]} />;
        }
    };

    return (
        <Tabs defaultActiveKey="0" className={styles.videosTabs} data-theme={value}>
            {videosTabs.map((tab) => (
                <TabPane tab={upperFirst(tab.title)} key={tab.title}>
                    {getTabsContent(tab.title)}
                </TabPane>
            ))}
        </Tabs>
    );
};

export default VideosTabs;
