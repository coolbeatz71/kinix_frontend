import React, { Fragment, FC, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IRootState } from '@redux/reducers';
import { RiFocusLine } from 'react-icons/ri';
import { useAppDispatch } from '@redux/store';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { FaMicrophoneAlt, FaPodcast } from 'react-icons/fa';
import { BulbFilled, VideoCameraFilled, FireFilled } from 'icons';
import getVideosFeedAction from '@redux/videos/feed';
import AdsCarousel from '@components/home/AdsCarousel';
import HomeVideoSection from '@components/home/VideoSection';
import HomeIllustration from '@components/home/MainIllustration';
import AlaUneArticleSection from '@components/home/AlaUneArticleSection';

const DynamicServerError = dynamic(() => import('@components/common/ServerError'));

const HomeContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { data: videos, error, loading, fetched } = useSelector(({ videos: { feed } }: IRootState) => feed);

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
                    <DynamicServerError error={error} onRefresh={loadVideoFeed} />
                </div>
            ) : (
                <Fragment>
                    <div className="my-5">
                        <HomeVideoSection
                            icon={<BulbFilled />}
                            linkHasMore="/videos?"
                            title={t('discovery')}
                            videos={videos?.discovery}
                            loading={loading && !fetched}
                        />
                    </div>

                    <div className="my-5">
                        <HomeVideoSection
                            title={t('popular')}
                            icon={<FireFilled />}
                            linkHasMore="/videos?"
                            videos={videos?.popular}
                            loading={loading && !fetched}
                        />
                    </div>

                    <div className="my-5">
                        <HomeVideoSection
                            linkHasMore="/videos?"
                            title={t('musicVideos')}
                            videos={videos?.musicVideo}
                            icon={<VideoCameraFilled />}
                            loading={loading && !fetched}
                        />
                    </div>

                    <div className="my-5">
                        <HomeVideoSection
                            isExclusive
                            title="FlexBeatz"
                            linkHasMore="/videos?"
                            videos={videos?.flexBeatz}
                            icon={<BsFillSpeakerFill />}
                            loading={loading && !fetched}
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
                            icon={<FaPodcast />}
                            linkHasMore="/videos?"
                            videos={videos?.podcast}
                            loading={loading && !fetched}
                        />
                    </div>

                    <div className="my-5">
                        <HomeVideoSection
                            isExclusive
                            title="Interview"
                            linkHasMore="/videos?"
                            icon={<FaMicrophoneAlt />}
                            videos={videos?.interview}
                            loading={loading && !fetched}
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
                            icon={<RiFocusLine />}
                            linkHasMore="/videos?"
                            videos={videos?.leFocus}
                            loading={loading && !fetched}
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
