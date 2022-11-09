import { FC } from 'react';

import Button from 'antd/lib/button';
import Result from 'antd/lib/result';

import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

const FormSuccessResult: FC<{ title: string; onClose: () => void }> = ({ title, onClose }) => {
    const { t } = useTranslation();
    return (
        <Result
            title={title}
            status="success"
            className={styles.successResult}
            extra={
                <div className="d-flex justify-content-center">
                    <Button size="large" type="primary" ghost onClick={onClose}>
                        {t('close')}
                    </Button>
                </div>
            }
        />
    );
};

export default FormSuccessResult;
