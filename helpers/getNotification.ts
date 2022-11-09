import { ReactNode } from 'react';

import notification from 'antd/lib/notification';

import { INotificationStatus } from '@interfaces/notification';

const getNotification = (status: INotificationStatus, description: ReactNode, message = 'Youpi!'): void =>
    notification[status]({
        maxCount: 1,
        description,
        key: status,
        placement: 'topRight',
        message: status === 'success' ? 'Youpi!' : status === 'error' ? 'Oops!' : message,
    });

export default getNotification;
