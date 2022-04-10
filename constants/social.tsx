import React from 'react';

import { TwitterOutlined, InstagramFilled, FacebookFilled, YoutubeFilled } from '@ant-design/icons';
import { MdEmail } from 'react-icons/md';
import { HiOutlineLink } from 'react-icons/hi';

const TWITTER_URL = 'https://twitter.com/coolbeatz71';
const INSTAGRAM_URL = 'https://www.instagram.com/glodymutomboriy/';
const FACEBOOK_URL = 'https://www.facebook.com/coolbeatzofficiel';
const YOUTUBE_URL = 'https://www.youtube.com/channel/UChOt1KgBvYF3cVdQ5WFkXYQ?sub_confirmation=1';

const social = [
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

export const socialShare = [
    social[0],
    social[2],
    {
        name: 'email',
        icon: <MdEmail className="email" />,
    },
    {
        name: 'copy',
        icon: <HiOutlineLink className="copy" />,
    },
];

export default social;
