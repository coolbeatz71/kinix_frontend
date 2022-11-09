import { FC } from 'react';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';

import Tag from 'antd/lib/tag';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';

const { Text, Title, Paragraph } = Typography;

export interface IStorySeeMoreProps {
    body: string;
    title: string;
    legend: string;
    subtitle: string;
    className: string;
    onClose: () => void;
    redirectUrl?: string | null | undefined;
}

const StorySeeMore: FC<IStorySeeMoreProps> = ({ className, onClose, title, subtitle, legend, body, redirectUrl }) => {
    const { t } = useTranslation();

    return (
        <div className={className}>
            <div className="d-flex flex-column align-items-center">
                <Tag data-legend color="gold">
                    {upperFirst(legend)}
                </Tag>
                <Title data-title>{title}</Title>
                <Text data-subtitle>{upperFirst(subtitle)}</Text>
            </div>
            <Paragraph data-body>{upperFirst(body)}</Paragraph>
            {isEmpty(redirectUrl) ? (
                <Button onClick={onClose}>{t('close')}</Button>
            ) : (
                <Button danger type="primary" href={redirectUrl as string} target="_blank" onClick={onClose}>
                    {t('visitNow')}
                </Button>
            )}
        </div>
    );
};

export default StorySeeMore;
