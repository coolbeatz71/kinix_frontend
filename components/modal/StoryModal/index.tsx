import React, { FC } from 'react';
import { Modal } from 'antd';
import Stories from 'react-insta-stories';
import { CloseCircleOutlined } from 'icons';
import { Story } from 'react-insta-stories/dist/interfaces';

import styles from './index.module.scss';

const StoryModal: FC = () => {
    const stories: Story[] = [
        {
            url: 'http://res.cloudinary.com/kiinox/image/upload/v1663347328/stories/ab6761610000e5eb6d1dac9cd0d24eee082f5410_qxufxq.jpg',
            header: {
                heading: 'Lorem ipsum title',
                profileImage:
                    'http://res.cloudinary.com/kiinox/image/upload/v1663347328/stories/ab6761610000e5eb6d1dac9cd0d24eee082f5410_qxufxq.jpg',
                subheading: 'Sub heading',
            },
        },
        // {
        //     url: 'http://res.cloudinary.com/kiinox/image/upload/v1665595979/stories/308360477_648982183256748_479402517382652513_n_btfbb4.jpg',
        // },
    ];
    return (
        <Modal
            open
            closable
            width={520}
            title={null}
            footer={null}
            className={styles.storyPopup}
            closeIcon={<CloseCircleOutlined />}
        >
            <div className={styles.storyPopup__content}>
                <Stories stories={stories} width="100%" loop />
            </div>
        </Modal>
    );
};

export default StoryModal;
