import React, { FC } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export interface IReadMoreButtonProps {
    onClick: () => void;
}

const ReadMoreButton: FC<IReadMoreButtonProps> = ({ onClick }) => {
    const { t } = useTranslation();

    return (
        <div className="d-flex justify-content-center">
            <Button data-read-more onClick={onClick}>
                {t('readMore')}
            </Button>
        </div>
    );
};

export default ReadMoreButton;
