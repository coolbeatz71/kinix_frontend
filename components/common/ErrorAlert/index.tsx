import React, { FC } from 'react';
import { Alert, Form } from 'antd';
import { IUnknownObject } from '@interfaces/app';

const { Item } = Form;

export interface IErrorAlertProps {
    banner: boolean;
    showIcon: boolean;
    closable: boolean;
    error: Error | IUnknownObject | null;
}

const ErrorAlert: FC<IErrorAlertProps> = ({ error, closable, banner, showIcon }) => {
    return (
        error && (
            <Item>
                <Alert message={error?.message} type="error" showIcon={showIcon} closable={closable} banner={banner} />
            </Item>
        )
    );
};

export default ErrorAlert;
