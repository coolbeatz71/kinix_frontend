import { INotificationStatus } from '@interfaces/notification';
import { notification } from 'antd';
import { ReactNode } from 'react';

const getNotification = (status: INotificationStatus, description: ReactNode, message = 'Youpi!'): void =>
    notification[status]({
        maxCount: 1,
        description,
        key: status,
        placement: 'topRight',
        message: status === 'success' ? 'Youpi!' : status === 'error' ? 'Oops!' : message,
    });

export default getNotification;
