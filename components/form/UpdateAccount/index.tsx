import { FC, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import truncate from 'lodash/truncate';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Form from 'antd/lib/form';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Typography from 'antd/lib/typography';

import { IUser } from '@interfaces/api';
import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { IUserData } from '@interfaces/user';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import countryList from '@constants/country-list';
import { BTN_STYLES, isDark } from '@constants/styles';
import getNotification from '@helpers/getNotification';
import { ICountryObject } from '@interfaces/countryObject';
import { countryNameValidator, phonePartialValidator } from './validator';
import { emailValidator, userNameValidator } from '@components/auth/SignUp/validator';
import updateAccountAction, { resetUpdateAccountAction } from '@redux/auth/updateAccount';

import styles from './index.module.scss';

const DynamicErrorAlert = dynamic(() => import('@components/common/ErrorAlert'));

const { Option } = Select;
const { Title } = Typography;
const { Item, useForm, useWatch } = Form;

export interface IUpdateAccountProps {
    initialValues: IUser;
}

const UpdateAccountForm: FC<IUpdateAccountProps> = ({ initialValues }) => {
    const [form] = useForm();
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();
    const [country, setCountry] = useState<ICountryObject>();
    const selectedCountryName = useWatch('countryName', form);
    const { data: user } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);
    const { loading, error } = useSelector(({ auth: { updateAccount } }: IRootState) => updateAccount);

    const onSubmit = (formData: IUserData): void => {
        const countryFlag = String(country?.flag);
        const phoneISOCode = String(country?.isoCode);
        const phoneDialCode = String(country?.dialCode);

        const { countryName, email, userName, phonePartial } = formData;

        dispatch(
            updateAccountAction({
                dispatch,
                data: {
                    userName,
                    countryFlag,
                    countryName,
                    phonePartial,
                    phoneISOCode,
                    phoneDialCode,
                    email: user?.email || email,
                },
            }),
        ).then((res) => {
            if (res.type === 'auth/updateAccount/fulfilled') getNotification('success', getPayload(res).message);
        });
    };

    useEffect(() => {
        resetUpdateAccountAction()(dispatch);
    }, [dispatch]);

    useEffect(() => form.resetFields(), [form, initialValues]);

    useEffect(() => {
        if (selectedCountryName) {
            const selectedCountry = countryList.find((ct: ICountryObject) => ct.name === selectedCountryName);
            setCountry(selectedCountry);
        }
    }, [selectedCountryName]);

    const email = t('email');
    const userName = t('userName');
    const telephone = t('telephone');
    const selectPhoneCode = t('selectTelephoneCode');

    const countryOption = (country: ICountryObject): ReactNode => (
        <Option value={country.name} label={country.name} optionLabelProp="label">
            <div className="d-flex justify-content-between align-items-center">
                <span className="d-flex align-items-center py-1">
                    <Image
                        width={18}
                        height={18}
                        quality={10}
                        layout="intrinsic"
                        src={country.flag}
                        alt={country.isoCode}
                    />
                    <span className="mx-2 fw-medium">
                        {truncate(country.name, {
                            length: 35,
                        })}
                    </span>
                </span>
                <span className="text-secondary">{country.dialCode}</span>
            </div>
        </Option>
    );

    return (
        <Card bordered className={styles.updateAccount} data-theme={value}>
            <Title level={4} data-title>
                {t('accountInfo')}
            </Title>

            <Form
                form={form}
                size="large"
                layout="vertical"
                onFinish={onSubmit}
                name="update_account"
                initialValues={initialValues}
            >
                <DynamicErrorAlert error={error} showIcon closable banner />

                <Item name="email" label={email} rules={emailValidator()} validateTrigger={['onSubmit', 'onBlur']}>
                    <Input placeholder={email} type="email" disabled />
                </Item>

                <Item
                    name="userName"
                    label={userName}
                    rules={userNameValidator(userName)}
                    validateTrigger={['onSubmit', 'onBlur']}
                >
                    <Input placeholder={userName} />
                </Item>

                <Item
                    name="countryName"
                    label={t('telephoneCode')}
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={countryNameValidator(t('telephoneCode'))}
                >
                    <Select showSearch placeholder={selectPhoneCode}>
                        {countryList.map((country) => countryOption(country))}
                    </Select>
                </Item>

                <Item
                    label={telephone}
                    name="phonePartial"
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={phonePartialValidator(telephone, country?.dialCode)}
                >
                    <Input prefix={country?.dialCode} placeholder="Ex: 815252801" />
                </Item>

                <Button
                    htmlType="submit"
                    loading={loading}
                    type={isDark(value) ? 'default' : 'primary'}
                    className={`mt-2 ${BTN_STYLES}`}
                >
                    {t('send')}
                </Button>
            </Form>
        </Card>
    );
};

export default UpdateAccountForm;
