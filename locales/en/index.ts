import { validator } from './validator';
import { navigation } from './navigation';
import { form } from './form';
import { home } from './home';
import { general } from './general';

export default {
    ...validator,
    ...navigation,
    ...form,
    ...home,
    ...general,
};
