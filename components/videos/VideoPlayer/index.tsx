import { FC, useEffect, useState, Fragment, ReactElement } from 'react';
import dayjs from 'dayjs';
import numeral from 'numeral';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import ReactPlayer from 'react-player';
import { FaShare } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from 'icons';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Spin from 'antd/lib/spin';
import Grid from 'antd/lib/grid';
import Affix from 'antd/lib/affix';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';

import { IVideo } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import { HEADER_HEIGHT } from '@constants/app';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import getPlatformUrl from '@helpers/getPlatformUrl';
import { IItemsEntity, IYoutubeVideo } from '@interfaces/youtube';
import getSingleVideoRatedByUserAction from '@redux/ratings/single';

const DynamicVideoTagsList = dynamic(() => import('@components/lists/VideoTagsList'));
const DynamicSharePopover = dynamic(() => import('@components/sharings/SharePopover'));
const DynamicVideoRatingModal = dynamic(() => import('@components/modal/VideoRatingModal'));
const DynamicSingleVideoAction = dynamic(() => import('@components/actions/SingleVideoAction'));

import styles from './index.module.scss';

const { Text } = Typography;
const { useBreakpoint } = Grid;

export interface IVideoPlayerProps {
    video: IVideo;
    youtubeVideo: IYoutubeVideo;
}

const VideoPlayer: FC<IVideoPlayerProps> = ({ youtubeVideo, video }) => {
    const { t } = useTranslation();
    const { xs, sm, md } = useBreakpoint();
    const dispatch = useAppDispatch();
    const { value, isDark } = useDarkLight();
    const sharedLink = `${getPlatformUrl()}${ALL_VIDEOS_PATH}/${video.slug}`;

    const { data: userRatings } = useSelector(({ ratings: { single } }: IRootState) => single);

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

    const ActionWrapper: FC<{ children: ReactElement }> = ({ children }) => (
        <div className="w-100">
            {(xs || sm) && !md ? <Affix offsetTop={HEADER_HEIGHT}>{children}</Affix> : children}
        </div>
    );

    return (
        <Row data-theme={value} className={styles.videoPlayer}>
            <ActionWrapper>
                <Fragment>
                    <Col span={24} className={styles.videoPlayer__container} data-video-loaded={videoLoaded}>
                        {videoLoaded === false ? <Spin size="large" indicator={<LoadingOutlined spin />} /> : null}
                        <div>
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
                        </div>
                    </Col>
                    <Col span={24} className={styles.videoPlayer__footer}>
                        <Row className="d-flex justify-content-between">
                            {video.tags && (
                                <Col xs={24} sm={24} md={16}>
                                    <DynamicVideoTagsList tags={video.tags} />
                                </Col>
                            )}
                            <Col xs={24} sm={24} md={8} className="d-flex justify-content-start">
                                <DynamicSharePopover
                                    slug={video.slug}
                                    link={sharedLink}
                                    title={video.title}
                                    open={openSharePopover}
                                    setOpen={setOpenSharePopover}
                                >
                                    <Button
                                        ghost
                                        data-share-button
                                        icon={<FaShare />}
                                        type={isDark ? 'default' : 'primary'}
                                        size={(xs || sm) && !md ? 'middle' : 'small'}
                                    >
                                        {t('share')}
                                    </Button>
                                </DynamicSharePopover>
                            </Col>
                        </Row>
                        <Text data-title>{video.title}</Text>
                        <Text data-views className="my-2">
                            {numeral(viewCount).format('0,0')} {t('views')} -{' '}
                            {upperFirst(dayjs(publishedAt).format('MMM D, YYYY'))}
                        </Text>
                        <DynamicSingleVideoAction
                            video={video}
                            youtubeVideoEntity={youtubeVideoEntity as IItemsEntity}
                        />
                    </Col>
                </Fragment>
            </ActionWrapper>
            <DynamicVideoRatingModal slug={video.slug} openModal={openRatingModal} setOpenModal={setOpenRatingModal} />
        </Row>
    );
};

export default VideoPlayer;
