import React, { FC } from 'react';
import useDarkLight from '@hooks/useDarkLight';
import FavoriteTabs from '@components/favorite/FavoriteTabs';

import styles from './index.module.scss';

const FavoriteContainer: FC = () => {
    const { value } = useDarkLight();
    return (
        <div data-theme={value} className={styles.favorites}>
            <FavoriteTabs />
        </div>
    );
};

export default FavoriteContainer;
