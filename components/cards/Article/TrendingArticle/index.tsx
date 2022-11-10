import { FC } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import truncate from 'lodash/truncate';
import { ClockCircleOutlined } from 'icons';
import { useTranslation } from 'react-i18next';

import Card from 'antd/lib/card';
import Typography from 'antd/lib/typography';

import { IArticle } from '@interfaces/api';
import useDarkLight from '@hooks/useDarkLight';
import { ALL_ARTICLES_PATH } from '@constants/paths';

import styles from './index.module.scss';

const { Title, Paragraph, Text } = Typography;

export interface ITrendingArticleProps {
    article: IArticle;
}

const TrendingArticleCard: FC<ITrendingArticleProps> = ({ article }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();

    const link = `${ALL_ARTICLES_PATH}/${article?.slug}`;

    return (
        <Link passHref href={link}>
            <div data-theme={value} className={styles.trendingArticleCard}>
                <Card bordered={false} hoverable>
                    <div className={styles.trendingArticleCard__header}>
                        <div className="d-flex justify-content-between">
                            <Text data-text="author">{t('byRedaction')}</Text>
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
