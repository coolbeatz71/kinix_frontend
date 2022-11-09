import { FC, Fragment } from 'react';

import Space from 'antd/lib/space';
import Avatar from 'antd/lib/avatar';
import Typography from 'antd/lib/typography';

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
