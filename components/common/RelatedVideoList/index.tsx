import React, { FC, Fragment } from 'react';
import { Col, Row } from 'antd';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import { IVideo } from '@interfaces/api';
import { CONTENT_LIMIT } from '@constants/app';
import SectionTitle from '@components/common/SectionTitle';
import RelatedVideoCard from '@components/common/Cards/Video/RelatedVideoCard';

interface IRelatedVideoListProps {
    videos: IVideo[];
}

const RelatedVideoList: FC<IRelatedVideoListProps> = ({ videos }) => {
    const { t } = useTranslation();
    const related = videos.slice(0, CONTENT_LIMIT);

    return (
        <Row>
            {!isEmpty(related) && (
                <Fragment>
                    <Col span={24}>
                        <SectionTitle title={t('relatedVideos')} isRelated />
                    </Col>
                    {related.map((video) => (
                        <Col key={video.id} span={24}>
                            <RelatedVideoCard video={video} />
                        </Col>
                    ))}
                </Fragment>
            )}
        </Row>
    );
};

export default RelatedVideoList;
