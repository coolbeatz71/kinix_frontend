import React, { FC } from 'react';
import { Button, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text, Title, Paragraph } = Typography;

export interface IStorySeeMoreProps {
    body: string;
    title: string;
    legend: string;
    subtitle: string;
    className: string;
    onClose: () => void;
}

const StorySeeMore: FC<IStorySeeMoreProps> = ({ className, onClose, title, subtitle, legend, body }) => {
    const { t } = useTranslation();

    return (
        <div className={className}>
            <div className="d-flex flex-column align-items-center">
                <Tag data-legend>{legend}</Tag>
                <Title data-title>{title}</Title>
                <Text data-subtitle>{subtitle}</Text>
            </div>
            <Paragraph data-body>{body}</Paragraph>
            <Button danger type="primary" onClick={onClose}>
                {t('close')}
            </Button>
        </div>
    );
};

export default StorySeeMore;
