import React, { FC } from 'react';
import { Button, Col, Row, Tag, Typography, Grid } from 'antd';
import Style from 'style-it';

import styles from './../index.module.scss';

const { Text, Title, Paragraph } = Typography;

const { useBreakpoint } = Grid;

export interface ISliderContentProps {
    tag: string;
    title: string;
    subtitle: string;
    desc: string;
    hasButton?: boolean;
    buttonText?: string;
    link?: string;
    bgColor: string;
    imgSrc: string;
}

const SliderContent: FC<ISliderContentProps> = ({
    tag,
    title,
    subtitle,
    desc,
    hasButton = false,
    buttonText,
    link = '',
    bgColor,
    imgSrc,
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
            <img src={imgSrc} alt="" />
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
                <Tag data-tag>{tag}</Tag>
                <Title data-title>{title}</Title>
                <Text strong data-subtitle>
                    {subtitle}
                </Text>
            </div>
            <Paragraph data-desc>{desc}</Paragraph>

            {hasButton && (
                <Button size="large" className="mt-4" href={link} target="_blank">
                    {buttonText || 'Visit Now'}
                </Button>
            )}
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
