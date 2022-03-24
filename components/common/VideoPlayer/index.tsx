import React, { FC } from 'react';
import { Button, Col, Row, Tag, Typography } from 'antd';
import ReactPlayer from 'react-player';
import StarRatingComponent from 'react-star-rating-component';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import { RiPlayListAddFill } from 'react-icons/ri';

import styles from './index.module.scss';

const { Text } = Typography;

// TODO refactor/split the component and add the user (channel) info
const VideoPlayer: FC = () => {
    return (
        <Row className={styles.videoPlayer}>
            <Col span={24} className={styles.videoPlayer__container}>
                <ReactPlayer
                    playing
                    controls
                    width={'100%'}
                    height={'100%'}
                    url="https://www.youtube.com/watch?v=Z9HoTDMEKdk"
                    className={styles.videoPlayer__container__player}
                />
            </Col>
            <Col span={24} className={styles.videoPlayer__footer}>
                <Tag>#music video</Tag>
                <Tag>#kinshasa</Tag>
                <Tag>#music</Tag>
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
            </Col>
        </Row>
    );
};

export default VideoPlayer;
