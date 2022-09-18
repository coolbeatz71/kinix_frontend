import validator from 'validator';
import { Rule } from 'antd/lib/form';
import i18n from 'locales/index';
import { minmax, required } from '@helpers/validators';
import { IUnknownObject } from '@interfaces/app';

export const emailValidator = (): Rule[] => [
    {
        required: true,
        type: 'email',
        message: `${i18n.t('email')} ${i18n.t('emailErr')}`,
    },
];

export const userNameValidator = (name: string): Rule[] => {
    const min = 3;
    const max = 20;
    return [
        required(name),
        minmax(name, {
            min,
            max,
        }),
        {
            validator(_rule: unknown, value: string) {
                const regex = new RegExp(`.{${min},${max}}$`);

                if (!validator.isAlpha(value) && regex.test(value)) {
                    return Promise.reject(`${name} ${i18n.t('alphaErr')}`);
                }
                return Promise.resolve();
            },
        },
    ];
};

export const passwordValidator = (name: string): Rule[] => {
    return [
        required(name),
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
            message: `${name} ${i18n.t('passwordErr')}`,
        },
    ];
};

export const passwordMatchValidator = (name: string): Rule[] => [
    ({ getFieldValue }: IUnknownObject) => ({
        validator(_rule: unknown, value: string) {
            if ([undefined, '', null].includes(getFieldValue(['confPassword']))) {
                return Promise.reject(`${name} ${i18n.t('requiredErr')}`);
            }

            if (value !== getFieldValue(['password'])) {
                return Promise.reject(i18n.t('passwordMismatchErr'));
            }
            return Promise.resolve();
        },
    }),
];
