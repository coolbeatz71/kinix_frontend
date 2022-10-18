import React, { FC, useState } from 'react';
import { Button } from 'antd';
import dynamic from 'next/dynamic';
import useDarkLight from '@hooks/useDarkLight';
import StarRatingComponent from 'react-star-rating-component';

const DynamicRatingSummaryPopover = dynamic(() => import('../RatingSummaryPopover'));

import styles from './index.module.scss';

export interface IVideoViewRatingProps {
    slug: string;
    count: number;
}

const VideoViewRating: FC<IVideoViewRatingProps> = ({ count, slug }) => {
    const { value } = useDarkLight();
    const [openRatingPopup, setOpenRatingPopup] = useState(false);

    return (
        <DynamicRatingSummaryPopover slug={slug} open={openRatingPopup} setOpen={setOpenRatingPopup}>
            <Button
                type="link"
                data-theme={value}
                className={styles.videoViewRating}
                onClick={() => setOpenRatingPopup(true)}
            >
                <StarRatingComponent name={slug} starCount={5} value={count} />
            </Button>
        </DynamicRatingSummaryPopover>
    );
};

export default VideoViewRating;
