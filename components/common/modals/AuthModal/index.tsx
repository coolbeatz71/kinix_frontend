import React, { cloneElement, CSSProperties, FC, ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { Modal, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import { APP_NAME } from '@constants/platform';

interface Props {
    title?: string | string[];
    trigger?: ReactElement;
    visible?: boolean;
    titleLevel?: 1 | 2 | 3 | 4;
    titleType?: 'danger' | 'secondary' | 'warning';
    noTitle?: boolean;
    icon?: string;
    iconStyle?: CSSProperties;
    onVisible?: () => void;
    onCancel?: () => void;
    onCloseClick?: () => void;
    children: string | string[] | ReactElement | ReactElement[];
}

const AuthModal: FC<Props> = ({
    title = ` `,
    trigger,
    visible: vs = false,
    titleLevel = 2,
    titleType,
    noTitle = false,
    icon,
    onVisible = () => {
        //
    },
    onCancel = () => {
        //
    },
    onCloseClick,
    children,
}) => {
    const [visible, setVisible] = useState(vs);

    useEffect(() => {
        if (visible !== vs) setVisible(vs);
    }, [visible, vs]);

    const _title = noTitle ? (
        <div />
    ) : (
        <Typography.Title level={titleLevel} ellipsis type={titleType}>
            {title}
        </Typography.Title>
    );

    return (
        <>
            {trigger &&
                cloneElement(trigger, {
                    onClick: () => {
                        setVisible(true);
                        onVisible();
                    },
                })}
            <Modal
                footer={null}
                destroyOnClose
                title={_title}
                visible={visible}
                className={styles[icon ? 'modal_icon' : 'modal']}
                closeIcon={<CloseCircleOutlined style={{ fontSize: '22px' }} />}
                onCancel={() => {
                    setVisible(false);
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
