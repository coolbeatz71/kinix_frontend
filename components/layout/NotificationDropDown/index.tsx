import { FC } from 'react';
import { BellFilled, BellOutlined } from 'icons';

import Badge from 'antd/lib/badge';
import Button from 'antd/lib/button';

import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const NotificationDropDown: FC = () => {
    const { value } = useDarkLight();
    const count = 0 as number;
    return (
        <div className={styles.notification} data-theme={value}>
            <Button
                type="text"
                icon={
                    <Badge count={count} size="small">
                        {count === 0 ? <BellOutlined /> : <BellFilled />}
                    </Badge>
                }
            />
        </div>
    );
};

export default NotificationDropDown;
