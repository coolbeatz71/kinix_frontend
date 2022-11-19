import { FC, Fragment } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import numeral from 'numeral';
import Image from 'next/image';
import truncate from 'lodash/truncate';
import { useTranslation } from 'react-i18next';
import { RiArticleLine } from 'react-icons/ri';
import { ClockCircleOutlined, CommentOutlined, HeartOutlined, VideoCameraFilled } from 'icons';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tag from 'antd/lib/tag';
import Card from 'antd/lib/card';
import Rate from 'antd/lib/rate';
import Grid from 'antd/lib/grid';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';

import useDarkLight from '@hooks/useDarkLight';
import { IArticle, IVideo } from '@interfaces/api';
import { ARTICLE_COLOR, VIDEO_COLOR } from '@constants/styles';
import { ALL_ARTICLES_PATH, ALL_VIDEOS_PATH } from '@constants/paths';
import getYoutubeVideoThumbnail from '@helpers/getYoutubeVideoThumbail';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

export interface ISearchResultCardProps {
    data: IArticle | IVideo;
}

const SearchResultCardCard: FC<ISearchResultCardProps> = ({ data }) => {
    const { t } = useTranslation();
    const { md } = useBreakpoint();
    const { value } = useDarkLight();

    const isArticle = Object.prototype.hasOwnProperty.call(data, 'reads');

    const videoLink = `${ALL_VIDEOS_PATH}/${data?.slug}`;
    const articleLink = `${ALL_ARTICLES_PATH}/${data?.slug}`;

    const articleLikes = numeral((data as IArticle)?.likesCount).format('0.[00]a');
    const articleComments = numeral((data as IArticle)?.commentsCount).format('0.[00]a');

    const articleCoverImage = (data as IArticle).images?.[0] as string;
    const videoCoverImage = getYoutubeVideoThumbnail((data as IVideo)?.link) as string;

    return (
        <Link href={isArticle ? articleLink : videoLink} passHref>
            <div data-theme={value} className={styles.searchResultCard}>
                <Card bordered={false} hoverable>
                    <Row justify="space-between">
                        <Col xs={10} sm={10} md={9} className={styles.searchResultCard__cover}>
                            <div className={styles.searchResultCard__cover__image}>
                                <Image
                                    priority
                                    layout="fill"
                                    alt={data?.slug}
                                    src={isArticle ? articleCoverImage : videoCoverImage}
                                />
                            </div>
                        </Col>
                        <Col xs={14} sm={14} md={15} data-body>
                            <div className={styles.searchResultCard__header}>
                                <Tag
                                    className="mb-3"
                                    color={isArticle ? ARTICLE_COLOR : VIDEO_COLOR}
                                    icon={isArticle ? <RiArticleLine className="anticon" /> : <VideoCameraFilled />}
                                >
                                    {t(isArticle ? 'article' : 'video')}
                                </Tag>
                                <div className="d-flex justify-content-between">
                                    {isArticle ? <Text data-text="header">{t('byRedaction')}</Text> : <div />}
                                    {md && (
                                        <Text data-text="header" className="d-flex align-items-center">
                                            <ClockCircleOutlined />
                                            &nbsp; {dayjs(data?.createdAt).fromNow()}
                                        </Text>
                                    )}
                                </div>
                            </div>
                            <div className={styles.searchResultCard__content}>
                                <Title level={5} data-text="title">
                                    {truncate(data.title, {
                                        length: 60,
                                    })}
                                </Title>
                            </div>

                            <div className={styles.searchResultCard__footer}>
                                {isArticle ? (
                                    <Fragment>
                                        <Button type="link" icon={<HeartOutlined />}>
                                            {Number((data as IArticle)?.likesCount) > 0 ? (
                                                <span data-count>{articleLikes}</span>
                                            ) : null}
                                        </Button>
                                        <Button type="link" icon={<CommentOutlined />}>
                                            {Number((data as IArticle)?.commentsCount) > 0 ? (
                                                <span data-count>{articleComments}</span>
                                            ) : null}
                                        </Button>
                                    </Fragment>
                                ) : (
                                    <Rate value={Number((data as IVideo)?.avgRate)} />
                                )}
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        </Link>
    );
};

export default SearchResultCardCard;
