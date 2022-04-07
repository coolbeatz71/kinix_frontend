import React, { FC, useEffect, useState } from 'react';
import { Card, Avatar, Button, Grid } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';

import styles from './index.module.scss';
import useDarkLight from '@hooks/useDarkLight';
import VideoViewRating from '@components/common/Ratings/VideoViewRating';
import VideoShareButton from '@components/common/Sharings/VideoShareButton';
import VideoAction from '@components/common/Actions/VideoAction';
import { WARNING } from '@constants/colors';
import { isBoolean } from 'lodash';

const { Meta } = Card;
const { useBreakpoint } = Grid;

export interface IVideoCardVerticalProps {
    size: number;
    isExclusive?: boolean;
}

const VideoCardVertical: FC<IVideoCardVerticalProps> = ({ size, isExclusive = false }) => {
    const { value } = useDarkLight();
    const { lg } = useBreakpoint();

    const [showOverLay, setShowOverLay] = useState<boolean>(false);
    const overLayStyles = showOverLay ? { opacity: 1 } : { opacity: 0 };

    const handleShowOverlay = (): void => {
        if (lg) setShowOverLay(!showOverLay);
        else setShowOverLay(true);
    };

    useEffect(() => {
        if (isBoolean(lg) && !lg) setShowOverLay(true);
    }, [lg]);

    return (
        <div
            data-theme={value}
            className={styles.videoCardVertical}
            onMouseEnter={handleShowOverlay}
            onMouseLeave={handleShowOverlay}
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
