import { FC, Fragment } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { IVideo } from '@interfaces/api';
import { CONTENT_LIMIT } from '@constants/app';

const DynamicSectionTitle = dynamic(() => import('@components/common/SectionTitle'));
const DynamicRelatedVideoCard = dynamic(() => import('@components/cards/Video/RelatedVideo'));

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
                        <DynamicSectionTitle title={t('relatedVideos')} isRelated />
                    </Col>
                    {related.map((video) => (
                        <Col key={video.id} span={24}>
                            <DynamicRelatedVideoCard video={video} />
                        </Col>
                    ))}
                </Fragment>
            )}
        </Row>
    );
};

export default RelatedVideoList;
