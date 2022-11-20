import { FC, Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import { IVideo } from '@interfaces/api';
import EmptyData from '@components/common/EmptyData';
import { EnumEmptyDataType } from '@constants/empty-data-type';
import SearchResultCard from '@components/cards/SearchResult';

export interface IVideosResultProps {
    videos: IVideo[];
}

const VideosResult: FC<IVideosResultProps> = ({ videos }) => {
    const { t } = useTranslation();

    return (
        <Fragment>
            {isEmpty(videos) ? (
                <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noSearchResultFound')} />
            ) : (
                videos.map((video) => <SearchResultCard key={video.slug} data={video} />)
            )}
        </Fragment>
    );
};

export default VideosResult;
