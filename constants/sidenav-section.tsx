import React, { ReactNode } from 'react';
import { BsFillSpeakerFill } from 'react-icons/bs';
import { FaMicrophoneAlt, FaPodcast } from 'react-icons/fa';
import { RiPlayList2Fill, RiFocusLine, RiBookmark3Fill, RiArticleLine } from 'react-icons/ri';
import { VideoCameraFilled, LikeFilled, ShareAltOutlined, StarFilled } from '@ant-design/icons';
import {
    PODCAST_PATH,
    LEFOCUS_PATH,
    FLEXBEATZ_PATH,
    INTERVIEW_PATH,
    MUSIC_VIDEO_PATH,
    ALL_ARTICLES_PATH,
    USER_VIDEOS_RATED_PATH,
    USER_VIDEOS_SHARED_PATH,
    USER_ARTICLES_LIKED_PATH,
    USER_VIDEOS_PLAYLIST_PATH,
    USER_ARTICLES_BOOKMARK_PATH,
} from './paths';

interface ISideNavSection {
    text: string;
    href: string;
    icon: ReactNode;
}

export const GENERAL_SECTIONS: ISideNavSection[] = [
    {
        text: 'musicVideos',
        icon: <VideoCameraFilled />,
        href: MUSIC_VIDEO_PATH,
    },
    {
        text: 'article',
        href: ALL_ARTICLES_PATH,
        icon: <RiArticleLine />,
    },
    {
        text: 'interview',
        icon: <FaMicrophoneAlt />,
        href: INTERVIEW_PATH,
    },
    {
        text: 'podcast',
        icon: <FaPodcast />,
        href: PODCAST_PATH,
    },
    {
        text: 'lefocus',
        icon: <RiFocusLine />,
        href: LEFOCUS_PATH,
    },
    {
        icon: <BsFillSpeakerFill />,
        text: 'flexBeatz',
        href: FLEXBEATZ_PATH,
    },
];

export const FAVORITE_SECTIONS: ISideNavSection[] = [
    {
        icon: <RiPlayList2Fill />,
        text: 'playlist',
        href: USER_VIDEOS_PLAYLIST_PATH,
    },
    {
        icon: <RiBookmark3Fill />,
        text: 'bookmarks',
        href: USER_ARTICLES_BOOKMARK_PATH,
    },
    {
        icon: <LikeFilled />,
        text: 'likedArticle',
        href: USER_ARTICLES_LIKED_PATH,
    },
    {
        icon: <ShareAltOutlined />,
        text: 'sharedVideo',
        href: USER_VIDEOS_SHARED_PATH,
    },
    {
        icon: <StarFilled />,
        text: 'ratedVideo',
        href: USER_VIDEOS_RATED_PATH,
    },
];

export default [
    { key: 'general', title: 'generalSection', sub: GENERAL_SECTIONS },
    { key: 'favorite', title: 'favoriteSection', sub: FAVORITE_SECTIONS },
];
