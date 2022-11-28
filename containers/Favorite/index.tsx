import { FC } from 'react';
import useDarkLight from '@hooks/useDarkLight';
import FavoriteTabs from '@components/favorite/FavoriteTabs';

import styles from './index.module.scss';
import Card from 'antd/lib/card';

const FavoriteContainer: FC = () => {
    const { value } = useDarkLight();
    return (
        <Card bordered data-theme={value} className={styles.favorites}>
            <FavoriteTabs />
        </Card>
    );
};

export default FavoriteContainer;
