import React, { FC, Fragment, ReactElement, useCallback, useEffect, useState } from 'react';
import { BackTop, Col, Row, Typography, Grid, Affix } from 'antd';
import { IArticle, IUser } from '@interfaces/api';
import useDarkLight from '@hooks/useDarkLight';
import { IUnknownObject } from '@interfaces/app';
import ArticleAction from '../Actions/ArticleAction';
import ArticleHeader from '@components/common/ArticleHeader';
import ArticleTagsList from '@components/common/ArticleTagsList';
import ArticleShare from '@components/common/Sharings/ArticleShare';
import PopularArticleList from '@components/common/PopularArticleList';
import RelatedArticleList from '@components/common/RelatedArticleList';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Paragraph } = Typography;

export interface IArticleBodyProps {
    user: IUser;
    article: IArticle;
    related: IArticle[];
}

const ArticleBody: FC<IArticleBodyProps> = ({ user, article, related }) => {
    const { value } = useDarkLight();
    const { lg, md } = useBreakpoint();
    const [scrolled, setScrolled] = useState<string>('');

    const backToStyle: IUnknownObject = {
        position: 'fixed',
        right: 20,
        zIndex: 1,
        bottom: '20%',
    };

    const scrollHandler = useCallback(() => {
        if (lg) setScrolled(window.pageYOffset > 640 && window.pageYOffset < 1500 ? 'over' : '');
        else setScrolled(window.pageYOffset < 1500 ? 'over' : '');
    }, [lg]);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, { passive: true });
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [scrollHandler]);

    const ActionWrapper: FC<{ children: ReactElement }> = ({ children }) => (
        <Fragment>{scrolled === 'over' ? <Affix offsetTop={80}>{children}</Affix> : children}</Fragment>
    );

    return (
        <Fragment>
            <Row data-theme={value} justify="space-between" className={styles.articleBody}>
                <Col xs={3} sm={2} lg={5}>
                    <ActionWrapper>
                        <ArticleShare />
                    </ActionWrapper>
                </Col>
                <Col xs={21} sm={22} lg={11} className={styles.articleBody__content}>
                    <ArticleHeader createdAt={article.createdAt as string} />
                    <div>
                        <Paragraph data-summary>{article.summary}</Paragraph>
                        <div data-article-body dangerouslySetInnerHTML={{ __html: article.body }} />
                    </div>

                    {lg && <ArticleAction user={user} article={article} />}
                    {lg && <ArticleTagsList tags={article.tags} />}
                    <BackTop style={backToStyle} data-back-top />
                </Col>

                {lg && (
                    <Col sm={24} lg={8}>
                        <RelatedArticleList articles={related} />
                    </Col>
                )}

                {md && !lg && (
                    <Col sm={24} lg={8}>
                        <ArticleTagsList tags={article.tags} />
                    </Col>
                )}
            </Row>

            {lg && (
                <Row className="mt-5">
                    <PopularArticleList />
                </Row>
            )}
        </Fragment>
    );
};

export default ArticleBody;
