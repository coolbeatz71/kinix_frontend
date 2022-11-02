import i18n from '@locales/index';
import { Rule } from 'antd/lib/form';
import { IUnknownObject } from '@interfaces/app';
import { passwordValidator } from '@components/auth/SignUp/validator';

export const newPasswordValidator = (name: string): Rule[] => passwordValidator(name);

export const newPasswordMatchValidator = (name: string): Rule[] => [
    ({ getFieldValue }: IUnknownObject) => ({
        validator(_rule: unknown, value: string) {
            const isPassword = [undefined, '', null].includes(getFieldValue(['confNewPassword']));

            if (isPassword) return Promise.reject(`${name} ${i18n.t('requiredErr')}`);
            if (value !== getFieldValue(['newPassword'])) return Promise.reject(i18n.t('passwordMismatchErr'));

            return Promise.resolve();
        },
    }),
];
