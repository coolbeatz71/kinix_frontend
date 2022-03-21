import React from 'react';

import { TwitterOutlined, InstagramFilled, FacebookFilled, YoutubeFilled } from '@ant-design/icons';
import { MdEmail } from 'react-icons/md';
import { HiOutlineLink } from 'react-icons/hi';

const social = [
    {
        name: 'twitter',
        icon: <TwitterOutlined className="twitter" />,
        url: 'link',
    },
    {
        name: 'instagram',
        icon: <InstagramFilled className="instagram" />,
        url: 'link',
    },
    {
        name: 'facebook',
        icon: <FacebookFilled className="facebook" />,
        url: 'link',
    },
    {
        name: 'youtube',
        icon: <YoutubeFilled className="youtube" />,
        url: 'link',
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
