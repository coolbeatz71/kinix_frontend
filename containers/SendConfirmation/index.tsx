import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Typography, Grid } from 'antd';
import Lottie, { Options } from 'react-lottie';
import { IUnknownObject } from '@interfaces/app';
import emailSendAnim from 'public/email_sent_anim.json';

import styles from './index.module.scss';

const { Title } = Typography;
const { useBreakpoint } = Grid;

const SendConfirmationContainer: FC = () => {
    const { t } = useTranslation();
    const { lg } = useBreakpoint();

    const options = (animationData: IUnknownObject): Options => ({
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    });

    return (
        <div className={styles.sendConf}>
            <Card bordered className="p-4">
                <Lottie width={lg ? 360 : 180} height={lg ? 360 : 180} options={options(emailSendAnim)} />
                <br />
                <Title level={lg ? 4 : 5} className="text-center">
                    {t('confirmationEmailSent')}
                </Title>
            </Card>
        </div>
    );
};

export default SendConfirmationContainer;
