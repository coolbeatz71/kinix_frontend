import React, { FC } from 'react';
import { Grid, Modal } from 'antd';
import Stories from 'react-insta-stories';
import { CloseCircleOutlined } from 'icons';
import { IUnknownObject } from '@interfaces/app';
import { Story } from 'react-insta-stories/dist/interfaces';
import StorySeeMore from '@components/common/StorySeeMore';
import ReadMoreButton from '@components/common/ReadMoreButton';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;

const StoryModal: FC = () => {
    const { md } = useBreakpoint();
    const stories: Story[] = [
        {
            seeMoreCollapsed: ({ toggleMore }) => <ReadMoreButton onClick={() => toggleMore(true)} />,
            url: 'http://res.cloudinary.com/kiinox/image/upload/v1663347328/stories/ab6761610000e5eb6d1dac9cd0d24eee082f5410_qxufxq.jpg',
            seeMore: ({ close }: IUnknownObject) => (
                <StorySeeMore
                    onClose={close}
                    legend="People"
                    className={styles.storyPopup__seeMore}
                    title="Ça vient de tomber, les nouvelle certifications"
                    subtitle="Certification pour Damso, Gims, Ninho et Tiakola."
                    body={`Ce 29 octobre 2022 FALLY IPUPA va livrer le concert de sa carrière au stade des martyrs de
                    Kinshasa, les billets sont deja en vente dans les stations services de la ville , les banderoles
                    et les pancartes sont affichés partout dans la ville.`}
                />
            ),
        },
        {
            url: 'http://res.cloudinary.com/kiinox/image/upload/v1665595979/stories/308360477_648982183256748_479402517382652513_n_btfbb4.jpg',
        },
        {
            type: 'video',
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            seeMoreCollapsed: ({ toggleMore }) => <ReadMoreButton onClick={() => toggleMore(true)} />,
            seeMore: ({ close }: IUnknownObject) => (
                <StorySeeMore
                    onClose={close}
                    legend="People"
                    className={styles.storyPopup__seeMore}
                    title="Ça vient de tomber, les nouvelle certifications"
                    subtitle="Certification pour Damso, Gims, Ninho et Tiakola."
                    body={`Ce 29 octobre 2022 FALLY IPUPA va livrer le concert de sa carrière au stade des martyrs de
                    Kinshasa, les billets sont deja en vente dans les stations services de la ville , les banderoles
                    et les pancartes sont affichés partout dans la ville.`}
                />
            ),
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
