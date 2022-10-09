import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Col, List, Row, Tooltip, Modal, notification } from 'antd';
import { EditFilled, DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { IComment } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import getAllArticleCommentsAction from '@redux/comments/all';
import deleteArticleCommentAction from '@redux/comments/delete';
import UpdateArticleCommentModal from '@components/modal/UpdateArticleCommentModal';

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
                            description: t('commentDeletedSuccess'),
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
        <List.Item
            actions={
                isCommentOwner
                    ? [
                          <Tooltip key="edit" title="Modifier" placement="topRight">
                              <Button
                                  ghost
                                  size="small"
                                  type="primary"
                                  className="me-2"
                                  icon={<EditFilled />}
                                  onClick={() => setOpenUpdateModal(true)}
                              />
                          </Tooltip>,
                          <Tooltip title="Effacer" placement="topRight" key="delete">
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
            <List.Item.Meta
                title={
                    <Row justify="space-between" align="middle">
                        <Col>{comment.user?.userName}</Col>
                        <Col data-created-time>{createdTime}</Col>
                    </Row>
                }
                avatar={<Avatar size="small" alt={comment.user?.userName} src={comment.user?.image} />}
            />
            {comment.body}
            <UpdateArticleCommentModal
                slug={slug}
                initialValues={comment}
                openModal={openUpdateModal}
                setOpenModal={setOpenUpdateModal}
            />
        </List.Item>
    );
};

export default ArticleComment;
