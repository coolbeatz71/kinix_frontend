import React, { FC } from 'react';
import { Typography } from 'antd';
import styles from './index.module.scss';

const { Text } = Typography;

interface IMenuTitle {
    value: string;
}
const MenuTitle: FC<IMenuTitle> = ({ value }) => {
    return (
        <div className={styles.menuTitle}>
            <Text className={styles.menuTitle__text}>{value}</Text>
        </div>
    );
};

export default MenuTitle;
