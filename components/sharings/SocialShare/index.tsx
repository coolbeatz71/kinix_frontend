import { FC, Fragment, ReactElement } from 'react';
import qs from 'query-string';

import message from 'antd/lib/message';

import { useTranslation } from 'react-i18next';
import copyToClipboard from '@helpers/copyToClipboard';

export interface ISocialShareProps {
    link: string;
    title: string;
    children: ReactElement;
    type: 'facebook' | 'whatsapp' | 'twitter' | 'email' | 'copy';
}

const SocialShare: FC<ISocialShareProps> = ({ type, title, link, children }) => {
    const { t } = useTranslation();
    const platforms = {
        twitter: `http://twitter.com/share?${qs.stringify({
            text: `${title} ${link}`,
        })}`,
        whatsapp: `https://api.whatsapp.com/send?${qs.stringify({
            text: `${title} ${link}`,
        })}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?${qs.stringify({
            u: link,
            quote: title,
            display: 'page',
        })}`,
        email: `mailto:?${qs.stringify({
            subject: title,
            body: `${title} ${link}`,
        })}`,
    };

    const copyText = (): Promise<void> => {
        return copyToClipboard(link).then(() => {
            message.success(`${t('textCopied')}: "${link}"!`, 2);
        });
    };

    return (
        <Fragment>
            {type === 'copy' ? (
                <div onClick={copyText}>{children}</div>
            ) : (
                <a href={platforms[type]} target="_blank" rel="noreferrer noopener">
                    {children}
                </a>
            )}
        </Fragment>
    );
};

export default SocialShare;
