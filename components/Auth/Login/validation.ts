import validator from 'validator';
import { Rule } from 'antd/lib/form';
import i18n from '@l10n/';
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
            else if (!validator.isAlphanumeric(name)) return Promise.reject(`${name} ${i18n.t('alphanumeric')}`);

            return Promise.resolve();
        },
    },
];

export default emailUserNameValidator;
