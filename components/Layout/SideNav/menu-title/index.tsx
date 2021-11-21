import React, { FC } from 'react';
import { Typography } from 'antd';
import styles from './index.module.scss';

const { Text } = Typography;

interface IMenuTitle {
    value: string;
}
const MenuTitle: FC<IMenuTitle> = ({ value }) => {
    return (
        <div className={styles.menu_title}>
            <Text className={styles.menu_title__text}>{value}</Text>
        </div>
    );
};

export default MenuTitle;
