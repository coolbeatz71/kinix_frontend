import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { isBoolean, isEmpty, truncate } from 'lodash';
import StarRatingComponent from 'react-star-rating-component';
import { Button, Card, Col, Grid, Row, Typography } from 'antd';
import { IVideo } from '@interfaces/api';
import { PlayCircleTwoTone } from '@ant-design/icons';
import { WARNING } from '@constants/colors';
import useDarkLight from '@hooks/useDarkLight';
import getYoutubeVideoThumbnail from '@helpers/getYoutubeVideoThumbail';

import styles from './index.module.scss';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export interface IVideoCardHorinzontalProps {
    video: IVideo;
}

const VideoCardHorinzontal: FC<IVideoCardHorinzontalProps> = ({ video }) => {
    const { value } = useDarkLight();
    const { lg } = useBreakpoint();

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
            className={styles.videoCardHorinzontal}
        >
            <Card bordered={false} hoverable>
                <Row justify="space-between">
                    <Col span={9} className={styles.videoCardHorinzontal__cover}>
                        <div className="overlay" style={overLayStyles}>
                            <Button
                                icon={<PlayCircleTwoTone twoToneColor={WARNING} />}
                                type="text"
                                size="large"
                                shape="circle"
                            />
                        </div>
                        {!isEmpty(video?.link) && (
                            <div className={styles.videoCardHorinzontal__cover__image}>
                                <Image layout="fill" alt={video?.slug} src={getYoutubeVideoThumbnail(video?.link)} />
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
                                <StarRatingComponent name="rate-video" starCount={5} value={Number(video.avgRate)} />
                            </Text>
                            <Text data-created-at>{dayjs(video?.createdAt).fromNow()}</Text>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default VideoCardHorinzontal;
