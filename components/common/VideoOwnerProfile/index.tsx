import React, { FC, Fragment } from 'react';
import { Avatar, Space, Typography } from 'antd';

const { Text } = Typography;

export interface IVideoOwnerProfileProps {
    channel: string;
    subscribers: number;
    avatarLink: string;
}

const VideoOwnerProfile: FC<IVideoOwnerProfileProps> = ({ channel, subscribers, avatarLink }) => {
    return (
        <Fragment>
            <Space>
                <Avatar size={48} src={avatarLink} />
                <div>
                    <Text data-channel>{channel}</Text>
                    <Text data-subscribers>{subscribers} subscribers</Text>
                </div>
            </Space>
        </Fragment>
    );
};

export default VideoOwnerProfile;
