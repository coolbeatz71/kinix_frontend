import React, { FC } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { truncate } from 'lodash';
import { IArticle } from '@interfaces/api';
import { useTranslation } from 'react-i18next';
import useDarkLight from '@hooks/useDarkLight';
import { Card, Col, Row, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Title, Text } = Typography;

export interface IRelatedArticleProps {
    article: IArticle;
}

const RelatedArticleCard: FC<IRelatedArticleProps> = ({ article }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const coverImage = article.images?.[0];

    return (
        <div data-theme={value} className={styles.relatedArticleCard}>
            <Card bordered={false} hoverable>
                <Row justify="space-between">
                    <Col span={7} className={styles.relatedArticleCard__cover}>
                        <div className={styles.relatedArticleCard__cover__image}>
                            <Image layout="fill" src={coverImage as string} alt={article?.slug} />
                        </div>
                    </Col>
                    <Col span={17} data-body>
                        <div className={styles.relatedArticleCard__header}>
                            <div className="d-flex justify-content-between">
                                <Text data-text="header">{t('byRedaction')}</Text>
                                <Text data-text="header" className="d-flex align-items-center">
                                    <ClockCircleOutlined />
                                    &nbsp; {dayjs(article?.createdAt).fromNow()}
                                </Text>
                            </div>
                        </div>
                        <div className={styles.relatedArticleCard__content}>
                            <Title level={5} data-text="title">
                                {truncate(article.title, {
                                    length: 60,
                                })}
                            </Title>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default RelatedArticleCard;
