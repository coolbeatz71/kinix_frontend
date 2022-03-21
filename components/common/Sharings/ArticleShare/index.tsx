import React, { FC } from 'react';
import { Button } from 'antd';
import { socialShare } from '@constants/social';

import styles from './index.module.scss';

const ArticleShare: FC = () => {
    return (
        <div className={styles.articleShare}>
            {socialShare.map((item) => (
                <Button
                    shape="circle"
                    type="primary"
                    key={item.name}
                    icon={item.icon}
                    data-platform={item.name}
                    className={styles.articleShare__button}
                />
            ))}
        </div>
    );
};

export default ArticleShare;
