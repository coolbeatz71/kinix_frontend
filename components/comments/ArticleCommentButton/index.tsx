import React, { FC, useState, useEffect } from 'react';
import numeral from 'numeral';
import { Button } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import useDarkLight from '@hooks/useDarkLight';
import { CommentOutlined } from 'icons';

import styles from './index.module.scss';

export interface IArticleCommentButtonProps {
    count: number;
    onClick: () => void;
    articleId: number | undefined;
}

const ArticleCommentButton: FC<IArticleCommentButtonProps> = ({ articleId, count, onClick }) => {
    const { value } = useDarkLight();
    const [commentCount, setCommentCount] = useState(count);

    const { data: allComments } = useSelector(({ comments: { all } }: IRootState) => all);
    const { data: addedComment } = useSelector(({ comments: { add } }: IRootState) => add);

    const comments = numeral(commentCount).format('0.[00]a');

    useEffect(() => {
        const articleMatch = articleId === addedComment?.articleId;
        const canUpdateCount = !isEmpty(allComments) && !isEmpty(addedComment) && articleMatch;
        if (canUpdateCount) setCommentCount(allComments?.count);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allComments]);

    return (
        <Button
            type="text"
            onClick={onClick}
            data-theme={value}
            icon={<CommentOutlined />}
            className={styles.articleCommentButton}
        >
            &nbsp;{count > 0 ? comments : ''}
        </Button>
    );
};

export default ArticleCommentButton;
