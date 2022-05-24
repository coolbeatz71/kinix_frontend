import validator from 'validator';
import { Rule } from 'antd/lib/form';
import i18n from '@l10n/index';
import { minmax, required } from '@helpers/validators';

const emailUserNameValidator = (name: string): Rule[] => [
    required(name),
    minmax(name, {
        min: 3,
        max: 20,
    }),
    {
        validator(_rule: unknown, value: string) {
            if ([null, undefined, ''].includes(value) || validator.isEmail(name)) return Promise.resolve();
            else if (!validator.isAlphanumeric(name)) return Promise.reject(`${name} ${i18n.t('alphanumericErr')}`);

            return Promise.resolve();
        },
    },
];

export const passwordValidator = (name: string): Rule[] => {
    return [
        required(name),
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
            message: `${name} ${i18n.t('passwordErr')}`,
        },
    ];
};

export default emailUserNameValidator;
