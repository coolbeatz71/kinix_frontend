import { FC } from 'react';
import dayjs from 'dayjs';

import List from 'antd/lib/list';

import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { IComment, IArticle } from '@interfaces/api';
import ArticleComment from '@components/comments/ArticleComment';

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
                const isCommentOwner = user?.email === comment.user?.email;

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
