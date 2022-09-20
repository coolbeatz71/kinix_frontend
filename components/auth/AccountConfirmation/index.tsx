import React, { FC } from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Lottie, { Options } from 'react-lottie';
import { IUnknownObject } from '@interfaces/app';
import emailSendAnim from 'public/email_sent_anim.json';

import styles from './index.module.scss';

const { Text } = Typography;

export interface IAccountConfirmationProps {
    email: string;
}

const AccountConfirmation: FC<IAccountConfirmationProps> = ({ email }) => {
    const { t } = useTranslation();

    console.log(email);

    const options = (animationData: IUnknownObject): Options => ({
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    });

    return (
        <div className={styles.accountConf}>
            <Lottie width={150} height={150} options={options(emailSendAnim)} />
            <br />
            <Text className="text-center">
                <strong>{t('confirmationEmailSent')}</strong>
            </Text>
            <Text className="text-center">{t('enterVerificationCode')}</Text>
        </div>
    );
};

export default AccountConfirmation;
