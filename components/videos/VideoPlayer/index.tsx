import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import numeral from 'numeral';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import ReactPlayer from 'react-player';
import { FaShare } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';
import { Col, Row, Typography, Spin, Button } from 'antd';
import { LoadingOutlined } from 'icons';
import { IVideo } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import getPlatformUrl from '@helpers/getPlatformUrl';
import { IItemsEntity, IYoutubeVideo } from '@interfaces/youtube';
import getSingleVideoRatedByUserAction from '@redux/ratings/getUserRate';

const DynamicVideoTagsList = dynamic(() => import('@components/lists/VideoTagsList'));
const DynamicSharePopover = dynamic(() => import('@components/sharings/SharePopover'));
const DynamicVideoRatingModal = dynamic(() => import('@components/modal/VideoRatingModal'));
const DynamicSingleVideoAction = dynamic(() => import('@components/actions/SingleVideoAction'));

import styles from './index.module.scss';

const { Text } = Typography;

export interface IVideoPlayerProps {
    video: IVideo;
    youtubeVideo: IYoutubeVideo;
}

const VideoPlayer: FC<IVideoPlayerProps> = ({ youtubeVideo, video }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { value, isDark } = useDarkLight();
    const sharedLink = `${getPlatformUrl()}${ALL_VIDEOS_PATH}/${video.slug}`;

    const { data: userRatings } = useSelector(({ ratings: { userRate } }: IRootState) => userRate);

    const youtubeVideoEntity = youtubeVideo.items?.[0];
    const viewCount = youtubeVideoEntity?.statistics?.viewCount;
    const publishedAt = youtubeVideoEntity?.snippet?.publishedAt;

    const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
    const [hasUserRated, setHasUserRated] = useState<boolean>(false);
    const [openRatingModal, setOpenRatingModal] = useState<boolean>(false);
    const [openSharePopover, setOpenSharePopover] = useState<boolean>(false);

    useEffect(() => {
        if (!isEmpty(userRatings)) setHasUserRated(true);
    }, [userRatings]);

    useEffect(() => {
        setHasUserRated(false);
        if (video.slug) dispatch(getSingleVideoRatedByUserAction(video.slug));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Row data-theme={value} className={styles.videoPlayer}>
            <Col span={24} className={styles.videoPlayer__container} data-video-loaded={videoLoaded}>
                {videoLoaded === false ? <Spin size="large" indicator={<LoadingOutlined spin />} /> : null}
                <ReactPlayer
                    playing
                    controls
                    width={'100%'}
                    height={'100%'}
                    url={video.link}
                    onReady={() => setVideoLoaded(true)}
                    onEnded={() => {
                        !hasUserRated && setOpenRatingModal(true);
                    }}
                    onPause={() => {
                        !hasUserRated && setOpenRatingModal(true);
                    }}
                    className={styles.videoPlayer__container__player}
                />
            </Col>
            <Col span={24} className={styles.videoPlayer__footer}>
                <div className="d-flex justify-content-between">
                    {video.tags && <DynamicVideoTagsList tags={video.tags} />}
                    <DynamicSharePopover
                        slug={video.slug}
                        link={sharedLink}
                        title={video.title}
                        open={openSharePopover}
                        setOpen={setOpenSharePopover}
                    >
                        <Button data-share-button icon={<FaShare />} type={isDark ? 'default' : 'primary'} ghost>
                            {t('share')}
                        </Button>
                    </DynamicSharePopover>
                </div>
                <Text data-title>{video.title}</Text>
                <Text data-views className="my-2">
                    {numeral(viewCount).format('0,0')} {t('views')} -{' '}
                    {upperFirst(dayjs(publishedAt).format('MMM D, YYYY'))}
                </Text>
                <DynamicSingleVideoAction video={video} youtubeVideoEntity={youtubeVideoEntity as IItemsEntity} />
            </Col>
            <DynamicVideoRatingModal slug={video.slug} openModal={openRatingModal} setOpenModal={setOpenRatingModal} />
        </Row>
    );
};

export default VideoPlayer;
