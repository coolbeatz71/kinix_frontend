import { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Form from 'antd/lib/form';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';

import { IRootState } from '@redux/reducers';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import { required } from '@helpers/validators';
import useDarkLight from '@hooks/useDarkLight';
import getNotification from '@helpers/getNotification';
import { BTN_STYLES, isDark } from '@constants/styles';
import { newPasswordMatchValidator, newPasswordValidator } from './validator';
import changePasswordAction, { resetChangePasswordAction } from '@redux/auth/changePassword';

import styles from './index.module.scss';

const DynamicErrorAlert = dynamic(() => import('@components/common/ErrorAlert'));

const { Password } = Input;
const { Title } = Typography;
const { Item, useForm } = Form;

const ChangePasswordForm: FC = () => {
    const [form] = useForm();
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();
    const { loading, error } = useSelector(({ auth: { changePassword } }: IRootState) => changePassword);

    useEffect(() => {
        resetChangePasswordAction()(dispatch);
    }, [dispatch]);

    const onSubmit = (formData: { oldPassword: string; newPassword: string }): void => {
        const { oldPassword, newPassword } = formData;
        dispatch(
            changePasswordAction({
                oldPassword,
                newPassword,
            }),
        ).then((res) => {
            if (res.type === 'auth/changePassword/fulfilled') {
                form.resetFields();
                getNotification('success', getPayload(res).message);
            }
        });
    };

    const oldPassword = t('oldPassword');
    const newPassword = t('newPassword');
    const confNewPassword = t('confNewPassword');

    return (
        <Card bordered className={styles.changePassword} data-theme={value}>
            <Title level={4} data-title>
                {t('changePassword')}
            </Title>

            <Form form={form} size="large" layout="vertical" onFinish={onSubmit} name="change_password">
                <DynamicErrorAlert error={error} showIcon closable banner />

                <Item
                    name="oldPassword"
                    label={oldPassword}
                    rules={[required(oldPassword)]}
                    validateTrigger={['onSubmit', 'onBlur']}
                >
                    <Password visibilityToggle autoComplete="new-password" placeholder="••••••••••••••" />
                </Item>

                <Item
                    name="newPassword"
                    label={newPassword}
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={newPasswordValidator(newPassword)}
                >
                    <Password visibilityToggle autoComplete="new-password" placeholder="••••••••••••••" />
                </Item>

                <Item
                    name="confNewPassword"
                    label={confNewPassword}
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={newPasswordMatchValidator(confNewPassword)}
                >
                    <Password visibilityToggle autoComplete="new-password" placeholder="••••••••••••••" />
                </Item>

                <Button
                    htmlType="submit"
                    loading={loading}
                    className={`mt-2 ${BTN_STYLES}`}
                    type={isDark(value) ? 'default' : 'primary'}
                >
                    {t('send')}
                </Button>
            </Form>
        </Card>
    );
};

export default ChangePasswordForm;
