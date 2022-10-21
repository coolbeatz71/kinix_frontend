import React, { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '@components/common/SectionTitle';

const PlaylistsList: FC = () => {
    const { t } = useTranslation();
    return (
        <Fragment>
            <SectionTitle title={t('myPlaylists')} isRelated />
        </Fragment>
    );
};

export default PlaylistsList;
