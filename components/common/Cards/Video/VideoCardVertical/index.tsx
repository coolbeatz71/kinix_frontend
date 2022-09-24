import React, { FC, Fragment, useEffect, useState } from 'react';
import { isBoolean, isEmpty, truncate } from 'lodash';
import { Card, Button, Grid } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';
import useDarkLight from '@hooks/useDarkLight';
import { IVideo } from '@interfaces/api';
import EnumRole from '@interfaces/role';
import { WARNING } from '@constants/colors';
import VideoAction from '@components/common/Actions/VideoAction';
import VideoViewRating from '@components/common/Ratings/VideoViewRating';
import VideoShareButton from '@components/common/Sharings/VideoShareButton';
import getYoutubeVideoThumbnail from '@helpers/getYoutubeVideoThumbail';

import styles from './index.module.scss';

const { Meta } = Card;
const { useBreakpoint } = Grid;

export interface IVideoCardVerticalProps {
    video: IVideo;
    isExclusive?: boolean;
}

const VideoCardVertical: FC<IVideoCardVerticalProps> = ({ isExclusive = false, video }) => {
    const { lg } = useBreakpoint();
    const { value } = useDarkLight();

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
            onMouseEnter={handleShowOverlay}
            onMouseLeave={handleShowOverlay}
            className={styles.videoCardVertical}
        >
            <Card
                bordered={false}
                hoverable={!isExclusive}
                cover={
                    <Fragment>
                        <div className="overlay" style={overLayStyles}>
                            <Button
                                type="text"
                                size="large"
                                shape="circle"
                                icon={<PlayCircleTwoTone twoToneColor={WARNING} />}
                            />
                        </div>
                        {!isEmpty(video?.link) && (
                            //TODO: should use next/image and fix CSS issue
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                alt={video?.slug}
                                src={getYoutubeVideoThumbnail(video?.link)}
                                style={{
                                    objectFit: 'cover',
                                    aspectRatio: '16 / 9',
                                }}
                            />
                        )}
                    </Fragment>
                }
                actions={
                    isExclusive
                        ? []
                        : [
                              <VideoViewRating count={video?.avgRate || 0} key="video-rating" />,
                              <VideoShareButton count={Number(video?.sharesCount)} key="video-sharing" />,
                              <VideoAction slug={video?.slug} key="video-action" />,
                          ]
                }
            >
                <Meta
                    title={truncate(video?.title, {
                        length: 100,
                    })}
                    description={
                        !isExclusive &&
                        ([EnumRole.ADMIN, EnumRole.SUPER_ADMIN].includes(video?.user?.role as EnumRole)
                            ? "Kinshas'art"
                            : video?.user?.userName)
                    }
                />
            </Card>
        </div>
    );
};

export default VideoCardVertical;
