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
        text: 'musicVideos',
        href: '/videos?category=music-videos',
    },
    {
        icon: <RiArticleLine />,
        text: 'article',
        href: '/articles',
    },
    {
        icon: <FaMicrophoneAlt />,
        text: 'interview',
        href: '/videos?category=interviews',
    },
    {
        icon: <FaPodcast />,
        text: 'podcast',
        href: '/videos?category=podcast',
    },
    {
        icon: <RiFocusLine />,
        text: 'lefocus',
        href: '/videos?category=lefocus',
    },
    {
        icon: <BsFillSpeakerFill />,
        text: 'flexBeatz',
        href: '/videos?category=flex&beatz',
    },
];

export const FAVORITE_SECTIONS: ISideNavSection[] = [
    {
        icon: <RiPlayList2Fill />,
        text: 'playlist',
        href: '/user/playlist',
    },
    {
        icon: <RiBookmark3Fill />,
        text: 'bookmarks',
        href: '/user/article?category=bookmarked',
    },
    {
        icon: <LikeFilled />,
        text: 'likedArticle',
        href: '/user/article?category=liked',
    },
    {
        icon: <ShareAltOutlined />,
        text: 'sharedVideo',
        href: '/user/videos?category=shared',
    },
    {
        icon: <StarFilled />,
        text: 'ratedVideo',
        href: '/user/videos?category=shared',
    },
];

export default [
    { key: 'general', title: 'generalSection', sub: GENERAL_SECTIONS },
    { key: 'favorite', title: 'favoriteSection', sub: FAVORITE_SECTIONS },
];
