import React, { FC } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Col, Row, Typography } from 'antd';
import { truncate } from 'lodash';
import { useTranslation } from 'react-i18next';
import { IArticle } from '@interfaces/api';
import { ClockCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Title, Paragraph, Text } = Typography;

interface IMainArticleProps {
    article: IArticle;
}

const MainArticle: FC<IMainArticleProps> = ({ article }) => {
    const { t } = useTranslation();

    return (
        <Row justify="space-between" className={styles.mainArticle}>
            <div className={styles.mainArticle__cover}>
                <Image alt={article?.slug} layout="fill" src={article?.images?.[0] as string} />
            </div>
            <Col lg={16} xl={12} className={styles.mainArticle__content} data-content>
                <div className={styles.mainArticle__content__header}>
                    <Text data-text="header">{t('byRedaction')}</Text>
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
                            length: 250,
                        })}
                    </Paragraph>
                </div>
            </Col>
        </Row>
    );
};

export default MainArticle;
