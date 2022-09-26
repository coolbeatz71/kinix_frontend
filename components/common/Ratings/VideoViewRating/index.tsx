import React, { FC } from 'react';
import { Button } from 'antd';
import StarRatingComponent from 'react-star-rating-component';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

export interface IVideoViewRatingProps {
    count: number;
}

const VideoViewRating: FC<IVideoViewRatingProps> = ({ count }) => {
    const { value } = useDarkLight();

    return (
        <Button
            type="link"
            data-theme={value}
            className={styles.videoViewRating}
            onClick={() => console.log('clicked')}
        >
            <StarRatingComponent name="video-rate" starCount={5} value={count} />
        </Button>
    );
};

export default VideoViewRating;
