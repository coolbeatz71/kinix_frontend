import { FC } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';

import useDarkLight from '@hooks/useDarkLight';
import EmptyData from '@components/common/EmptyData';
import { EnumEmptyDataType } from '@constants/empty-data-type';

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
            <Col xs={24} sm={24} md={124} lg={16} xl={12}>
                <div data-text dangerouslySetInnerHTML={{ __html: content }} />
            </Col>
        </Row>
    );
};

export default Lyrics;
