import React, { FC, Fragment } from 'react';
import { Avatar, Space, Typography } from 'antd';

const { Text } = Typography;

export interface IVideoOwnerProfileProps {
    channel: string;
    subscribers: number;
    avatarLink: string;
}

const VideoOwnerProfile: FC<IVideoOwnerProfileProps> = ({ channel, subscribers, avatarLink }) => {
    const size = { xs: 36, sm: 42, md: 48 };
    return (
        <Fragment>
            <Space>
                <Avatar size={size} src={avatarLink} />
                <div>
                    <Text data-channel>{channel}</Text>
                    <Text data-subscribers>{subscribers} subscribers</Text>
                </div>
            </Space>
        </Fragment>
    );
};

export default VideoOwnerProfile;
