import { FC } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Typography from 'antd/lib/typography';

import { useTranslation } from 'react-i18next';
import SubscribeInput from '@components/common/SubscribeInput';

import styles from './index.module.scss';

const { Title, Text } = Typography;

const SubscribeNewsLetter: FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.subscribeNewsLetter}>
            <Row justify="space-between">
                <Col sm={24} md={24} lg={10}>
                    <Title data-title>{t('newsletterTitle')}</Title>
                    <Text data-desc>{t('newsletterSubtitle')}</Text>
                    <SubscribeInput />
                </Col>
            </Row>
        </div>
    );
};

export default SubscribeNewsLetter;
