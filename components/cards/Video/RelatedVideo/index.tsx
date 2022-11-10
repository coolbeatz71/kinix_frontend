import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';
import isEmpty from 'lodash/isEmpty';
import truncate from 'lodash/truncate';
import isBoolean from 'lodash/isBoolean';
import { PlayCircleTwoTone } from 'icons';
import StarRatingComponent from 'react-star-rating-component';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Grid from 'antd/lib/grid';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';

import { IVideo } from '@interfaces/api';
import { WARNING } from '@constants/styles';
import useDarkLight from '@hooks/useDarkLight';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import getYoutubeVideoThumbnail from '@helpers/getYoutubeVideoThumbail';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

export interface IRelatedVideoCardProps {
    video: IVideo;
    bordered?: boolean;
}

const RelatedVideoCard: FC<IRelatedVideoCardProps> = ({ video, bordered = false }) => {
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
            <Card bordered={bordered} hoverable>
                <Row justify="space-between">
                    <Col span={9} className={styles.relatedVideoCard__cover}>
                        <Link href={link} passHref>
                            <div className="overlay" style={overLayStyles}>
                                <Button
                                    type="text"
                                    size="large"
                                    shape="circle"
                                    icon={<PlayCircleTwoTone twoToneColor={WARNING} />}
                                />
                            </div>
                        </Link>
                        {!isEmpty(video?.link) && (
                            <div className={styles.relatedVideoCard__cover__image}>
                                <Link href={link} passHref>
                                    <a rel="noreferrer noopener">
                                        <Image
                                            priority
                                            layout="fill"
                                            alt={video?.slug}
                                            src={getYoutubeVideoThumbnail(video?.link) as string}
                                        />
                                    </a>
                                </Link>
                            </div>
                        )}
                    </Col>
                    <Col span={15} data-body>
                        <Title level={5} data-title>
                            <Link href={link} passHref>
                                {truncate(video.title, {
                                    length: 60,
                                })}
                            </Link>
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

export default RelatedVideoCard;
