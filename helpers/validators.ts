import { Rule } from 'antd/lib/form';
import i18n from '@l10n/index';

interface IMinMax {
    min: number;
    max: number;
}

export const required = (name: string): Rule => ({
    required: true,
    message: `${name} ${i18n.t('requiredErr')}`,
});

export const minmax = (name: string, len: IMinMax): Rule => {
    const rule = { min: len.min, max: len.max };
    return {
        ...rule,
        message: `${name} ${i18n.t('minmaxErr', rule)}`,
    };
};
