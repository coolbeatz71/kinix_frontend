import React, { Fragment, FC } from 'react';
import { useTranslation } from 'react-i18next';
import HomeIllustration from '@components/home/MainIllustration';
import HomeVideoSection from '@components/home/VideoSection';
import { BulbFilled, VideoCameraFilled } from '@ant-design/icons';
import { FaMicrophoneAlt, FaPodcast } from 'react-icons/fa';
import { RiFocusLine } from 'react-icons/ri';
import { BsFillSpeakerFill } from 'react-icons/bs';
import AlaUneArticleSection from '@components/home/AlaUneArticleSection';
import AdsCarousel from '@components/home/AdsCarousel';

const HomeContainer: FC = () => {
    const { t } = useTranslation();
    return (
        <Fragment>
            <HomeIllustration />
            <div className="mt-5">
                <AdsCarousel />
            </div>

            <div className="mt-5">
                <AlaUneArticleSection fetched error={null} articles={[]} />
            </div>

            <div className="mt-5">
                <HomeVideoSection
                    fetched
                    title={t('discovery')}
                    icon={<BulbFilled />}
                    error={null}
                    videos={[]}
                    linkHasMore="/videos?"
                />
            </div>

            <div className="mt-5">
                <HomeVideoSection
                    fetched
                    title={t('musicVideos')}
                    icon={<VideoCameraFilled />}
                    error={null}
                    videos={[]}
                    hasExclusive
                    linkHasMore="/videos?"
                />
            </div>

            <div className="mt-5">
                <HomeVideoSection
                    fetched
                    title="FlexNBeatz"
                    icon={<BsFillSpeakerFill />}
                    error={null}
                    videos={[]}
                    linkHasMore="/videos?"
                    hasExclusive
                    exclusive={{
                        link: '/videos?',
                        desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, ex sapiente dignissimos aspernatur ipsam voluptas quam omnis qui corporis ducimus. Qui aperiam earum necessitatibus placeat maiores obcaecati cupiditate quas animi.`,
                        title: 'This week on FlexNBeatz',
                        imgSrc: 'https://picsum.photos/1024/1024',
                        videos: [],
                    }}
                />
            </div>

            <div className="mt-5">
                <HomeVideoSection
                    fetched
                    title="Podcast"
                    icon={<FaPodcast />}
                    error={null}
                    videos={[]}
                    linkHasMore="/videos?"
                />
            </div>

            <div className="mt-5">
                <HomeVideoSection
                    fetched
                    title="Interview"
                    icon={<FaMicrophoneAlt />}
                    error={null}
                    videos={[]}
                    linkHasMore="/videos?"
                />
            </div>

            <div className="mt-5">
                <HomeVideoSection
                    fetched
                    title="LeFocus"
                    icon={<RiFocusLine />}
                    error={null}
                    videos={[]}
                    linkHasMore="/videos?"
                    hasExclusive
                />
            </div>
        </Fragment>
    );
};

export default HomeContainer;
