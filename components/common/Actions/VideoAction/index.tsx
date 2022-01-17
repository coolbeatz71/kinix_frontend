import React, { FC } from 'react';
import { Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import useDarkLight from '@hooks/useDarkLight';
import styles from './index.module.scss';

export interface IVideoActionProps {
    slug: string;
}

const VideoAction: FC<IVideoActionProps> = ({ slug: _ }) => {
    const { value } = useDarkLight();

    return (
        <Button
            type="text"
            data-theme={value}
            className={styles.videoAction}
            onClick={() => console.log('clicked')}
            icon={<EllipsisOutlined />}
        />
    );
};

export default VideoAction;
