import React, { FC } from 'react';
import { Button } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import useDarkLight from '@hooks/useDarkLight';
import styles from './index.module.scss';

export interface IArticleCommentButtonProps {
    slug: string;
    count: number;
}

const ArticleCommentButton: FC<IArticleCommentButtonProps> = ({ slug: _, count }) => {
    const { value } = useDarkLight();

    return (
        <Button
            type="text"
            data-theme={value}
            className={styles.articleCommentButton}
            onClick={() => console.log('clicked')}
            icon={<CommentOutlined />}
        >
            &nbsp;{count}
        </Button>
    );
};

export default ArticleCommentButton;
