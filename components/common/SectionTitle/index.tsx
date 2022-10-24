import React, { FC, ReactElement } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import useDarkLight from '@hooks/useDarkLight';
import { isDark } from '@constants/styles';

import styles from './index.module.scss';

const { Title } = Typography;

export interface ISectionTitle {
    title: string;
    icon?: ReactElement;
    linkHasMore?: string;
    isRelated?: boolean;
}

const SectionTitle: FC<ISectionTitle> = ({ title, icon, linkHasMore, isRelated = false }) => {
    const { value } = useDarkLight();
    const { t } = useTranslation();

    return (
        <div data-theme={value} className={styles.sectionTitle} data-related={isRelated}>
            <Row justify="space-between" align="middle">
                <Col flex={1} className="d-flex align-items-center" data-icon>
                    {icon}
                    <Title level={3}>{title}</Title>
                </Col>

                {linkHasMore && (
                    <Col flex={4} className="d-flex justify-content-end">
                        <Link href={linkHasMore} passHref>
                            <Button ghost type={isDark(value) ? 'default' : 'primary'}>
                                {t('viewMore')}
                            </Button>
                        </Link>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default SectionTitle;
