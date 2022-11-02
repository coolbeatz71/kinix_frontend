import React, { FC } from 'react';
import { Button } from 'antd';
import useDarkLight from '@hooks/useDarkLight';
import { IShareType, shareList } from '@constants/social';
import SocialShare from '@components/sharings/SocialShare';

import styles from './index.module.scss';

export interface IArticleShareProps {
    link: string;
    title: string;
}

const ArticleShare: FC<IArticleShareProps> = ({ link, title }) => {
    const { isDark, value } = useDarkLight();

    return (
        <div className={styles.articleShare} data-theme={value}>
            {shareList.map((share) => (
                <SocialShare key={share.name} type={share.name as IShareType} link={link} title={title}>
                    <Button
                        shape="circle"
                        icon={share.icon}
                        data-platform={share.name}
                        type={isDark ? 'default' : 'primary'}
                        className={styles.articleShare__button}
                    />
                </SocialShare>
            ))}
        </div>
    );
};

export default ArticleShare;
