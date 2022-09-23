import React, { FC } from 'react';
import dayjs from 'dayjs';
import { truncate } from 'lodash';
import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import useDarkLight from '@hooks/useDarkLight';
import { IArticle } from '@interfaces/articles';
import { ClockCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import Link from 'next/link';
import { ALL_ARTICLE_PATH } from '@constants/paths';

const { Title, Paragraph, Text } = Typography;

export interface ITrendingArticleProps {
    article: IArticle;
}

const TrendingArticleCard: FC<ITrendingArticleProps> = ({ article }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();

    const link = `${ALL_ARTICLE_PATH}/${article?.slug}`;

    return (
        <Link passHref href={link}>
            <div data-theme={value} className={styles.trendingArticleCard}>
                <Card bordered={false} hoverable>
                    <div className={styles.trendingArticleCard__header}>
                        <div className="d-flex justify-content-between">
                            <Text data-text="header">{t('byRedaction')}</Text>
                            <Text data-text="header" className="d-flex align-items-center">
                                <ClockCircleOutlined />
                                &nbsp; {dayjs(article.createdAt).fromNow()}
                            </Text>
                        </div>
                    </div>
                    <div className={styles.trendingArticleCard__content}>
                        <Title level={5} data-text="title">
                            <Link passHref href={link}>
                                {truncate(article?.title, {
                                    length: 48,
                                })}
                            </Link>
                        </Title>
                        <Paragraph data-text="description">
                            {truncate(article?.summary, {
                                length: 102,
                            })}
                        </Paragraph>
                    </div>
                </Card>
            </div>
        </Link>
    );
};

export default TrendingArticleCard;
