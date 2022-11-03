import React, { FC } from 'react';
import { Grid, Modal } from 'antd';
import Stories from 'react-insta-stories';
import { CloseCircleOutlined } from 'icons';
import { Story } from 'react-insta-stories/dist/interfaces';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;

const StoryModal: FC = () => {
    const { md } = useBreakpoint();
    const stories: Story[] = [
        {
            url: 'http://res.cloudinary.com/kiinox/image/upload/v1663347328/stories/ab6761610000e5eb6d1dac9cd0d24eee082f5410_qxufxq.jpg',
        },
        {
            url: 'http://res.cloudinary.com/kiinox/image/upload/v1665595979/stories/308360477_648982183256748_479402517382652513_n_btfbb4.jpg',
        },
        {
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            type: 'video',
        },
    ];
    return (
        <Modal
            open
            title
            closable
            footer={null}
            style={{ top: 16 }}
            width={md ? 620 : ''}
            className={styles.storyPopup}
            closeIcon={<CloseCircleOutlined />}
        >
            <div className={styles.storyPopup__content}>
                <Stories stories={stories} width="100%" loop defaultInterval={30000} />
            </div>
        </Modal>
    );
};

export default StoryModal;
