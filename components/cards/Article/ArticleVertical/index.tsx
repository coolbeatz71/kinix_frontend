import React, { FC, Fragment, useState } from 'react';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Typography } from 'antd';
import isEmpty from 'lodash/isEmpty';
import truncate from 'lodash/truncate';
import { useTranslation } from 'react-i18next';
import { ClockCircleOutlined } from '@ant-design/icons';
import { IArticle } from '@interfaces/api';
import useDarkLight from '@hooks/useDarkLight';
import { ALL_ARTICLES_PATH } from '@constants/paths';
import ArticleLikeButton from '@components/actions/ArticleLikeButton';
import ArticleCommentButton from '@components/comments/ArticleCommentButton';
import ArticleBookmarkButton from '@components/actions/ArticleBookmarkButton';

const DynamicCommentsDrawer = dynamic(() => import('@components/comments/ArticleCommentsDrawer'));

import styles from './index.module.scss';

const { Meta } = Card;
const { Text } = Typography;

export interface IArticleCardVerticalProps {
    article: IArticle;
}

const ArticleCardVertical: FC<IArticleCardVerticalProps> = ({ article }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const link = `${ALL_ARTICLES_PATH}/${article?.slug}`;

    const [openCommentDrawer, setOpenCommentDrawer] = useState(false);

    return (
        <div data-theme={value} className={styles.articleCardVertical}>
            <Card
                hoverable
                bordered={false}
                cover={
                    <Fragment>
                        {!isEmpty(article?.images) && (
                            <div>
                                <Link href={link} passHref prefetch={false}>
                                    <a rel="noreferrer noopener">
                                        <Image
                                            priority
                                            width={100}
                                            height={55}
                                            alt={article?.slug}
                                            layout="responsive"
                                            src={article?.images?.[0] as string}
                                        />
                                    </a>
                                </Link>
                            </div>
                        )}
                    </Fragment>
                }
                actions={[
                    <ArticleLikeButton key="article-like" slug={article?.slug} count={Number(article?.likesCount)} />,
                    <ArticleCommentButton
                        key="article-comment"
                        articleId={article?.id}
                        count={Number(article?.commentsCount)}
                        onClick={() => setOpenCommentDrawer(true)}
                    />,
                    <ArticleBookmarkButton slug={article?.slug} key="article-bookmark" />,
                ]}
            >
                <div className={styles.articleCardVertical__header}>
                    <Text data-text="author">{t('byRedaction')}</Text>
                    <Text data-text="header" className="d-flex align-items-center">
                        <ClockCircleOutlined />
                        &nbsp; {dayjs(article?.createdAt).fromNow()}
                    </Text>
                </div>

                <Meta
                    title={
                        <Link href={link} passHref prefetch={false}>
                            {truncate(article?.title, {
                                length: 100,
                            })}
                        </Link>
                    }
                    description={
                        <Link href={link} passHref prefetch={false}>
                            {truncate(article?.summary, {
                                length: 90,
                            })}
                        </Link>
                    }
                />
            </Card>
            <DynamicCommentsDrawer
                article={article}
                openDrawer={openCommentDrawer}
                setOpenDrawer={setOpenCommentDrawer}
            />
        </div>
    );
};

export default ArticleCardVertical;
