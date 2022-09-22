import React, { FC } from 'react';
import Style from 'style-it';
import Image from 'next/image';
import { Button, Col, Row, Tag, Typography, Grid, Space } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import styles from './../index.module.scss';

const { useBreakpoint } = Grid;
const { Text, Title, Paragraph } = Typography;

export interface ISliderContentProps {
    legend: string;
    body: string;
    title: string;
    redirectUrl?: string;
    image: string;
    bgColor: string;
    subTitle: string;
    hasButton?: boolean;
    buttonText?: string;
    iosLink?: string;
    isAppAds?: boolean;
    androidLink?: string;
}

const SliderContent: FC<ISliderContentProps> = ({
    legend,
    body,
    title,
    image,
    bgColor,
    subTitle,
    redirectUrl = '',
    buttonText,
    isAppAds = false,
    hasButton = false,
    androidLink,
    iosLink,
}) => {
    const { md } = useBreakpoint();
    const carouselRightContent = Style.it(
        `
        .right::after {
            content: '';
            position: absolute;
            left: -1px;
            top: 0;
            width: 60%;
            height: 100%;
            background: linear-gradient(to right, ${bgColor}, transparent);
        }
        `,
        <Col span={12} className="right">
            <Image src={image} alt={title} layout="fill" priority />
        </Col>,
    );

    const carouselLeftContent = Style.it(
        `
        .left {
            background: ${bgColor} !important;
        }
        `,
        <Col xs={24} sm={24} md={12} className={`${styles.adsCarousel__left} left`}>
            <div>
                <Tag data-legend>{legend}</Tag>
                <Title data-title>{title}</Title>
                <Text strong data-subtitle>
                    {subTitle}
                </Text>
            </div>
            <Paragraph data-body>{body}</Paragraph>

            {hasButton &&
                (isAppAds ? (
                    <Space>
                        <a href={iosLink}>
                            <Button size="large" target="_blank" ghost icon={<AppleFilled />}>
                                App Store
                            </Button>
                        </a>
                        <a href={androidLink}>
                            <Button size="large" target="_blank" icon={<AndroidFilled />}>
                                Google Play
                            </Button>
                        </a>
                    </Space>
                ) : (
                    <Button size="large" href={redirectUrl} target="_blank">
                        {buttonText || 'Visit Now'}
                    </Button>
                ))}
        </Col>,
    );

    return (
        <Row justify="space-between">
            {carouselLeftContent}
            {md && carouselRightContent}
        </Row>
    );
};

export default SliderContent;
