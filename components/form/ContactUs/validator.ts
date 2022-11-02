import { Rule } from 'antd/lib/form';
import validator from 'validator';
import { minmax, required } from '@helpers/validators';
import i18n from 'locales/';

export const namesValidator = (name: string): Rule[] => {
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

                if ([undefined, null, ''].includes(value)) return Promise.resolve();

                if (!validator.isAlpha(value, 'en-US', { ignore: ' _-' }) && regex.test(value)) {
                    return Promise.reject(`${name} ${i18n.t('alphaNumericErr')}`);
                }
                return Promise.resolve();
            },
        },
    ];
};
