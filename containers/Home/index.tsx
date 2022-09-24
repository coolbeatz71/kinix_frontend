import React, { Fragment, FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import HomeIllustration from '@components/home/MainIllustration';
import HomeVideoSection from '@components/home/VideoSection';
import { BulbFilled, VideoCameraFilled } from '@ant-design/icons';
import { useAppDispatch } from '@redux/store';
import { FaMicrophoneAlt, FaPodcast } from 'react-icons/fa';
import { RiFocusLine, RiFireFill } from 'react-icons/ri';
import { BsFillSpeakerFill } from 'react-icons/bs';
import AlaUneArticleSection from '@components/home/AlaUneArticleSection';
import AdsCarousel from '@components/home/AdsCarousel';
import ServerError from '@components/common/ServerError';
import getVideosFeedAction from '@redux/videos/feed';

const HomeContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { data: videos, fetched, error } = useSelector(({ videos: { feed } }: IRootState) => feed);

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
            {!error ? (
                <div className="mt-5">
                    <ServerError onRefresh={loadVideoFeed} />
                </div>
            ) : (
                <Fragment>
                    <div className="mt-5">
                        <HomeVideoSection
                            fetched={fetched}
                            icon={<BulbFilled />}
                            linkHasMore="/videos?"
                            title={t('discovery')}
                            videos={videos?.discovery}
                        />
                    </div>

                    <div className="mt-5">
                        <HomeVideoSection
                            fetched={fetched}
                            title={t('popular')}
                            icon={<RiFireFill />}
                            linkHasMore="/videos?"
                            videos={videos?.popular}
                        />
                    </div>

                    <div className="mt-5">
                        <HomeVideoSection
                            fetched={fetched}
                            linkHasMore="/videos?"
                            title={t('musicVideos')}
                            icon={<VideoCameraFilled />}
                            videos={videos?.musicVideo}
                        />
                    </div>

                    <div className="mt-5">
                        <HomeVideoSection
                            fetched={fetched}
                            title="FlexBeatz"
                            icon={<BsFillSpeakerFill />}
                            videos={[]}
                            linkHasMore="/videos?"
                            hasExclusive
                            exclusive={{
                                link: '/videos?',
                                desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, ex sapiente dignissimos aspernatur ipsam voluptas quam omnis qui corporis ducimus. Qui aperiam earum necessitatibus placeat maiores obcaecati cupiditate quas animi.`,
                                title: 'This week on FlexBeatz',
                                imgSrc: 'https://picsum.photos/1024/1024',
                            }}
                        />
                    </div>

                    <div className="mt-5">
                        <HomeVideoSection
                            fetched={fetched}
                            title="Podcast"
                            icon={<FaPodcast />}
                            videos={[]}
                            linkHasMore="/videos?"
                        />
                    </div>

                    <div className="mt-5">
                        <HomeVideoSection
                            fetched={fetched}
                            title="Interview"
                            icon={<FaMicrophoneAlt />}
                            videos={[]}
                            linkHasMore="/videos?"
                        />
                    </div>

                    <div className="mt-5">
                        <HomeVideoSection
                            fetched={fetched}
                            title="LeFocus"
                            icon={<RiFocusLine />}
                            videos={[]}
                            linkHasMore="/videos?"
                            hasExclusive
                            exclusive={{
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
