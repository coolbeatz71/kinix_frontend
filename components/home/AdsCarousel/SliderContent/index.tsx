import React, { FC } from 'react';
import { Button, Col, Row, Tag, Typography, Grid } from 'antd';
import Style from 'style-it';

import styles from './../index.module.scss';

const { useBreakpoint } = Grid;
const { Text, Title, Paragraph } = Typography;

export interface ISliderContentProps {
    tag: string;
    desc: string;
    title: string;
    link?: string;
    imgSrc: string;
    bgColor: string;
    subtitle: string;
    hasButton?: boolean;
    buttonText?: string;
}

const SliderContent: FC<ISliderContentProps> = ({
    tag,
    desc,
    title,
    imgSrc,
    bgColor,
    subtitle,
    link = '',
    buttonText,
    hasButton = false,
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
