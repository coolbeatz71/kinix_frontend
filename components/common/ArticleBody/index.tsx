import React, { FC } from 'react';
import { BackTop, Col, Row, Typography } from 'antd';
import ArticleHeader from '@components/common/ArticleHeader';
import ArticleFooter from '@components/common/ArticleFooter';
import ArticleShare from '@components/common/Sharings/ArticleShare';

import styles from './index.module.scss';

const { Paragraph } = Typography;

const ArticleBody: FC = () => {
    return (
        <Row justify="space-between" className={styles.articleBody}>
            <Col span={6}>
                <ArticleShare />
            </Col>
            <Col span={12} className={styles.articleBody__content}>
                <ArticleHeader />
                <Paragraph data-paragraph>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum maiores repellat autem iusto quibusdam
                    fugit error illo eius architecto animi eligendi iste consequuntur nam explicabo, fuga iure, sit ad
                    fugiat aut ullam nobis rem molestiae culpa eveniet. Sequi, repellendus
                    <br />
                    <br />
                    exercitationem quia rerum eius dolorem non facere, iste incidunt quo quidem libero beatae
                    consequuntur! Unde possimus hic aspernatur illum ratione veniam laborum ipsam ipsa corporis maiores!
                    Rerum, a. Numquam reprehenderit eum beatae voluptas delectus placeat, autem voluptates officia,
                    ratione
                    <br />
                    <br />
                    architecto quae accusamus sint animi ipsam amet dolor suscipit necessitatibus illo a, provident
                    accusantium! Dignissimos numquam quasi veritatis aliquam placeat quia? Modi?
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit numquam id nemo corporis alias ipsa
                    quo. Voluptas, dicta recusandae laudantium totam cupiditate saepe vel fuga sunt perspiciatis,
                    blanditiis voluptate numquam!
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit numquam id nemo corporis alias ipsa
                    quo. Voluptas, dicta recusandae laudantium totam cupiditate saepe vel fuga sunt perspiciatis,
                    blanditiis voluptate numquam!
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit numquam id nemo corporis alias ipsa
                    quo. Voluptas, dicta recusandae laudantium totam cupiditate saepe vel fuga sunt perspiciatis,
                    blanditiis voluptate numquam!
                </Paragraph>
                <ArticleFooter />
                <BackTop />
            </Col>
            <Col span={6}></Col>
        </Row>
    );
};

export default ArticleBody;
