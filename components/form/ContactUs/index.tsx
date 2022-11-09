import { FC, Fragment, useState } from 'react';
import { send } from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

import Grid from 'antd/lib/grid';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Typography from 'antd/lib/typography';

import { namesValidator } from './validator';
import { required } from '@helpers/validators';
import useDarkLight from '@hooks/useDarkLight';
import { BTN_STYLES } from '@constants/styles';
import getNotification from '@helpers/getNotification';
import FloatTextInput from '@components/common/TextInput';
import { emailValidator } from '@components/auth/SignUp/validator';
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '@constants/platform';

const { TextArea } = Input;
const { Title } = Typography;
const { useBreakpoint } = Grid;
const { Item, useForm } = Form;

export interface IContactUsFormProps {
    className: string;
}

const ContactUsForm: FC<IContactUsFormProps> = ({ className }) => {
    const [form] = useForm();
    const { md } = useBreakpoint();
    const { t } = useTranslation();
    const { isDark } = useDarkLight();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = (formData: { names: string; email: string; message: string }): void => {
        setLoading(true);
        send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData, EMAILJS_PUBLIC_KEY)
            .then(() => {
                setLoading(false);
                form.resetFields();
                getNotification('success', t('contactUsSuccess'));
            })
            .catch(() => {
                setLoading(false);
                message.error(t('contactUsError'));
            });
    };

    return (
        <Fragment>
            <Title level={3} data-title>
                {t('contactUs')}
            </Title>
            <Form
                form={form}
                size="large"
                name="contact_us"
                layout="vertical"
                onFinish={onSubmit}
                className={className}
            >
                <Item name="names" validateTrigger={['onSubmit', 'onBlur']} rules={namesValidator(t('names'))}>
                    <FloatTextInput label={t('names')} placeholder={t('firstLastName')} required>
                        <Input />
                    </FloatTextInput>
                </Item>

                <Item name="email" validateTrigger={['onSubmit', 'onBlur']} rules={emailValidator()}>
                    <FloatTextInput label="Email" placeholder={t('email')} required>
                        <Input type="email" />
                    </FloatTextInput>
                </Item>

                <Item name="message" validateTrigger={['onSubmit', 'onBlur']} rules={[required(t('message'))]}>
                    <TextArea rows={4} autoSize={false} placeholder={t('writeMessageHere')} />
                </Item>

                <Button
                    block={!md}
                    htmlType="submit"
                    loading={loading}
                    className={`mt-2 ${BTN_STYLES}`}
                    type={isDark ? 'default' : 'primary'}
                >
                    {t('sendMessage')}
                </Button>
            </Form>
        </Fragment>
    );
};

export default ContactUsForm;
