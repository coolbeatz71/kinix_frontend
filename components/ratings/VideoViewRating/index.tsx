import { FC, useState } from 'react';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

import Button from 'antd/lib/button';

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
                <StarRatingComponent name={nanoid()} starCount={5} value={count} />
            </Button>
        </DynamicRatingSummaryPopover>
    );
};

export default VideoViewRating;
