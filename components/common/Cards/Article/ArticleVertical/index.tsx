import React, { FC } from 'react';
import useDarkLight from '@hooks/useDarkLight';
import { Card, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import ArticleLikeButton from '@components/common/Like/ArticleLikeButton';
import { truncate } from 'lodash';
import ArticleCommentButton from '@components/common/Comment/ArticleCommentButton';
import ArticleBookmarkButton from '@components/common/Bookmark/ArticleBookmarkButton';

const { Meta } = Card;
const { Text } = Typography;

export interface IArticleCardVerticalProps {
    size: number;
}

const description = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, expedita soluta fugit vel deleniti, quisquam animi facilis rerum dolore deserunt quasi aperiam voluptatum dolor necessitatibus nisi officia iste delectus. Esse.`;

const ArticleCardVertical: FC<IArticleCardVerticalProps> = ({ size }) => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.articleCardVertical}>
            <Card
                hoverable
                bordered={false}
                cover={
                    <>
                        <img
                            alt="example"
                            src={`https://picsum.photos/1024/300?random=${size}`}
                            style={{
                                aspectRatio: '16 / 9',
                                objectFit: 'cover',
                            }}
                        />
                    </>
                }
                actions={[
                    <ArticleLikeButton count={3} slug="" key="article-like" />,
                    <ArticleCommentButton count={1230} slug="" key="article-comment" />,
                    <ArticleBookmarkButton slug={''} key="article-bookmark" />,
                ]}
            >
                <div className={styles.articleCardVertical__header}>
                    <Text>
                        {truncate('By Redaction', {
                            length: 90,
                        })}
                    </Text>
                    <Text className="d-flex align-items-center">
                        <ClockCircleOutlined />
                        &nbsp; 1 hour ago
                    </Text>
                </div>

                <Meta
                    title="The Internet's Own Boy: The Story of Aaron Swartz | full movie (2014)"
                    description={truncate(description, {
                        length: 90,
                    })}
                />
            </Card>
        </div>
    );
};

export default ArticleCardVertical;
