import { cloneElement, CSSProperties, FC, Fragment, ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { CloseCircleOutlined } from 'icons';

import Modal from 'antd/lib/modal';
import Typography from 'antd/lib/typography';

import { APP_NAME } from '@constants/platform';

import styles from './index.module.scss';

const { Title } = Typography;

interface Props {
    icon?: string;
    open?: boolean;
    noTitle?: boolean;
    onOpen?: () => void;
    onCancel?: () => void;
    trigger?: ReactElement;
    onCloseClick?: () => void;
    iconStyle?: CSSProperties;
    title?: string | string[];
    titleLevel?: 1 | 2 | 3 | 4;
    titleType?: 'danger' | 'secondary' | 'warning';
    children: string | string[] | ReactElement | ReactElement[];
}

const AuthModal: FC<Props> = ({
    icon,
    trigger,
    children,
    titleType,
    title = ` `,
    onCloseClick,
    titleLevel = 2,
    noTitle = false,
    open: visible = false,
    onOpen = () => {
        //
    },
    onCancel = () => {
        //
    },
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
        <Fragment>
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
                style={{ top: 16 }}
                closeIcon={closeIcon}
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
        </Fragment>
    );
};

export default AuthModal;
