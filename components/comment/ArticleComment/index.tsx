import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Col, List, Row, Tooltip, Modal, notification } from 'antd';
import { EditFilled, DeleteFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { IComment } from '@interfaces/api';
import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { getBgColor } from '@helpers/getBgColor';
import getAllArticleCommentsAction from '@redux/comments/all';
import deleteArticleCommentAction from '@redux/comments/delete';
import UpdateArticleCommentModal from '@components/modal/UpdateArticleCommentModal';

const { Item } = List;
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
    const {
        delete: { error },
    } = useSelector(({ comments }: IRootState) => comments);
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
                        notification.success({
                            maxCount: 1,
                            key: 'success',
                            message: 'Youpi!',
                            placement: 'topRight',
                            description: getPayload(res).message,
                        });
                    } else if (res.type === 'comments/delete/rejected') {
                        notification.error({
                            maxCount: 1,
                            key: 'error',
                            message: 'Youpi!',
                            placement: 'topRight',
                            description: error?.message,
                        });
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
            <Item.Meta
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
            <UpdateArticleCommentModal
                slug={slug}
                initialValues={comment}
                openModal={openUpdateModal}
                setOpenModal={setOpenUpdateModal}
            />
        </Item>
    );
};

export default ArticleComment;
