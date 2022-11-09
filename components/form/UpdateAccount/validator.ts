import { Rule } from 'antd/lib/form';
import i18n from '@locales/index';
import { required } from '@helpers/validators';

export const countryNameValidator = (name: string): Rule[] => [required(name)];

export const phonePartialValidator = (name: string, phoneDialCode: string | undefined): Rule[] => [
    required(name),
    {
        validator(_rule: unknown, value: string) {
            const regexDialCode = /^\+\d{1,4}$/;
            const regexPhone = new RegExp(/^[1-9][0-9]{1,12}$/);

            if ([null, undefined, ''].includes(value)) return Promise.resolve();

            if (!value.match(regexPhone)) {
                const phoneValue = `${phoneDialCode}${value}`;
                return Promise.reject(new Error(i18n.t('invalidFormatErr', { value: phoneValue })));
            }

            if (!phoneDialCode || !phoneDialCode.match(regexDialCode)) {
                return Promise.reject(new Error(i18n.t('invalidPhoneCodeErr')));
            }

            return Promise.resolve();
        },
    },
];
