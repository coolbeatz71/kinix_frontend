import React, { FC, useState } from 'react';
import { Button, Col, Row, Typography, Divider, Avatar, Space, Spin } from 'antd';
import ReactPlayer from 'react-player';
import StarRatingComponent from 'react-star-rating-component';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import { RiPlayListAddFill } from 'react-icons/ri';
import VideoTagsList from '../VideoTagsList';

import styles from './index.module.scss';
import useDarkLight from '@hooks/useDarkLight';

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

                <Row justify="space-between" align="middle">
                    <Col span={12}>
                        <StarRatingComponent name="video-rate" starCount={5} value={3} />
                    </Col>
                    <Col span={12} className="d-flex justify-content-end">
                        <Button data-like type="link" icon={<HeartOutlined />}>
                            <span data-count>12.3k</span>
                        </Button>
                        <Button data-comment type="link" icon={<CommentOutlined />}>
                            <span data-count>120k</span>
                        </Button>
                        <Button type="link" icon={<RiPlayListAddFill />} />
                    </Col>
                </Row>
                <Divider />
                <div>
                    <Space>
                        <Avatar size={48} src={'https://i.pravatar.cc/300'} />
                        <div>
                            <Text data-channel>Derrière La Caméra</Text>
                            <Text data-subscribers>87.5K subscribers</Text>
                        </div>
                    </Space>
                </div>
            </Col>
        </Row>
    );
};

export default VideoPlayer;
