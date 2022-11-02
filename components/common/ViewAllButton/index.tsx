import React, { FC } from 'react';
import { Row, Button } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface IViewAllButtonProps {
    link: string;
}
const ViewAllButton: FC<IViewAllButtonProps> = ({ link }) => {
    const { t } = useTranslation();

    return (
        <Row justify="end">
            <Link href={link} passHref>
                <Button size="large">{t('viewAll')}</Button>
            </Link>
        </Row>
    );
};

export default ViewAllButton;
