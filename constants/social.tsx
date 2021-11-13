import React from 'react';

import { TwitterOutlined, InstagramFilled, FacebookFilled, YoutubeFilled } from '@ant-design/icons';

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

export default social;
