import React, { FC } from 'react';
import { IUnknownObject } from 'interfaces/app';
import useDarkLight from '@hooks/useDarkLight';
import Style from 'style-it';
import { CaretRightFilled, ShareAltOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import { PRIMARY, WHITE } from '@constants/colors';
import { Button, Col, Row, Space, Tag, Typography, Grid } from 'antd';
import Link from 'next/link';
import { truncate } from 'lodash';
import VideoCardVertical from '@components/common/Cards/Video/VideoCardVertical';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

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
    const { md } = useBreakpoint();

    const colStyles = !isDark
        ? {
              background: PRIMARY,
          }
        : {
              background: WHITE,
          };

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

        .right::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top, ${!isDark ? PRIMARY : WHITE}, transparent);
        }
        `,
        <Col xs={24} sm={24} md={12} className="right">
            <img src={imgSrc} alt="" />
        </Col>,
    );

    return (
        <div data-theme={value} className={styles.exclusive}>
            <Row justify="space-between" className={styles.exclusive__top}>
                <Col xs={24} sm={24} md={12} className={styles.exclusive__top__left} style={colStyles}>
                    <div>
                        <Tag data-tag>{tag}</Tag>
                        <Title data-title>{title}</Title>
                    </div>
                    <Paragraph data-desc>
                        {truncate(desc, {
                            length: 200,
                        })}
                    </Paragraph>
                    <Space className="mt-4 d-flex align-content-center" size={12}>
                        <Link href={link} passHref>
                            <Button
                                size="large"
                                data-watch-now
                                icon={<CaretRightFilled />}
                                type={!isDark ? 'default' : 'primary'}
                            >
                                Watch Now
                            </Button>
                        </Link>

                        <Button size="large" shape="circle" data-share type="text" icon={<ShareAltOutlined />} />
                    </Space>
                </Col>
                {md && rightContent}
            </Row>
            <Row gutter={md ? [24, 0] : undefined} className={styles.exclusive__bottom} style={colStyles}>
                {[0, 1, 2, 3].map((el) => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} key={el}>
                        <VideoCardVertical size={el} isExclusive />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ExclusiveSection;
