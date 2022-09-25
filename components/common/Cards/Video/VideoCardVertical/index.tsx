import dayjs from 'dayjs';
import Image from 'next/image';
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
import { APP_NAME } from '@constants/platform';

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

    const isAuthorAdmin = [EnumRole.ADMIN, EnumRole.SUPER_ADMIN].includes(video?.user?.role as EnumRole);

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
                            <div>
                                <Image
                                    width={100}
                                    height={50}
                                    alt={video?.slug}
                                    layout="responsive"
                                    src={getYoutubeVideoThumbnail(video?.link)}
                                />
                            </div>
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
                        !isExclusive && (
                            <div className="d-flex justify-content-between">
                                <span data-author>{isAuthorAdmin ? APP_NAME : video?.user?.userName}</span>
                                <span data-created-at>{dayjs(video?.createdAt).fromNow()}</span>
                            </div>
                        )
                    }
                />
            </Card>
        </div>
    );
};

export default VideoCardVertical;
