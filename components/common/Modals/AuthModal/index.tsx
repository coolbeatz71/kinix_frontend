import React, { cloneElement, CSSProperties, FC, ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { Modal, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import { APP_NAME } from '@constants/platform';

const { Title } = Typography;

// TODO: handle the open and close context inside redux, instead of using internal state

interface Props {
    title?: string | string[];
    trigger?: ReactElement;
    open?: boolean;
    titleLevel?: 1 | 2 | 3 | 4;
    titleType?: 'danger' | 'secondary' | 'warning';
    noTitle?: boolean;
    icon?: string;
    iconStyle?: CSSProperties;
    onOpen?: () => void;
    onCancel?: () => void;
    onCloseClick?: () => void;
    children: string | string[] | ReactElement | ReactElement[];
}

const AuthModal: FC<Props> = ({
    title = ` `,
    trigger,
    open: visible = false,
    titleLevel = 2,
    titleType,
    noTitle = false,
    icon,
    onOpen = () => {
        //
    },
    onCancel = () => {
        //
    },
    onCloseClick,
    children,
}) => {
    const [open, setOpen] = useState(visible);

    useEffect(() => {
        if (open !== visible) setOpen(visible);
    }, [open, visible]);

    const _title = noTitle ? (
        <div />
    ) : (
        <Title level={titleLevel} ellipsis type={titleType}>
            {title}
        </Title>
    );

    const closeIcon = <CloseCircleOutlined style={{ fontSize: '22px' }} />;

    return (
        <>
            {trigger &&
                cloneElement(trigger, {
                    onClick: () => {
                        setOpen(true);
                        onOpen();
                    },
                })}
            <Modal
                open={open}
                footer={null}
                destroyOnClose
                title={_title}
                closeIcon={closeIcon}
                style={{ top: 16 }}
                className={styles[icon ? 'modal_icon' : 'modal']}
                onCancel={() => {
                    setOpen(false);
                    if (onCloseClick) onCloseClick();
                    else onCancel();
                }}
            >
                <Head>
                    <title>
                        {title} | {APP_NAME}
                    </title>
                </Head>
                {children}
            </Modal>
        </>
    );
};

export default AuthModal;
