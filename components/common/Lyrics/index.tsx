import React, { FC } from 'react';
import { Col, Row } from 'antd';
import isEmpty from 'lodash/isEmpty';
import EmptyData from '../EmptyData';
import { useTranslation } from 'react-i18next';
import { EnumEmptyDataType } from '@constants/empty-data-type';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

export interface ILyricsProps {
    content: string;
}

const Lyrics: FC<ILyricsProps> = ({ content }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();

    return isEmpty(content) ? (
        <EmptyData type={EnumEmptyDataType.LYRICS} desc={t('noLyricsUploaded')} />
    ) : (
        <Row data-theme={value} className={styles.lyrics}>
            <Col sm={24} md={24} lg={12}>
                <div data-text dangerouslySetInnerHTML={{ __html: content }} />
            </Col>
        </Row>
    );
};

export default Lyrics;
