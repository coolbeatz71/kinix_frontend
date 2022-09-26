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
            type="link"
            data-theme={value}
            icon={<ShareAltOutlined />}
            className={styles.videoShareButton}
            onClick={() => console.log('clicked')}
        >
            &nbsp;{count > 0 ? count : ''}
        </Button>
    );
};

export default VideoShareButton;
