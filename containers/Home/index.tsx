import React, { Fragment, FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import HomeIllustration from '@components/home/MainIllustration';
import HomeVideoSection from '@components/home/VideoSection';
import { RiFocusLine } from 'react-icons/ri';
import { BulbFilled, VideoCameraFilled, FireFilled } from '@ant-design/icons';
import { useAppDispatch } from '@redux/store';
import { FaMicrophoneAlt, FaPodcast } from 'react-icons/fa';
import { BsFillSpeakerFill } from 'react-icons/bs';
import AlaUneArticleSection from '@components/home/AlaUneArticleSection';
import AdsCarousel from '@components/home/AdsCarousel';
import ServerError from '@components/common/ServerError';
import getVideosFeedAction from '@redux/videos/feed';

const HomeContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { data: videos, error, loading } = useSelector(({ videos: { feed } }: IRootState) => feed);

    const loadVideoFeed = useCallback(() => {
        dispatch(getVideosFeedAction());
    }, [dispatch]);

    useEffect(() => {
        loadVideoFeed();
    }, [loadVideoFeed]);

    return (
        <Fragment>
            <HomeIllustration />
            <div className="mt-5">
                <AdsCarousel />
            </div>

            <div className="mt-5">
                <AlaUneArticleSection />
            </div>
            {error ? (
                <div className="mt-5">
                    <ServerError error={error} onRefresh={loadVideoFeed} />
                </div>
            ) : (
                <Fragment>
                    <div className="my-5">
                        <HomeVideoSection
                            loading={loading}
                            icon={<BulbFilled />}
                            linkHasMore="/videos?"
                            title={t('discovery')}
                            videos={videos?.discovery}
                        />
                    </div>

                    <div className="my-5">
                        <HomeVideoSection
                            loading={loading}
                            title={t('popular')}
                            icon={<FireFilled />}
                            linkHasMore="/videos?"
                            videos={videos?.popular}
                        />
                    </div>

                    <div className="my-5">
                        <HomeVideoSection
                            loading={loading}
                            linkHasMore="/videos?"
                            title={t('musicVideos')}
                            icon={<VideoCameraFilled />}
                            videos={videos?.musicVideo}
                        />
                    </div>

                    <div className="my-5">
                        <HomeVideoSection
                            isExclusive
                            title="FlexBeatz"
                            loading={loading}
                            linkHasMore="/videos?"
                            videos={videos?.flexBeatz}
                            icon={<BsFillSpeakerFill />}
                            sessionDetails={{
                                link: '/videos?',
                                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, ex sapiente dignissimos aspernatur ipsam voluptas quam omnis qui corporis ducimus. Qui aperiam earum necessitatibus placeat maiores obcaecati cupiditate quas animi.`,
                                title: 'This week on FlexBeatz',
                                imgSrc: 'https://picsum.photos/1024/1024',
                            }}
                        />
                    </div>

                    <div className="my-5">
                        <HomeVideoSection
                            title="Podcast"
                            loading={loading}
                            icon={<FaPodcast />}
                            linkHasMore="/videos?"
                            videos={videos?.podcast}
                        />
                    </div>

                    <div className="my-5">
                        <HomeVideoSection
                            isExclusive
                            loading={loading}
                            title="Interview"
                            linkHasMore="/videos?"
                            icon={<FaMicrophoneAlt />}
                            videos={videos?.interview}
                            sessionDetails={{
                                link: '/videos?',
                                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, ex sapiente dignissimos aspernatur ipsam voluptas quam omnis qui corporis ducimus. Qui aperiam earum necessitatibus placeat maiores obcaecati cupiditate quas animi.`,
                                title: 'This week on LeFocus',
                                imgSrc: 'https://picsum.photos/1024/1024',
                            }}
                        />
                    </div>

                    <div className="my-5">
                        <HomeVideoSection
                            isExclusive
                            title="LeFocus"
                            loading={loading}
                            icon={<RiFocusLine />}
                            linkHasMore="/videos?"
                            videos={videos?.leFocus}
                            sessionDetails={{
                                link: '/videos?',
                                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, ex sapiente dignissimos aspernatur ipsam voluptas quam omnis qui corporis ducimus. Qui aperiam earum necessitatibus placeat maiores obcaecati cupiditate quas animi.`,
                                title: 'This week on LeFocus',
                                imgSrc: 'https://picsum.photos/1024/1024',
                            }}
                        />
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default HomeContainer;
