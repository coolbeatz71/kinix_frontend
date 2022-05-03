import React, { FC, Fragment } from 'react';
import ArticleCover from '@components/common/ArticleCover';
import ArticleBody from '@components/common/ArticleBody';

const SingleArticleContainer: FC = () => {
    return (
        <Fragment>
            <ArticleCover />

            <div className="mt-5">
                <ArticleBody />
            </div>
        </Fragment>
    );
};

export default SingleArticleContainer;
