import React, { FC } from 'react';
import dayjs from 'dayjs';
import { List } from 'antd';
import { useSelector } from 'react-redux';
import { IComment, IArticle } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import ArticleComment from '../ArticleComment';

import styles from './index.module.scss';

export interface IArticleCommentListProps {
    article: IArticle;
    comments?: IComment[];
}

const ArticleCommentList: FC<IArticleCommentListProps> = ({ comments, article }) => {
    const { data: user } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);

    return (
        <List
            size="large"
            split={false}
            dataSource={comments}
            itemLayout="vertical"
            className={styles.articleComment}
            renderItem={(comment) => {
                const createdTime = dayjs(comment.createdAt).fromNow();
                const isCommentOwner = user.email === comment.user?.email;

                return (
                    <ArticleComment
                        key={comment.id}
                        comment={comment}
                        slug={article.slug}
                        createdTime={createdTime}
                        isCommentOwner={isCommentOwner}
                    />
                );
            }}
        />
    );
};

export default ArticleCommentList;
