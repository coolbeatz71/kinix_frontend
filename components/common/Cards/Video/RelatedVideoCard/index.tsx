import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { isBoolean, isEmpty, truncate } from 'lodash';
import StarRatingComponent from 'react-star-rating-component';
import { Button, Card, Col, Grid, Row, Typography } from 'antd';

import { IVideo } from '@interfaces/api';
import { WARNING } from '@constants/colors';
import useDarkLight from '@hooks/useDarkLight';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import { PlayCircleTwoTone } from '@ant-design/icons';
import getYoutubeVideoThumbnail from '@helpers/getYoutubeVideoThumbail';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

export interface IRelatedVideoCardProps {
    video: IVideo;
}

const RelatedVideoCard: FC<IRelatedVideoCardProps> = ({ video }) => {
    const { lg } = useBreakpoint();
    const { value } = useDarkLight();
    const link = `${ALL_VIDEOS_PATH}/${video?.slug}`;

    const [showOverLay, setShowOverLay] = useState<boolean>(false);
    const overLayStyles = showOverLay ? { opacity: 1 } : { opacity: 0 };

    const handleShowOverlay = (): void => {
        if (lg) setShowOverLay(!showOverLay);
        else setShowOverLay(true);
    };

    useEffect(() => {
        if (isBoolean(lg) && !lg) setShowOverLay(true);
    }, [lg]);

    return (
        <div
            data-theme={value}
            onMouseEnter={handleShowOverlay}
            onMouseLeave={handleShowOverlay}
            className={styles.relatedVideoCard}
        >
            <Link href={link} passHref>
                <Card bordered={false} hoverable>
                    <Row justify="space-between">
                        <Col span={9} className={styles.relatedVideoCard__cover}>
                            <div className="overlay" style={overLayStyles}>
                                <Button
                                    icon={<PlayCircleTwoTone twoToneColor={WARNING} />}
                                    type="text"
                                    size="large"
                                    shape="circle"
                                />
                            </div>
                            {!isEmpty(video?.link) && (
                                <div className={styles.relatedVideoCard__cover__image}>
                                    <Image
                                        layout="fill"
                                        alt={video?.slug}
                                        src={getYoutubeVideoThumbnail(video?.link)}
                                    />
                                </div>
                            )}
                        </Col>
                        <Col span={15} data-body>
                            <Title level={5} data-title>
                                {truncate(video.title, {
                                    length: 60,
                                })}
                            </Title>
                            <div className="d-flex flex-column">
                                <Text data-ratings>
                                    <StarRatingComponent
                                        name="rate-video"
                                        starCount={5}
                                        value={Number(video.avgRate)}
                                    />
                                </Text>
                                <Text data-created-at>{dayjs(video?.createdAt).fromNow()}</Text>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Link>
        </div>
    );
};

export default RelatedVideoCard;
