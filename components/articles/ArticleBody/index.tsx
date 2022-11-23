import { FC, Fragment, ReactElement, useCallback, useEffect, useState } from 'react';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Grid from 'antd/lib/grid';
import Affix from 'antd/lib/affix';
import BackTop from 'antd/lib/back-top';
import Typography from 'antd/lib/typography';

import { IArticle } from '@interfaces/api';
import useDarkLight from '@hooks/useDarkLight';
import { IUnknownObject } from '@interfaces/app';
import { ALL_ARTICLES_PATH } from '@constants/paths';
import getPlatformUrl from '@helpers/getPlatformUrl';
import ArticleShare from '@components/sharings/ArticleShare';
import ArticleHeader from '@components/articles/ArticleHeader';
import ArticleTagsList from '@components/lists/ArticleTagsList';
import PopularArticleList from '@components/lists/PopularArticleList';
import RelatedArticleList from '@components/lists/RelatedArticleList';
import SingleArticleAction from '@components/actions/SingleArticleAction';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Paragraph } = Typography;

export interface IArticleBodyProps {
    article: IArticle;
    related: IArticle[];
}

const ArticleBody: FC<IArticleBodyProps> = ({ article, related }) => {
    const { value } = useDarkLight();
    const { xs, sm, md, lg } = useBreakpoint();
    const [scrolled, setScrolled] = useState<string>('');
    const sharedLink = `${getPlatformUrl()}${ALL_ARTICLES_PATH}/${article.slug}`;

    const backToStyle: IUnknownObject = {
        position: 'fixed',
        right: 20,
        zIndex: 1,
        bottom: '20%',
    };

    const scrollHandler = useCallback(() => {
        if (lg) setScrolled(window.pageYOffset > 640 && window.pageYOffset < 1500 ? 'over' : '');
        else setScrolled(window.pageYOffset < 1200 ? 'over' : '');
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
                {(xs || sm) && !md && (
                    <Col span={24} className={styles.articleBody__share}>
                        <ArticleShare link={sharedLink} title={article.title} />
                    </Col>
                )}

                {md && (
                    <Col xs={3} sm={2} md={2} lg={3} xl={5}>
                        <ActionWrapper>
                            <ArticleShare link={sharedLink} title={article.title} />
                        </ActionWrapper>
                    </Col>
                )}
                <Col xs={24} sm={24} md={22} lg={13} xl={11} className={styles.articleBody__content}>
                    <ArticleHeader createdAt={article.createdAt as string} />
                    <div>
                        <Paragraph data-summary>{article.summary}</Paragraph>
                        <div data-article-body dangerouslySetInnerHTML={{ __html: article.body }} />
                    </div>

                    {lg && <SingleArticleAction article={article} />}
                    {lg && <ArticleTagsList tags={article.tags} />}
                    <BackTop style={backToStyle} data-back-top />
                </Col>

                {lg && (
                    <Col sm={24} lg={8}>
                        <RelatedArticleList articles={related} />
                    </Col>
                )}

                {(xs || sm || md) && !lg && (
                    <Fragment>
                        <Col md={2} lg={5}></Col>
                        <Col xs={24} sm={24} md={22} lg={8} xl={8}>
                            <ArticleTagsList tags={article.tags} />
                        </Col>
                    </Fragment>
                )}
            </Row>

            <Row className="mt-5">
                <div className="mb-4">{(xs || sm) && !md && <RelatedArticleList articles={related} />}</div>
                <PopularArticleList />
            </Row>
        </Fragment>
    );
};

export default ArticleBody;
