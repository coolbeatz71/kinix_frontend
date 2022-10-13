import React, { FC, Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';
import { isBoolean, isEmpty, truncate } from 'lodash';
import { Card, Button, Grid } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';
import useDarkLight from '@hooks/useDarkLight';
import EnumRole from '@interfaces/role';
import { IVideo } from '@interfaces/api';
import { WARNING } from '@constants/colors';
import { APP_NAME } from '@constants/platform';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import VideoAction from '@components/common/Actions/VideoAction';
import getYoutubeVideoThumbnail from '@helpers/getYoutubeVideoThumbail';
import VideoViewRating from '@components/common/Ratings/VideoViewRating';
import VideoShareButton from '@components/common/Sharings/VideoShareButton';

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
    const link = `${ALL_VIDEOS_PATH}/${video?.slug}`;

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
                data-exclusive={isExclusive}
                cover={
                    <Link href={link} passHref>
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
                    </Link>
                }
                actions={
                    isExclusive
                        ? []
                        : [
                              <VideoViewRating slug={video?.slug} key="video-rating" count={video?.avgRate || 0} />,
                              <VideoShareButton
                                  key="video-sharing"
                                  slug={video?.slug}
                                  title={video?.title}
                                  count={Number(video?.sharesCount)}
                              />,
                              <VideoAction videoId={video?.id as number} key="video-action" />,
                          ]
                }
            >
                <Meta
                    title={
                        <Link href={link} passHref>
                            {truncate(video?.title, {
                                length: 100,
                            })}
                        </Link>
                    }
                    description={
                        !isExclusive && (
                            <Link href={link} passHref>
                                <div className="d-flex justify-content-between">
                                    <span data-author>{isAuthorAdmin ? APP_NAME : video?.user?.userName}</span>
                                    <span data-created-at>{dayjs(video?.createdAt).fromNow()}</span>
                                </div>
                            </Link>
                        )
                    }
                />
            </Card>
        </div>
    );
};

export default VideoCardVertical;
