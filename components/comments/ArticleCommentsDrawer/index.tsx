import React, { FC, useCallback, useEffect } from 'react';
import numeral from 'numeral';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { Col, Drawer, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { CloseCircleOutlined } from 'icons';
import { IArticle } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import { EnumFormContext } from '@interfaces/app';
import { ICommentData } from '@interfaces/comments';
import getNotification from '@helpers/getNotification';
import addArticleCommentAction from '@redux/comments/add';
import getAllArticleCommentsAction from '@redux/comments/all';
import CreateArticleComment from '@components/form/CreateArticleComment';

const DynamicErrorAlert = dynamic(() => import('@components/common/ErrorAlert'));
const DynamicArticleCommentList = dynamic(() => import('@components/lists/ArticleCommentList'));
const DynamicCommentListSkeleton = dynamic(() => import('@components/skeleton/ArticleCommentList'));

import styles from './index.module.scss';

const { useForm } = Form;

export interface IArticleCommentsDrawerProps {
    article: IArticle;
    openDrawer: boolean;
    setOpenDrawer: (v: boolean) => void;
}

const ArticleCommentsDrawer: FC<IArticleCommentsDrawerProps> = ({ article, openDrawer, setOpenDrawer }) => {
    const [form] = useForm();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { error, loading, data: comments } = useSelector(({ comments: { all } }: IRootState) => all);
    const { error: errAddComment, loading: loadAddComment } = useSelector(({ comments: { add } }: IRootState) => add);

    const onCloseDrawer = (): void => {
        setOpenDrawer(false);
    };

    const reloadArticleComments = useCallback(() => {
        dispatch(getAllArticleCommentsAction({ slug: article.slug }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (openDrawer) reloadArticleComments();
    }, [openDrawer, reloadArticleComments]);

    const onSubmitComment = (formData: ICommentData): void => {
        const { body } = formData;

        dispatch(addArticleCommentAction({ isEdit: false, data: { slug: article.slug, body } })).then((res) => {
            if (res.type === 'comments/add/fulfilled') {
                form.resetFields();
                reloadArticleComments();
                getNotification('success', getPayload(res).message);
            }
        });
    };

    return (
        <Drawer
            width={520}
            placement="right"
            open={openDrawer}
            onClose={onCloseDrawer}
            title={
                <Row justify="space-between" align="middle">
                    <Col>{t('articleComment')}</Col>
                    <Col data-total>{comments?.count > 0 && numeral(comments?.count).format('0,0')}</Col>
                </Row>
            }
            closeIcon={<CloseCircleOutlined />}
            className={styles.articleCommentDrawer}
            footer={
                <div className="m-4">
                    <CreateArticleComment
                        formRef={form}
                        error={errAddComment}
                        loading={loadAddComment}
                        onSubmit={onSubmitComment}
                        formContext={EnumFormContext.CREATE}
                    />
                </div>
            }
        >
            {error ? (
                <DynamicErrorAlert error={error} closable banner showIcon />
            ) : loading ? (
                <DynamicCommentListSkeleton />
            ) : (
                <DynamicArticleCommentList comments={comments.rows} article={article} />
            )}
        </Drawer>
    );
};

export default ArticleCommentsDrawer;
