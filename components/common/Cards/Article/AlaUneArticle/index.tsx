import React, { FC, Fragment } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import Image from 'next/image';
import { truncate } from 'lodash';
import { useTranslation } from 'react-i18next';
import useDarkLight from '@hooks/useDarkLight';
import { Button, Card, Typography } from 'antd';
import { EnumAlaUnePriority } from '@constants/alaune-article';
import { ClockCircleOutlined } from '@ant-design/icons';
import { IArticle } from '@interfaces/articles';
import { ALL_ARTICLE_PATH } from '@constants/paths';

import styles from './index.module.scss';

const { Title, Paragraph, Text } = Typography;

export interface IAlaUeArticleProps {
    article: IArticle;
    priority: EnumAlaUnePriority;
}

const AlaUneArticleCard: FC<IAlaUeArticleProps> = ({ article, priority = EnumAlaUnePriority.FIRST }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const link = `${ALL_ARTICLE_PATH}/${article?.slug}`;

    return (
        <Link href={link} passHref>
            <div data-theme={value} className={styles.alaUneArticleCard}>
                <Card
                    hoverable
                    bordered={false}
                    data-priority={priority}
                    cover={
                        priority !== EnumAlaUnePriority.FIRST && (
                            <div className={styles.alaUneArticleCard__cover}>
                                <Image
                                    width={100}
                                    height={56}
                                    alt={article?.slug}
                                    layout="responsive"
                                    src={article?.images?.[0] as string}
                                />
                            </div>
                        )
                    }
                >
                    {priority === EnumAlaUnePriority.FIRST ? (
                        <Fragment>
                            <div className={styles.alaUneArticleCard__overlay}>
                                <Image alt={article?.slug} src={article?.images?.[0] as string} layout="fill" />
                            </div>
                            <div className={styles.alaUneArticleCard__content}>
                                <div className={styles.alaUneArticleCard__content__header}>
                                    <Text data-text="header">{t('byRedaction')}</Text>
                                    <Text data-text="header" className="d-flex align-items-center">
                                        <ClockCircleOutlined />
                                        &nbsp; {dayjs(article?.createdAt).fromNow()}
                                    </Text>
                                </div>
                                <div>
                                    <Title level={2} data-text="title">
                                        {truncate(article?.title, {
                                            length: 90,
                                        })}
                                    </Title>
                                    <Paragraph data-text="description">
                                        {truncate(article?.summary, {
                                            length: 180,
                                        })}
                                    </Paragraph>

                                    <Button size="large">
                                        <Link href={link} passHref>
                                            {t('readMore')}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className={styles.alaUneArticleCard__header}>
                                <div className="d-flex justify-content-between">
                                    <Text data-text="header">{t('byRedaction')}</Text>
                                    <Text data-text="header" className="d-flex align-items-center">
                                        <ClockCircleOutlined />
                                        &nbsp; {dayjs(article?.createdAt).fromNow()}
                                    </Text>
                                </div>
                            </div>
                            <div className={styles.alaUneArticleCard__content}>
                                <Title level={5} data-text="title">
                                    {truncate(article?.title, {
                                        length: 60,
                                    })}
                                </Title>
                                <Paragraph data-text="description">
                                    {truncate(article?.summary, {
                                        length: 102,
                                    })}
                                </Paragraph>

                                <Button size="large" ghost>
                                    <Link href={link} passHref>
                                        {t('readMore')}
                                    </Link>
                                </Button>
                            </div>
                        </Fragment>
                    )}
                </Card>
            </div>
        </Link>
    );
};

export default AlaUneArticleCard;
