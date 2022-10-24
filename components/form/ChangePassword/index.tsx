import React, { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Card, Form, Input, Typography } from 'antd';
import { IRootState } from '@redux/reducers';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import { required } from '@helpers/validators';
import { BTN_STYLES } from '@constants/styles';
import getNotification from '@helpers/getNotification';
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
        <Card bordered className={styles.changePassword}>
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

                <Button type="primary" htmlType="submit" loading={loading} className={`mt-2 ${BTN_STYLES}`}>
                    {t('send')}
                </Button>
            </Form>
        </Card>
    );
};

export default ChangePasswordForm;
