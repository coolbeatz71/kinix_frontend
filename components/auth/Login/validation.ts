import i18n from 'locales/index';
import { Rule } from 'antd/lib/form';
import { minmax, required } from '@helpers/validators';

const emailUserNameValidator = (name: string): Rule[] => [
    required(name),
    minmax(name, {
        min: 3,
        max: 20,
    }),
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
