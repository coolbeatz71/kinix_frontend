import React, { FC } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';
import truncate from 'lodash/truncate';
import { Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { IArticle } from '@interfaces/api';
import { ALL_ARTICLES_PATH } from '@constants/paths';
import { ClockCircleOutlined } from 'icons';

import styles from './index.module.scss';

const { Title, Paragraph, Text } = Typography;

interface IMainArticleProps {
    article: IArticle;
}

const MainArticle: FC<IMainArticleProps> = ({ article }) => {
    const { t } = useTranslation();
    const link = `${ALL_ARTICLES_PATH}/${article?.slug}`;

    return (
        <Link href={link} passHref>
            <Row justify="space-between" className={styles.mainArticle}>
                <div className={styles.mainArticle__cover}>
                    <Image priority alt={article?.slug} layout="fill" src={article?.images?.[0] as string} />
                </div>
                <Col lg={16} xl={12} className={styles.mainArticle__content} data-content>
                    <div className={styles.mainArticle__content__header}>
                        <Text data-text="author">{t('byRedaction')}</Text>
                        <Text data-text="header" className="d-flex align-items-center">
                            <ClockCircleOutlined />
                            &nbsp; {dayjs(article?.createdAt).fromNow()}
                        </Text>
                    </div>
                    <div className={styles.mainArticle__content__text}>
                        <Title level={1} data-text="title">
                            {truncate(article?.title, {
                                length: 90,
                            })}
                        </Title>
                        <Paragraph data-text="description">
                            {truncate(article?.summary, {
                                length: 120,
                            })}
                        </Paragraph>
                    </div>
                </Col>
            </Row>
        </Link>
    );
};

export default MainArticle;
