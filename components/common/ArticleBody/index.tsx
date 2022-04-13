import React, { FC, Fragment, ReactElement, useCallback, useEffect, useState } from 'react';
import { BackTop, Col, Row, Typography, Grid, Affix } from 'antd';
import ArticleHeader from '@components/common/ArticleHeader';
import ArticleShare from '@components/common/Sharings/ArticleShare';
import PopularArticleList from '@components/common/PopularArticleList';
import RelatedArticleList from '@components/common/RelatedArticleList';
import ArticleTags from '@components/common/ArticleTags';
import useDarkLight from '@hooks/useDarkLight';
import { IUnknownObject } from '@interfaces/app';

import styles from './index.module.scss';
import ArticleAction from '../Actions/ArticleAction';

const { Paragraph } = Typography;
const { useBreakpoint } = Grid;

const ArticleBody: FC = () => {
    const { value } = useDarkLight();
    const { lg } = useBreakpoint();
    const [scrolled, setScrolled] = useState<string>('');

    const backToStyle: IUnknownObject = {
        position: 'fixed',
        right: 20,
        zIndex: 1,
        bottom: '20%',
    };

    const scrollHandler = useCallback(() => {
        setScrolled(window.pageYOffset > 640 ? 'over' : '');
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, { passive: true });
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [scrollHandler]);

    const ActionWrapper: FC<{ children: ReactElement }> = ({ children }) => (
        <Fragment>{scrolled !== 'over' ? <Affix offsetTop={80}>{children}</Affix> : children}</Fragment>
    );

    return (
        <Fragment>
            <Row data-theme={value} justify="space-between" className={styles.articleBody}>
                <Col xs={3} sm={3} lg={5}>
                    <ActionWrapper>
                        <ArticleShare />
                    </ActionWrapper>
                </Col>
                <Col xs={21} sm={21} lg={11} className={styles.articleBody__content}>
                    <ArticleHeader />
                    <Paragraph data-paragraph>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum maiores repellat autem iusto
                        quibusdam fugit error illo eius architecto animi eligendi iste consequuntur nam explicabo, fuga
                        iure, sit ad fugiat aut ullam nobis rem molestiae culpa eveniet. Sequi, repellendus
                        <br />
                        <br />
                        exercitationem quia rerum eius dolorem non facere, iste incidunt quo quidem libero beatae
                        consequuntur! Unde possimus hic aspernatur illum ratione veniam laborum ipsam ipsa corporis
                        maiores! Rerum, a. Numquam reprehenderit eum beatae voluptas delectus placeat, autem voluptates
                        officia, ratione
                        <br />
                        <br />
                        architecto quae accusamus sint animi ipsam amet dolor suscipit necessitatibus illo a, provident
                        accusantium! Dignissimos numquam quasi veritatis aliquam placeat quia? Modi?
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit numquam id nemo corporis alias
                        ipsa quo. Voluptas, dicta recusandae laudantium totam cupiditate saepe vel fuga sunt
                        perspiciatis, blanditiis voluptate numquam!
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit numquam id nemo corporis alias
                        ipsa quo. Voluptas, dicta recusandae laudantium totam cupiditate saepe vel fuga sunt
                        perspiciatis, blanditiis voluptate numquam!
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit numquam id nemo corporis alias
                        ipsa quo. Voluptas, dicta recusandae laudantium totam cupiditate saepe vel fuga sunt
                        perspiciatis, blanditiis voluptate numquam!
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit numquam id nemo corporis alias
                        ipsa quo. Voluptas, dicta recusandae laudantium totam cupiditate saepe vel fuga sunt
                        perspiciatis, blanditiis voluptate numquam!
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit numquam id nemo corporis alias
                        ipsa quo. Voluptas, dicta recusandae laudantium totam cupiditate saepe vel fuga sunt
                        perspiciatis, blanditiis voluptate numquam!
                    </Paragraph>
                    {lg && <ArticleAction />}
                    <ArticleTags />
                    <BackTop style={backToStyle} data-back-top />
                </Col>

                {lg && (
                    <Col sm={24} lg={8}>
                        <RelatedArticleList fetched error={null} articles={[]} />
                    </Col>
                )}
            </Row>

            {lg && (
                <Row className="mt-5">
                    <PopularArticleList fetched error={null} articles={[]} />
                </Row>
            )}
        </Fragment>
    );
};

export default ArticleBody;
