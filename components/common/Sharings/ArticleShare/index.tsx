import React, { FC } from 'react';
import { Button } from 'antd';
import { shareList } from '@constants/social';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const ArticleShare: FC = () => {
    const { isDark } = useDarkLight();

    return (
        <div className={styles.articleShare}>
            {shareList.map((item) => (
                <Button
                    shape="circle"
                    key={item.name}
                    icon={item.icon}
                    data-platform={item.name}
                    type={isDark ? 'default' : 'primary'}
                    className={styles.articleShare__button}
                />
            ))}
        </div>
    );
};

export default ArticleShare;
