import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Col, List, Row, Tooltip, Modal } from 'antd';
import { EditFilled, DeleteFilled, ExclamationCircleOutlined, UserOutlined } from 'icons';
import { IComment } from '@interfaces/api';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import { getBgColor } from '@helpers/getBgColor';
import getAllArticleCommentsAction from '@redux/comments/all';
import deleteArticleCommentAction from '@redux/comments/delete';
import getNotification from '@helpers/getNotification';

const DynamicUpdateCommentModal = dynamic(() => import('@components/modal/UpdateArticleCommentModal'));

const { Item } = List;
const { Meta } = Item;
const { confirm } = Modal;

export interface IArticleCommentProps {
    slug: string;
    comment: IComment;
    createdTime: string;
    isCommentOwner: boolean;
}

const ArticleComment: FC<IArticleCommentProps> = ({ slug, comment, createdTime, isCommentOwner }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

    const showDeleteConfirm = (): void => {
        confirm({
            okText: t('yes'),
            cancelText: t('no'),
            okButtonProps: {
                ghost: true,
                danger: true,
                type: 'primary',
            },
            title: t('deleteCommentConfirm'),
            icon: <ExclamationCircleOutlined />,
            cancelButtonProps: { type: 'primary', ghost: true, danger: false },
            onOk() {
                dispatch(deleteArticleCommentAction({ slug, id: Number(comment.id) })).then((res) => {
                    if (res.type === 'comments/delete/fulfilled') {
                        dispatch(getAllArticleCommentsAction({ slug }));
                        getNotification('success', getPayload(res).message);
                    } else if (res.type === 'comments/delete/rejected') {
                        getNotification('error', getPayload(res).message);
                    }
                });
            },
        });
    };

    return (
        <Item
            actions={
                isCommentOwner
                    ? [
                          <Tooltip key="edit" title={t('modify')} placement="topRight">
                              <Button
                                  ghost
                                  size="small"
                                  type="primary"
                                  className="me-2"
                                  icon={<EditFilled />}
                                  onClick={() => setOpenUpdateModal(true)}
                              />
                          </Tooltip>,
                          <Tooltip title={t('delete')} placement="topRight" key="delete">
                              <Button
                                  ghost
                                  danger
                                  size="small"
                                  type="primary"
                                  icon={<DeleteFilled />}
                                  onClick={showDeleteConfirm}
                              />
                          </Tooltip>,
                      ]
                    : undefined
            }
        >
            <Meta
                title={
                    <Row justify="space-between" align="middle">
                        <Col>{comment.user?.userName}</Col>
                        <Col data-created-time>{createdTime}</Col>
                    </Row>
                }
                avatar={
                    <Avatar
                        size="small"
                        icon={<UserOutlined />}
                        src={comment.user?.image}
                        alt={comment.user?.userName}
                        className="d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: getBgColor(String(comment.user?.userName)) }}
                    />
                }
            />
            {comment.body}
            <DynamicUpdateCommentModal
                slug={slug}
                initialValues={comment}
                openModal={openUpdateModal}
                setOpenModal={setOpenUpdateModal}
            />
        </Item>
    );
};

export default ArticleComment;
