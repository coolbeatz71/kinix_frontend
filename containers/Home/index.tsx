import React, { Fragment, FC } from 'react';
import HomeIllustration from '@components/Home/MainIllustration';
import HomeVideoSection from '@components/Home/VideoSection';
import { BulbFilled, VideoCameraFilled } from '@ant-design/icons';
import { FaMicrophoneAlt, FaPodcast } from 'react-icons/fa';
import { RiFocusLine } from 'react-icons/ri';
import { BsFillSpeakerFill } from 'react-icons/bs';
import AlaUneArticleSection from '@components/Home/AlaUneArticleSection';

const HomeContainer: FC = () => {
    return (
        <Fragment>
            <HomeIllustration />

            <div className="mt-5">
                <AlaUneArticleSection fetched error={null} articles={[]} />
            </div>

            <div className="mt-5">
                <HomeVideoSection
                    fetched
                    title="Discovery"
                    icon={<BulbFilled />}
                    error={null}
                    videos={[]}
                    linkHasMore="/videos?"
                />
            </div>

            <div className="mt-5">
                <HomeVideoSection
                    fetched
                    title="Music Videos"
                    icon={<VideoCameraFilled />}
                    error={null}
                    videos={[]}
                    linkHasMore="/videos?"
                />
            </div>

            <div className="mt-5">
                <HomeVideoSection
                    fetched
                    title="Flex&Beatz"
                    icon={<BsFillSpeakerFill />}
                    error={null}
                    videos={[]}
                    linkHasMore="/videos?"
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
                />
            </div>
        </Fragment>
    );
};

export default HomeContainer;
