import React, { ReactNode } from 'react';

import { MdPodcasts, MdCenterFocusStrong, MdSpeaker } from 'react-icons/md';

import { AudioFilled, BulbFilled, ReadFilled, VideoCameraFilled } from '@ant-design/icons';

interface IPopularSection {
    icon: ReactNode;
    text: string;
    href: string;
}

export const POPULAR_SECTIONS: IPopularSection[] = [
    {
        icon: <BulbFilled />,
        text: 'Discover',
        href: '/videos?section=discover',
    },
    {
        icon: <VideoCameraFilled />,
        text: 'Music Video',
        href: '/videos?section=discover',
    },
    {
        icon: <ReadFilled />,
        text: 'Article',
        href: '/videos?section=discover',
    },
    {
        icon: <AudioFilled />,
        text: 'Interview',
        href: '/videos?section=discover',
    },
    {
        icon: <MdPodcasts />,
        text: 'Podcast',
        href: '/videos?section=discover',
    },
    {
        icon: <MdCenterFocusStrong />,
        text: 'LeFocus',
        href: '/videos?section=discover',
    },
    {
        icon: <MdSpeaker />,
        text: 'Flex&Beatz',
        href: '/videos?section=discover',
    },
];
