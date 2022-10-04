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
            icon={<CommentOutlined />}
            onClick={() => console.log('clicked')}
            className={styles.articleCommentButton}
        >
            &nbsp;{count > 0 ? count : ''}
        </Button>
    );
};

export default ArticleCommentButton;
