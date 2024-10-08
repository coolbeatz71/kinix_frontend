import React from 'react';

import { TwitterOutlined, InstagramFilled, FacebookFilled, YoutubeFilled, WhatsAppOutlined } from 'icons';
import { MdEmail } from 'react-icons/md';
import { HiOutlineLink } from 'react-icons/hi';

export const TWITTER_URL = 'https://twitter.com/coolbeatz71';
export const FACEBOOK_URL = 'https://www.facebook.com/kinshasart';
export const INSTAGRAM_URL = 'https://www.instagram.com/kinshas_art/';
export const YOUTUBE_URL = 'https://www.youtube.com/channel/UCu-5xpKCQmOtTMPN5CeW-hg?sub_confirmation=1';

export type IShareType = 'facebook' | 'whatsapp' | 'twitter' | 'email' | 'copy';

export interface ISocialIcon {
    name: string;
    icon: JSX.Element;
    url?: string;
}

const social: ISocialIcon[] = [
    {
        name: 'twitter',
        icon: <TwitterOutlined className="twitter" />,
        url: TWITTER_URL,
    },
    {
        name: 'instagram',
        icon: <InstagramFilled className="instagram" />,
        url: INSTAGRAM_URL,
    },
    {
        name: 'facebook',
        icon: <FacebookFilled className="facebook" />,
        url: FACEBOOK_URL,
    },
    {
        name: 'youtube',
        icon: <YoutubeFilled className="youtube" />,
        url: YOUTUBE_URL,
    },
];

export const shareList: ISocialIcon[] = [
    {
        name: 'email',
        icon: <MdEmail className="email" />,
    },
    social[0],
    social[2],
    {
        name: 'whatsapp',
        icon: <WhatsAppOutlined className="whatsapp" />,
    },
    {
        name: 'copy',
        icon: <HiOutlineLink className="copy" />,
    },
];

export default social;
