import React, { FC } from 'react';
import { truncate } from 'lodash';
import useDarkLight from '@hooks/useDarkLight';
import Style from 'style-it';
import Link from 'next/link';
import { CaretRightFilled, ShareAltOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Tag, Typography, Grid } from 'antd';
import { IVideo } from '@interfaces/api';
import { PRIMARY, WHITE } from '@constants/colors';
import VideoCardVertical from '@components/common/Cards/Video/VideoCardVertical';

import styles from './index.module.scss';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export interface IExclusiveSectionProps {
    tag: string;
    desc: string;
    link: string;
    title: string;
    imgSrc: string;
    videos: IVideo[];
}

const ExclusiveSection: FC<IExclusiveSectionProps> = ({ tag, title, desc, imgSrc, link, videos }) => {
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
            <Row gutter={md ? [48, 0] : undefined} className={styles.exclusive__bottom} style={colStyles}>
                {videos?.map((video) => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} key={video?.slug}>
                        <VideoCardVertical video={video} isExclusive />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ExclusiveSection;
