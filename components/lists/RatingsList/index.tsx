import React, { FC } from 'react';
import { Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { IUnknownObject } from 'interfaces/app';
import EmptyData from '@components/common/EmptyData';
import { EnumEmptyDataType } from '@constants/empty-data-type';
import VideoRatingCard from '@components/ratings/VideoRatingCard';

interface IRatingsListProps {
    fetched: boolean;
    error: string | null;
    ratings: IUnknownObject[];
}

const RatingsList: FC<IRatingsListProps> = ({ ratings, fetched }) => {
    const elements = [0, 1, 2, 3];
    const { t } = useTranslation();

    const rater = 'coolbeatz71';
    const comment =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium sequi ex eligendi cumque veritatis. Libero magni corporis perspiciatis veniam mollitia. Dolor tempore error laudantium non dignissimos aperiam sunt nulla quaerat!';

    return !ratings && fetched ? (
        <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noRatingFound')} />
    ) : (
        <Col sm={24} md={24} lg={16}>
            {elements.map((el) => (
                <VideoRatingCard key={el} rater={rater} comment={comment} rateCount={el} />
            ))}
        </Col>
    );
};

export default RatingsList;
