import React, { FC, useState } from 'react';
import { Card, Avatar, Button } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';

import styles from './index.module.scss';
import useDarkLight from '@hooks/useDarkLight';
import VideoViewRating from '@components/common/Ratings/VideoViewRating';
import VideoShareButton from '@components/common/Sharings/VideoShareButton';
import VideoAction from '@components/common/Actions/VideoAction';
import { WARNING } from '@constants/colors';

const { Meta } = Card;

const VideoCardVertical: FC<{ size: number; isExclusive?: boolean }> = ({ size, isExclusive = false }) => {
    const { value } = useDarkLight();

    const [showOverLay, setShowOverLay] = useState<boolean>(false);
    const overLayStyles = showOverLay ? { opacity: 1 } : { opacity: 0 };

    return (
        <div
            data-theme={value}
            className={styles.videoCardVertical}
            onMouseEnter={() => setShowOverLay(true)}
            onMouseLeave={() => setShowOverLay(false)}
        >
            <Card
                bordered={false}
                hoverable={!isExclusive}
                cover={
                    <>
                        <div className="overlay" style={overLayStyles}>
                            <Button
                                icon={<PlayCircleTwoTone twoToneColor={WARNING} />}
                                shape="circle"
                                type="text"
                                size="large"
                            />
                        </div>
                        <img
                            alt="example"
                            src={`https://picsum.photos/1024/300?random=${size}`}
                            style={{
                                aspectRatio: '16 / 9',
                                objectFit: 'cover',
                            }}
                        />
                    </>
                }
                actions={
                    isExclusive
                        ? []
                        : [
                              <VideoViewRating count={3} key="video-rating" />,
                              <VideoShareButton count={1230} key="video-sharing" />,
                              <VideoAction slug={''} key="video-action" />,
                          ]
                }
            >
                <Meta
                    avatar={!isExclusive && <Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="The Internet's Own Boy: The Story of Aaron Swartz | full movie (2014)"
                    description={!isExclusive && 'moviemaniacsDE'}
                />
            </Card>
        </div>
    );
};

export default VideoCardVertical;
