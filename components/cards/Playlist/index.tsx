import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import numeral from 'numeral';
import Image from 'next/image';
import isEmpty from 'lodash/isEmpty';
import { DeleteFilled } from 'icons';
import truncate from 'lodash/truncate';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';
import { Button, Card, Col, Row, Typography } from 'antd';
import { IPlaylist } from '@interfaces/api';
import useDarkLight from '@hooks/useDarkLight';
import getYoutubeVideoThumbnail from '@helpers/getYoutubeVideoThumbail';

import styles from './index.module.scss';

const { Title, Text } = Typography;

export interface IPlaylistCardProps {
    playlist: IPlaylist;
}

const PlaylistCard: FC<IPlaylistCardProps> = ({ playlist }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const defaultCover = playlist?.videos?.[0]?.link || '';
    const [cover, setCover] = useState<string>(defaultCover);

    const videosLength = playlist?.videos?.length;
    const fallbackImage = '/feedback/empty-playlist.svg';
    const numOfVideos = numeral(videosLength).format('0.[00]a');
    const plural = videosLength && videosLength > 1 ? 'videos' : 'video';

    useEffect(() => {
        setCover(defaultCover);
    }, [defaultCover]);

    return (
        <div data-theme={value} className={styles.playlistCard}>
            <Card bordered={false} hoverable>
                <Row justify="space-between" gutter={24}>
                    <Col span={12} className={styles.playlistCard__cover}>
                        {!isEmpty(playlist?.videos?.[0].link) && (
                            <div className={styles.playlistCard__cover__image}>
                                <Image
                                    priority
                                    layout="fill"
                                    alt={playlist?.slug}
                                    src={getYoutubeVideoThumbnail(cover) as string}
                                    onError={() => {
                                        setCover(fallbackImage);
                                    }}
                                    onLoadingComplete={(res) => {
                                        if (res.naturalWidth === 0) setCover(fallbackImage);
                                    }}
                                />
                            </div>
                        )}
                    </Col>
                    <Col span={12} data-body>
                        <Title level={5} data-title className="pe-4">
                            {truncate(`${playlist.title} ${playlist.title}`, {
                                length: 45,
                            })}
                        </Title>

                        <div className="d-flex flex-column">
                            <Text data-created-at>
                                <strong>{t('createdAt')}</strong>{' '}
                                {upperFirst(dayjs(playlist?.createdAt).format('MMM MM, YYYY'))}
                            </Text>
                            <Text data-created-at>
                                <strong>{t('lastUpdate')}</strong> {upperFirst(dayjs(playlist?.updatedAt).fromNow())}
                            </Text>
                            <Text data-videos>{videosLength ? `${numOfVideos} ${plural}` : t('noVideos')}</Text>
                        </div>

                        <div className="mt-3 d-flex justify-content-end pe-4">
                            <Button ghost danger icon={<DeleteFilled />} className="d-flex align-items-center">
                                {t('delete')}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default PlaylistCard;
