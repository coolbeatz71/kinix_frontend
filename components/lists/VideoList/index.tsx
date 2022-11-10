import { FC } from 'react';
import dynamic from 'next/dynamic';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import isEmpty from 'lodash/isEmpty';
import { IVideo } from '@interfaces/api';
import { useTranslation } from 'react-i18next';
import { EnumEmptyDataType } from '@constants/empty-data-type';

const DynamicEmptyData = dynamic(() => import('@components/common/EmptyData'));
const DynamicVideoCardVertical = dynamic(() => import('@components/cards/Video/VideoCardVertical'));

interface IVideoListProps {
    videos: IVideo[];
    myVideos?: boolean;
    isExclusive?: boolean;
}

const VideoList: FC<IVideoListProps> = ({ videos, isExclusive }) => {
    const { t } = useTranslation();
    return (
        <Row gutter={[16, 48]}>
            {isEmpty(videos) ? (
                <Col span={24}>
                    <DynamicEmptyData type={EnumEmptyDataType.CONTENT} desc={t('noContentFound')} />
                </Col>
            ) : (
                videos?.map((video) => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} key={video.slug}>
                        <DynamicVideoCardVertical video={video} isExclusive={isExclusive} />
                    </Col>
                ))
            )}
        </Row>
    );
};

export default VideoList;
