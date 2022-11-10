import { FC } from 'react';
import Link from 'next/link';

import Row from 'antd/lib/row';
import Button from 'antd/lib/button';

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
