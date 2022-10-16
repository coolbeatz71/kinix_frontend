import { FC } from 'react';
import { Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Item } = Form;
const { Text } = Typography;

export interface IUserAgreementProps {
    styles: { [key: string]: string };
}

const UserAgreement: FC<IUserAgreementProps> = ({ styles }) => {
    const { t } = useTranslation();

    const termsOfService = t('termsOfService');
    const privacyPolicies = t('privacyPolicies');
    const byClickingCreateAccount = t('byClickingCreateAccount');

    return (
        <Item className={styles.signupForm__userAgreement}>
            <Text className={styles.signupForm__userAgreement__text}>
                {byClickingCreateAccount}{' '}
                <a href="/user-agreement" target="blank" rel="noreferrer noopener">
                    {termsOfService}
                </a>{' '}
                {t('and')}{' '}
                <a href="/privacy-policy" target="blank" rel="noreferrer noopener">
                    {privacyPolicies}
                </a>{' '}
            </Text>
        </Item>
    );
};

export default UserAgreement;
