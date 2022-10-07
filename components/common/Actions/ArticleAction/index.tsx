import React, { FC } from 'react';
import { Button, Col, Row } from 'antd';
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import { IUser } from '@interfaces/user';
import { IArticle } from '@interfaces/api';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

export interface IArticleActionProps {
    user: IUser;
    article: IArticle;
}

const ArticleAction: FC<IArticleActionProps> = () => {
    const { value } = useDarkLight();
    return (
        <Row data-theme={value} className={styles.articleAction}>
            <Col className="d-flex justify-content-end">
                <Button data-like type="link" icon={<HeartOutlined />}>
                    <span data-count>12.3k</span>
                </Button>
                <Button data-comment type="link" icon={<CommentOutlined />}>
                    <span data-count>120k</span>
                </Button>
                <Button type="link" icon={<MdOutlineBookmarkAdd />} />
            </Col>
        </Row>
    );
};

export default ArticleAction;
