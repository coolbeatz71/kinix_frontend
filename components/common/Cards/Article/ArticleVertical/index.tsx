import React, { FC, Fragment } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { isEmpty, truncate } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Card, Typography } from 'antd';
import { IArticle } from '@interfaces/api';
import useDarkLight from '@hooks/useDarkLight';
import { ClockCircleOutlined } from '@ant-design/icons';
import ArticleLikeButton from '@components/common/Like/ArticleLikeButton';
import ArticleCommentButton from '@components/common/Comment/ArticleCommentButton';
import ArticleBookmarkButton from '@components/common/Bookmark/ArticleBookmarkButton';

import styles from './index.module.scss';

const { Meta } = Card;
const { Text } = Typography;

export interface IArticleCardVerticalProps {
    article: IArticle;
}

const ArticleCardVertical: FC<IArticleCardVerticalProps> = ({ article }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.articleCardVertical}>
            <Card
                hoverable
                bordered={false}
                cover={
                    <Fragment>
                        {!isEmpty(article?.images) && (
                            <Image
                                width={100}
                                height={50}
                                alt={article?.slug}
                                layout="responsive"
                                src={article?.images?.[0] as string}
                            />
                        )}
                    </Fragment>
                }
                actions={[
                    <ArticleLikeButton count={Number(article?.likesCount)} slug={article?.slug} key="article-like" />,
                    <ArticleCommentButton
                        slug={article?.slug}
                        key="article-comment"
                        count={Number(article?.commentsCount)}
                    />,
                    <ArticleBookmarkButton slug={article?.slug} key="article-bookmark" />,
                ]}
            >
                <div className={styles.articleCardVertical__header}>
                    <Text>{t('byRedaction')}</Text>
                    <Text className="d-flex align-items-center">
                        <ClockCircleOutlined />
                        &nbsp; {dayjs(article?.createdAt).fromNow()}
                    </Text>
                </div>

                <Meta
                    title={truncate(article?.title, {
                        length: 100,
                    })}
                    description={truncate(article?.summary, {
                        length: 90,
                    })}
                />
            </Card>
        </div>
    );
};

export default ArticleCardVertical;
