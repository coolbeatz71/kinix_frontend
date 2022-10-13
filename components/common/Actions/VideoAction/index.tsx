import React, { FC, Fragment, ReactElement, useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import useDarkLight from '@hooks/useDarkLight';
import { EllipsisOutlined } from '@ant-design/icons';
import PlaylistModal from '@components/modal/PlaylistModal';

import styles from './index.module.scss';

export interface IVideoActionProps {
    videoId: number;
    children?: ReactElement;
    context: 'standalone' | 'card';
}

const VideoAction: FC<IVideoActionProps> = ({ videoId, context, children }) => {
    const { value } = useDarkLight();
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <Fragment>
            <Dropdown
                arrow
                visible={openMenu}
                trigger={['click']}
                placement="topRight"
                className={styles.videoAction}
                onVisibleChange={(v) => setOpenMenu(v)}
                overlay={
                    <Menu className={styles.videoAction__menu}>
                        <PlaylistModal videoId={videoId} closeMenu={() => setOpenMenu(false)} />
                    </Menu>
                }
            >
                {context === 'card' ? (
                    <Button
                        type="text"
                        data-theme={value}
                        icon={<EllipsisOutlined />}
                        className={styles.videoAction__button}
                    />
                ) : (
                    children
                )}
            </Dropdown>
        </Fragment>
    );
};

export default VideoAction;
