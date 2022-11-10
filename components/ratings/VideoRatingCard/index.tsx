import { FC } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Typography from 'antd/lib/typography';

import useDarkLight from '@hooks/useDarkLight';
import VideoViewRating from '../VideoViewRating';

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
