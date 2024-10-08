import { FC } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Breadcrumb from 'antd/lib/breadcrumb';

import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const { Item } = Breadcrumb;

export interface IArticleHeaderProps {
    createdAt: string;
}

const ArticleHeader: FC<IArticleHeaderProps> = ({ createdAt }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();

    const createdTime = dayjs(createdAt).fromNow();

    return (
        <div data-theme={value} className={styles.articleHeader}>
            <Row justify="space-between" align="middle">
                <Col span={24} className="d-flex justify-content-start">
                    <Breadcrumb>
                        <Item data-author>{t('byRedaction')}</Item>
                        <Item>{createdTime}</Item>
                    </Breadcrumb>
                </Col>
            </Row>
        </div>
    );
};

export default ArticleHeader;
