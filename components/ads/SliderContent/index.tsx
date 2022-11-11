import { FC } from 'react';
import Style from 'style-it';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { AndroidFilled, AppleFilled } from 'icons';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Tag from 'antd/lib/tag';
import Grid from 'antd/lib/grid';
import Space from 'antd/lib/space';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';

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
    const { t } = useTranslation();
    const { md, lg } = useBreakpoint();
    const carouselRightContent = Style.it(
        `
        .right::after {
            content: '';
            position: absolute;
            top: 0;
            left: -1px;
            width: 60%;
            height: 100%;
            background: linear-gradient(to right, ${bgColor}, transparent);
        }
        `,
        <Col xs={24} sm={24} md={12} className="right">
            <Image src={image} alt={title} layout="fill" priority />
        </Col>,
    );

    const carouselLeftContent = Style.it(
        lg || md
            ? `
        .left {
            background: ${bgColor} !important;
        }`
            : `.left {
            background: linear-gradient(45deg, rgba(0, 0, 0, 1) 20%, ${bgColor} 56%, transparent 100%), url(${image}) no-repeat;
            background-size: cover;
        }`,
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
                        <a href={iosLink} rel="noreferrer noopener">
                            <Button size={lg ? 'large' : 'middle'} target="_blank" ghost icon={<AppleFilled />}>
                                App Store
                            </Button>
                        </a>
                        <a href={androidLink} rel="noreferrer noopener">
                            <Button size={lg ? 'large' : 'middle'} target="_blank" icon={<AndroidFilled />}>
                                Google Play
                            </Button>
                        </a>
                    </Space>
                ) : (
                    <Button size={lg ? 'large' : 'middle'} href={redirectUrl} target="_blank">
                        {buttonText || t('visitNow')}
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
