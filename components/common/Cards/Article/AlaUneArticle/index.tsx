import React, { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { truncate } from 'lodash';
import useDarkLight from '@hooks/useDarkLight';
import { Button, Card, Typography } from 'antd';
import { EnumAlaUnePriority } from '@constants/alaune-article';
import { ClockCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Title, Paragraph, Text } = Typography;

export interface IAlaUeArticleProps {
    size: number;
    priority: EnumAlaUnePriority;
}

const title = `"Un artiste est-il obligé d'avoir une direction artistique ?" - La Récré feat Yasmine La
D.A`;
const description = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat ullam sequi excepturi
a tempora enim magnam nesciunt suscipit. Ratione unde quis magni, porro cupiditate
molestiae itaque suscipit maiores aliquid ex!`;

const AlaUneArticleCard: FC<IAlaUeArticleProps> = ({ size, priority = EnumAlaUnePriority.FIRST }) => {
    const { value } = useDarkLight();
    const { t } = useTranslation();

    return (
        <div data-theme={value} className={styles.alaUneArticleCard}>
            <Card
                hoverable
                bordered={false}
                data-priority={priority}
                cover={
                    priority !== EnumAlaUnePriority.FIRST && (
                        <div className={styles.alaUneArticleCard__cover}>
                            <img alt="example" src={`https://picsum.photos/1024/300?random=${size}`} />
                        </div>
                    )
                }
            >
                {priority === EnumAlaUnePriority.FIRST ? (
                    <Fragment>
                        <div className={styles.alaUneArticleCard__overlay}>
                            <img alt="example" src={`https://picsum.photos/200/300?random=${size}`} />
                        </div>
                        <div className={styles.alaUneArticleCard__content}>
                            <div className={styles.alaUneArticleCard__content__header}>
                                <Text data-text="header">
                                    {truncate('By Redaction', {
                                        length: 90,
                                    })}
                                </Text>
                                <Text data-text="header" className="d-flex align-items-center">
                                    <ClockCircleOutlined />
                                    &nbsp; 1 hour ago
                                </Text>
                            </div>
                            <div>
                                <Title level={2} data-text="title">
                                    {truncate(title, {
                                        length: 90,
                                    })}
                                </Title>
                                <Paragraph data-text="description">
                                    {truncate(description, {
                                        length: 180,
                                    })}
                                </Paragraph>

                                <Button size="large">{t('readMore')}</Button>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className={styles.alaUneArticleCard__header}>
                            <div className="d-flex justify-content-between">
                                <Text data-text="header">
                                    {truncate('By Redaction', {
                                        length: 90,
                                    })}
                                </Text>
                                <Text data-text="header" className="d-flex align-items-center">
                                    <ClockCircleOutlined />
                                    &nbsp; 1 hour ago
                                </Text>
                            </div>
                        </div>
                        <div className={styles.alaUneArticleCard__content}>
                            <Title level={5} data-text="title">
                                {truncate(title, {
                                    length: 60,
                                })}
                            </Title>
                            <Paragraph data-text="description">
                                {truncate(description, {
                                    length: 102,
                                })}
                            </Paragraph>

                            <Button size="large" ghost>
                                {t('readMore')}
                            </Button>
                        </div>
                    </Fragment>
                )}
            </Card>
        </div>
    );
};

export default AlaUneArticleCard;
