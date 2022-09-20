import { required } from '@helpers/validators';
import { Rule } from 'antd/lib/form';

const otpValidator = (name: string): Rule[] => [required(name)];
export default otpValidator;
