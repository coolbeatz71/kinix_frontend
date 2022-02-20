import React, { FC } from 'react';
import { Button, Col, Row, Tag, Typography } from 'antd';
import styled from 'styled-components';

import styles from './../index.module.scss';

const { Text, Title, Paragraph } = Typography;

export interface ISliderContentProps {
    tag: string;
    title: string;
    subtitle: string;
    desc: string;
    hasButton?: boolean;
    buttonText?: string;
    link?: string;
    bgColor: string;
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
}) => {
    const StyledRight = styled(Col)`
        ::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 60%;
            height: 100%;
            background: linear-gradient(to right, ${bgColor}, transparent) !important;
        }
    `;

    return (
        <div
            style={{
                width: '100%',
            }}
        >
            <Row justify="space-between">
                <Col
                    span={12}
                    className={styles.adsCarousel__left}
                    style={{
                        background: `${bgColor} !important`,
                    }}
                >
                    <div>
                        <Tag data-tag>{tag}</Tag>
                        <Title data-title>{title}</Title>
                        <Text strong data-subtitle>
                            {subtitle}
                        </Text>
                    </div>
                    <Paragraph data-desc>{desc}</Paragraph>

                    {hasButton && (
                        <Button size="large" className="mt-4" href={link}>
                            {buttonText || 'Visit Now'}
                        </Button>
                    )}
                </Col>
                <StyledRight span={12} className={styles.adsCarousel__right}>
                    <img src={`https://picsum.photos/1024/1024?random`} alt="" />
                </StyledRight>
            </Row>
        </div>
    );
};

export default SliderContent;
