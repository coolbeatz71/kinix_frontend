import React, { FC } from 'react';
import { isEmpty } from 'lodash';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { IVideo } from '@interfaces/api';
import VideoCardVertical from '@components/common/Cards/Video/VideoCardVertical';
import { EnumEmptyDataType } from '@constants/empty-data-type';
import EmptyData from '@components/common/EmptyData';

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
                    <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noContentFound')} />
                </Col>
            ) : (
                videos?.map((video) => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} key={video.slug}>
                        <VideoCardVertical video={video} isExclusive={isExclusive} />
                    </Col>
                ))
            )}
        </Row>
    );
};

export default VideoList;
