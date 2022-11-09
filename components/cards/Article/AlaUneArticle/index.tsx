import { FC, Fragment } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import Image from 'next/image';
import truncate from 'lodash/truncate';
import { ClockCircleOutlined } from 'icons';
import { useTranslation } from 'react-i18next';

import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';

import { IArticle } from '@interfaces/api';
import useDarkLight from '@hooks/useDarkLight';
import { ALL_ARTICLES_PATH } from '@constants/paths';
import { EnumAlaUnePriority } from '@constants/alaune-article';

import styles from './index.module.scss';

const { Title, Paragraph, Text } = Typography;

export interface IAlaUeArticleProps {
    article: IArticle;
    priority: EnumAlaUnePriority;
}

const AlaUneArticleCard: FC<IAlaUeArticleProps> = ({ article, priority = EnumAlaUnePriority.FIRST }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const link = `${ALL_ARTICLES_PATH}/${article?.slug}`;

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
                                    priority
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
                                <Image
                                    priority
                                    layout="fill"
                                    alt={article?.slug}
                                    src={article?.images?.[0] as string}
                                />
                            </div>
                            <div className={styles.alaUneArticleCard__content}>
                                <div className={styles.alaUneArticleCard__content__header}>
                                    <Text data-text="author">{t('byRedaction')}</Text>
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
                                    <Text data-text="author">{t('byRedaction')}</Text>
                                    <Text data-text="header" className="d-flex align-items-center">
                                        <ClockCircleOutlined />
                                        &nbsp; {dayjs(article?.createdAt).fromNow()}
                                    </Text>
                                </div>
                            </div>
                            <div className={styles.alaUneArticleCard__content}>
                                <Title level={5} data-text="title">
                                    {truncate(article?.title, {
                                        length: 90,
                                    })}
                                </Title>
                                <Paragraph data-text="description">
                                    {truncate(article?.summary, {
                                        length: 100,
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
