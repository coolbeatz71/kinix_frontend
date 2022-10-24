import React, { FC } from 'react';
import { Alert } from 'antd';
import { IUnknownObject } from '@interfaces/app';

export interface IErrorAlertProps {
    banner: boolean;
    showIcon: boolean;
    closable: boolean;
    error: Error | IUnknownObject | null;
}

const ErrorAlert: FC<IErrorAlertProps> = ({ error, closable, banner, showIcon }) => {
    return (
        error && (
            <Alert
                type="error"
                banner={banner}
                className="mb-4"
                showIcon={showIcon}
                closable={closable}
                message={error?.message}
            />
        )
    );
};

export default ErrorAlert;
