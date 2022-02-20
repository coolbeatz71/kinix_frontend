import React, { FC } from 'react';
import { IUnknownObject } from 'interfaces/app';
import useDarkLight from '@hooks/useDarkLight';
import Style from 'style-it';
import { CaretRightFilled, ShareAltOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import { PRIMARY, WHITE } from '@constants/colors';
import { Button, Col, Row, Space, Tag, Typography } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

export interface IExclusiveSectionProps {
    tag: string;
    desc: string;
    link: string;
    title: string;
    imgSrc: string;
    videos: IUnknownObject[];
}

const ExclusiveSection: FC<IExclusiveSectionProps> = ({ tag, title, desc, imgSrc, link }) => {
    const { value } = useDarkLight();
    const isDark = value === 'dark';

    const rightContent = Style.it(
        `
        .right::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 60%;
            height: 100%;
            background: linear-gradient(to right, ${!isDark ? PRIMARY : WHITE}, transparent);
        }
        `,
        <Col span={12} className="right">
            <img src={imgSrc} alt="" />
        </Col>,
    );

    return (
        <div data-theme={value} className={styles.exclusive}>
            <Row justify="space-between" className={styles.exclusive__top}>
                <Col
                    span={12}
                    className={styles.exclusive__top__left}
                    style={{
                        background: `${!isDark ? PRIMARY : WHITE} !important`,
                    }}
                >
                    <div>
                        <Tag data-tag>{tag}</Tag>
                        <Title data-title>{title}</Title>
                    </div>
                    <Paragraph data-desc>{desc}</Paragraph>
                    <Space className="mt-4 d-flex align-content-center">
                        <Link href={link} passHref>
                            <Button size="large" data-watch-now icon={<CaretRightFilled />}>
                                Watch Now
                            </Button>
                        </Link>

                        <Button size="large" shape="circle" data-share type="text" icon={<ShareAltOutlined />} />
                    </Space>
                </Col>
                {rightContent}
            </Row>
            <Row className={styles.exclusive__bottom}>video list</Row>
        </div>
    );
};

export default ExclusiveSection;
