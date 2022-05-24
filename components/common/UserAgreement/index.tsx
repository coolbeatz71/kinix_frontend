import { Form, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const { Text, Link } = Typography;

export interface IUserAgreementProps {
    styles: { [key: string]: string };
}

const UserAgreement: FC<IUserAgreementProps> = ({ styles }) => {
    const { t } = useTranslation();

    const termsOfService = t('termsOfService');
    const privacyPolicies = t('privacyPolicies');
    const byClickingCreateAccount = t('byClickingCreateAccount');

    return (
        <Form.Item className={styles.signupForm__userAgreement}>
            <Text className={styles.signupForm__userAgreement__text}>
                {byClickingCreateAccount}{' '}
                <Link href="/user-agreement" target="blank">
                    {termsOfService}
                </Link>{' '}
                {t('and')}{' '}
                <Link href="/privacy-policy" target="blank">
                    {privacyPolicies}
                </Link>{' '}
            </Text>
        </Form.Item>
    );
};

export default UserAgreement;
