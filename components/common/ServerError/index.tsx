import { FC } from 'react';
import Image from 'next/image';

import Result from 'antd/lib/result';
import Button from 'antd/lib/button';

import { useTranslation } from 'react-i18next';
import useDarkLight from '@hooks/useDarkLight';
import { IUnknownObject } from '@interfaces/app';

import styles from './index.module.scss';

export interface IServerErrorProps {
    onRefresh: () => void;
    error: Error | IUnknownObject | null;
}

const ServerError: FC<IServerErrorProps> = ({ onRefresh, error }) => {
    const { t } = useTranslation();
    const { value, isDark } = useDarkLight();

    return (
        <div className={styles.serverError} data-theme={value}>
            <Result
                title={t('serverErrorTitle')}
                subTitle={error?.message || t('serverErrorDesc')}
                icon={<Image src="/server-error.svg" layout="responsive" width={100} height={100} />}
                extra={
                    <div className="d-flex justify-content-center">
                        <Button size="large" key="refresh" onClick={onRefresh} type={isDark ? 'default' : 'primary'}>
                            {t('refreshPageButton')}
                        </Button>
                    </div>
                }
            />
        </div>
    );
};

export default ServerError;
