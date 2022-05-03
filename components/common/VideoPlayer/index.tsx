import React, { FC, useState } from 'react';
import ReactPlayer from 'react-player';
import { Col, Row, Typography, Spin } from 'antd';
import useDarkLight from '@hooks/useDarkLight';
import VideoTagsList from '../VideoTagsList';
import SingleVideoAction from '../Actions/SingleVideoAction';

import styles from './index.module.scss';

const { Text } = Typography;

const tagsList = [
    { value: 'Music videos', link: '/videos?tag=music_videos' },
    { value: 'Music', link: '/videos?tag=music' },
    { value: 'Kinshasa', link: '/videos?tag=kinshasa' },
];

const VideoPlayer: FC = () => {
    const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

    const { value } = useDarkLight();

    return (
        <Row data-theme={value} className={styles.videoPlayer}>
            <Col span={24} className={styles.videoPlayer__container} data-video-loaded={videoLoaded}>
                {videoLoaded === false ? <Spin size="large" /> : null}
                <ReactPlayer
                    playing
                    controls
                    width={'100%'}
                    height={'100%'}
                    onReady={() => setVideoLoaded(true)}
                    url="https://www.youtube.com/watch?v=Z9HoTDMEKdk"
                    className={styles.videoPlayer__container__player}
                />
            </Col>
            <Col span={24} className={styles.videoPlayer__footer}>
                <VideoTagsList tags={tagsList} />
                <Text data-title>T.I. - “Hit Dogs Holla” feat. Tokyo Jetz (Official Music Video - WSHH Exclusive)</Text>
                <Text data-views className="my-2">
                    288,065 views - Jan 1, 2022
                </Text>
                <SingleVideoAction commentCount={1200} likeCount={3.5} />
                {/* // TODO: must think about adding channel info or no */}
                {/* <Divider />

                <VideoOwnerProfile
                    subscribers={87.5}
                    channel="Derrière La Caméra"
                    avatarLink="https://i.pravatar.cc/300"
                /> */}
            </Col>
        </Row>
    );
};

export default VideoPlayer;
