import { FC } from 'react';

import Button from 'antd/lib/button';

import { useTranslation } from 'react-i18next';

export interface IReadMoreButtonProps {
    onClick: () => void;
}

const SeeMoreButton: FC<IReadMoreButtonProps> = ({ onClick }) => {
    const { t } = useTranslation();

    return (
        <div className="d-flex justify-content-center">
            <Button data-read-more onClick={onClick} type="text">
                {t('readMore')}
            </Button>
        </div>
    );
};

export default SeeMoreButton;
