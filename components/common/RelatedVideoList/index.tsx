import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { IVideo } from '@interfaces/api';
import RelatedVideoCard from '@components/common/Cards/Video/RelatedVideoCard';
import SectionTitle from '@components/common/SectionTitle';
import { useTranslation } from 'react-i18next';
import { CONTENT_LIMIT } from '@constants/app';

interface IRelatedVideoListProps {
    videos: IVideo[];
}

const RelatedVideoList: FC<IRelatedVideoListProps> = ({ videos }) => {
    const { t } = useTranslation();
    const related = videos.slice(0, CONTENT_LIMIT);

    return (
        <Row>
            <Col span={24}>
                <SectionTitle title={t('relatedVideos')} isRelated />
            </Col>
            {related.map((video) => (
                <Col key={video.id} span={24}>
                    <RelatedVideoCard video={video} />
                </Col>
            ))}
        </Row>
    );
};

export default RelatedVideoList;
