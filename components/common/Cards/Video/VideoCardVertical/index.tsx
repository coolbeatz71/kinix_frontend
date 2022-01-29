import React, { FC } from 'react';
import { Card, Avatar } from 'antd';

import styles from './index.module.scss';
import useDarkLight from '@hooks/useDarkLight';
import VideoViewRating from '@components/common/Ratings/VideoViewRating';
import VideoShareButton from '@components/common/Sharings/VideoShareButton';
import VideoAction from '@components/common/Actions/VideoAction';

const { Meta } = Card;

const VideoCardVertical: FC<{ size: number }> = ({ size }) => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.videoCardVertical}>
            <Card
                hoverable
                bordered={false}
                cover={
                    <img
                        alt="example"
                        src={`https://picsum.photos/1024/300?random=${size}`}
                        style={{
                            aspectRatio: '16 / 9',
                            objectFit: 'cover',
                        }}
                    />
                }
                actions={[
                    <VideoViewRating count={3} key="video-rating" />,
                    <VideoShareButton count={1230} key="video-sharing" />,
                    <VideoAction slug={''} key="video-action" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="The Internet's Own Boy: The Story of Aaron Swartz | full movie (2014)"
                    description="moviemaniacsDE"
                />
            </Card>
        </div>
    );
};

export default VideoCardVertical;
