import React, { FC } from 'react';
import { Col, Divider, Row, Typography } from 'antd';
import VideoViewRating from '../VideoViewRating';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const { Text } = Typography;

export interface IVideoRatingCardProps {
    rater: string;
    comment: string;
    rateCount: number;
}

const VideoRatingCard: FC<IVideoRatingCardProps> = ({ rater, comment, rateCount }) => {
    const { value } = useDarkLight();

    return (
        <div className={styles.videoRatingCard} data-theme={value}>
            <Row align="middle" justify="space-between">
                <Col span={12}>
                    <Text strong data-user>
                        {rater}
                    </Text>
                </Col>
                <Col span={12} className="d-flex justify-content-end mb-2">
                    <VideoViewRating count={rateCount} slug={''} />
                </Col>
            </Row>
            <Row align="middle">
                <Text data-comment>{comment}</Text>
            </Row>
            <Divider />
        </div>
    );
};

export default VideoRatingCard;
