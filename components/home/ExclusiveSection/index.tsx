import { FC } from 'react';
import Style from 'style-it';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import truncate from 'lodash/truncate';
import { useTranslation } from 'react-i18next';
import { CaretRightFilled, ShareAltOutlined } from 'icons';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tag from 'antd/lib/tag';
import Grid from 'antd/lib/grid';
import Space from 'antd/lib/space';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';

import { IVideo } from '@interfaces/api';
import useDarkLight from '@hooks/useDarkLight';
import { PRIMARY, SKY_BLUE } from '@constants/styles';

const DynamicVideoCardVertical = dynamic(() => import('@components/cards/Video/VideoCardVertical'));

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Title, Paragraph } = Typography;

export interface IExclusiveSectionProps {
    tag: string;
    desc: string;
    link: string;
    title: string;
    imgSrc: string;
    videos: IVideo[];
}

const ExclusiveSection: FC<IExclusiveSectionProps> = ({ tag, title, desc, imgSrc, link, videos }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const { md, lg, sm } = useBreakpoint();

    const isDark = value === 'dark';

    const colStyles = !isDark
        ? {
              background: PRIMARY,
          }
        : {
              background: SKY_BLUE,
          };

    const rightContent = Style.it(
        `
        .right::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 60%;
            height: 100%;
            background: linear-gradient(to right, ${!isDark ? PRIMARY : SKY_BLUE}, transparent);
        }
        .right::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top, ${!isDark ? PRIMARY : SKY_BLUE}, transparent);
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
                                {t('watchNow')}
                            </Button>
                        </Link>

                        <Button size="large" shape="circle" data-share type="text" icon={<ShareAltOutlined />} />
                    </Space>
                </Col>
                {md && rightContent}
            </Row>
            <Row
                style={colStyles}
                className={styles.exclusive__bottom}
                gutter={lg ? [48, 32] : (md || sm) && !lg ? [48, 48] : undefined}
            >
                {videos?.map((video) => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} key={video?.slug}>
                        <DynamicVideoCardVertical video={video} isExclusive />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ExclusiveSection;
