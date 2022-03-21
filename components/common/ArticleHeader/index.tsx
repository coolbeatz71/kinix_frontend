import React, { FC } from 'react';
import { Breadcrumb, Button, Col, Row } from 'antd';
import Link from 'next/link';
import { CommentOutlined } from '@ant-design/icons';
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const { Item } = Breadcrumb;

const ArticleHeader: FC = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.articleHeader}>
            <Row justify="space-between" align="middle">
                <Col span={8}>
                    <Breadcrumb>
                        <Item data-author>
                            <Link href="link to author page">By Redaction</Link>
                        </Item>
                        <Item>1 hour ago</Item>
                    </Breadcrumb>
                </Col>
                <Col span={16} className="d-flex justify-content-end">
                    <Button data-comment type="link" icon={<CommentOutlined />}>
                        <span data-count>120k &nbsp;</span>
                    </Button>
                    <Button type="link" icon={<MdOutlineBookmarkAdd />} />
                </Col>
            </Row>
        </div>
    );
};

export default ArticleHeader;
