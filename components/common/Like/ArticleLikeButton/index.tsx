import React, { FC } from 'react';
import { Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import useDarkLight from '@hooks/useDarkLight';
import styles from './index.module.scss';

export interface IArticleLikeButtonProps {
    slug: string;
    count: number;
}

const ArticleLikeButton: FC<IArticleLikeButtonProps> = ({ slug: _, count }) => {
    const { value } = useDarkLight();

    return (
        <Button
            type="text"
            data-theme={value}
            icon={<HeartOutlined />}
            className={styles.articleLikeButton}
            onClick={() => console.log('clicked')}
        >
            &nbsp;{count > 0 ? count : ''}
        </Button>
    );
};

export default ArticleLikeButton;
