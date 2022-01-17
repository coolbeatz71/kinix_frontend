import { FC } from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import useDarkLight from '@hooks/useDarkLight';

const { Meta } = Card;

const VideoCardVertical: FC<{ size: number }> = ({ size }) => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.videoCardVertical}>
            <Card
                hoverable
                bordered={false}
                cover={
                    <img
                        alt="example"
                        src={`https://picsum.photos/200/300?random=${size}`}
                        style={{
                            aspectRatio: '16 / 9',
                            objectFit: 'cover',
                        }}
                    />
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="The Internet's Own Boy: The Story of Aaron Swartz | full movie (2014)"
                    description="moviemaniacsDE"
                />
            </Card>
        </div>
    );
};

export default VideoCardVertical;
