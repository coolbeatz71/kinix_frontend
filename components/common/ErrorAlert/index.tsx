import React, { FC } from 'react';
import { Alert } from 'antd';
import { IUnknownObject } from '@interfaces/app';

import styles from './index.module.scss';

export interface IErrorAlertProps {
    banner: boolean;
    showIcon: boolean;
    closable: boolean;
    error: Error | IUnknownObject | null;
}

const ErrorAlert: FC<IErrorAlertProps> = ({ error, closable, banner, showIcon }) =>
    error && (
        <Alert
            type="error"
            banner={banner}
            closable={closable}
            showIcon={showIcon}
            message={error?.message}
            className={styles.errorAlert}
        />
    );

export default ErrorAlert;
