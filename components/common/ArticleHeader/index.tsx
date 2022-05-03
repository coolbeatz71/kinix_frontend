import React, { FC } from 'react';
import { Breadcrumb, Col, Row } from 'antd';
import Link from 'next/link';

import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const { Item } = Breadcrumb;

const ArticleHeader: FC = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.articleHeader}>
            <Row justify="space-between" align="middle">
                <Col span={24} className="d-flex justify-content-start">
                    <Breadcrumb>
                        <Item data-author>
                            <Link href="link to author page">By Redaction</Link>
                        </Item>
                        <Item>1 hour ago</Item>
                    </Breadcrumb>
                </Col>
            </Row>
        </div>
    );
};

export default ArticleHeader;
