import { Rule } from 'antd/lib/form';
import { minmax, required } from '@helpers/validators';

export const titleValidator = (name: string): Rule[] => [
    required(name),
    minmax(name, {
        min: 3,
        max: 150,
    }),
];
