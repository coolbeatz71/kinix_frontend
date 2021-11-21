import React, { ReactNode } from 'react';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { FaMicrophoneAlt, FaPodcast } from 'react-icons/fa';
import { VideoCameraFilled, LikeFilled, ShareAltOutlined, StarFilled } from '@ant-design/icons';
import { RiPlayList2Fill, RiFocusLine, RiBookmark3Fill, RiArticleLine } from 'react-icons/ri';

interface ISideNavSection {
    icon: ReactNode;
    text: string;
    href: string;
}

export const GENERAL_SECTIONS: ISideNavSection[] = [
    {
        icon: <VideoCameraFilled />,
        text: 'Music Video',
        href: '/videos?category=music-videos',
    },
    {
        icon: <RiArticleLine />,
        text: 'Article',
        href: '/articles',
    },
    {
        icon: <FaMicrophoneAlt />,
        text: 'Interview',
        href: '/videos?category=interviews',
    },
    {
        icon: <FaPodcast />,
        text: 'Podcast',
        href: '/videos?category=podcast',
    },
    {
        icon: <RiFocusLine />,
        text: 'LeFocus',
        href: '/videos?category=lefocus',
    },
    {
        icon: <BsFillSpeakerFill />,
        text: 'Flex&Beatz',
        href: '/videos?category=flex&beatz',
    },
];

export const FAVORITE_SECTIONS: ISideNavSection[] = [
    {
        icon: <RiPlayList2Fill />,
        text: 'Playlists',
        href: '/user/playlist',
    },
    {
        icon: <RiBookmark3Fill />,
        text: 'Bookmarks',
        href: '/user/article?category=bookmarked',
    },
    {
        icon: <LikeFilled />,
        text: 'Liked Articles',
        href: '/user/article?category=liked',
    },
    {
        icon: <ShareAltOutlined />,
        text: 'Shared Videos',
        href: '/user/videos?category=shared',
    },
    {
        icon: <StarFilled />,
        text: 'Rated Videos',
        href: '/user/videos?category=shared',
    },
];

export default [
    { key: 'general', title: 'GENERAL SECTION', sub: GENERAL_SECTIONS },
    { key: 'favorite', title: 'FAVORITE SECTION', sub: FAVORITE_SECTIONS },
];
