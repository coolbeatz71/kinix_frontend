import React, { Fragment, FC } from 'react';
import HomeIllustration from '@components/Home/MainIllustration';
import HomeSection from '@components/Home/Section';
import { BulbFilled, VideoCameraFilled } from '@ant-design/icons';
import { FaMicrophoneAlt, FaPodcast } from 'react-icons/fa';
import { RiFocusLine } from 'react-icons/ri';
import { BsFillSpeakerFill } from 'react-icons/bs';

const HomeContainer: FC = () => {
    return (
        <Fragment>
            <HomeIllustration />

            <div className="mt-4">
                <HomeSection
                    fetched
                    title="Discovery"
                    icon={<BulbFilled />}
                    error={null}
                    data={[]}
                    linkHasMore="/videos?"
                />
            </div>

            <div className="mt-4">
                <HomeSection
                    fetched
                    title="Music Videos"
                    icon={<VideoCameraFilled />}
                    error={null}
                    data={[]}
                    linkHasMore="/videos?"
                />
            </div>

            <div className="mt-4">
                <HomeSection
                    fetched
                    title="Flex&Beatz"
                    icon={<BsFillSpeakerFill />}
                    error={null}
                    data={[]}
                    linkHasMore="/videos?"
                />
            </div>

            <div className="mt-4">
                <HomeSection
                    fetched
                    title="Podcast"
                    icon={<FaPodcast />}
                    error={null}
                    data={[]}
                    linkHasMore="/videos?"
                />
            </div>

            <div className="mt-4">
                <HomeSection
                    fetched
                    title="Interview"
                    icon={<FaMicrophoneAlt />}
                    error={null}
                    data={[]}
                    linkHasMore="/videos?"
                />
            </div>

            <div className="mt-4">
                <HomeSection
                    fetched
                    title="LeFocus"
                    icon={<RiFocusLine />}
                    error={null}
                    data={[]}
                    linkHasMore="/videos?"
                />
            </div>
        </Fragment>
    );
};

export default HomeContainer;
