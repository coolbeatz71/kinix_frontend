import React, { FC } from 'react';
import { Button } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import useDarkLight from '@hooks/useDarkLight';

export interface IVideoShareButtonProps {
    count: number;
}

const VideoShareButton: FC<IVideoShareButtonProps> = ({ count }) => {
    const { value } = useDarkLight();

    return (
        <Button
            type="text"
            data-theme={value}
            className={styles.videoShareButton}
            onClick={() => console.log('clicked')}
            icon={<ShareAltOutlined />}
        >
            &nbsp;{count > 0 ? count : ''}
        </Button>
    );
};

export default VideoShareButton;
