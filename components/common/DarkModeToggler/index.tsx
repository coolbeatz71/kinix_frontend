import { FC } from 'react';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
import useDarkLight from '@hooks/useDarkLight';

import Affix from 'antd/lib/affix';
import Button from 'antd/lib/button';

import styles from './index.module.scss';

const DarkModeToggler: FC = () => {
    const { value, toggle } = useDarkLight();

    return (
        <Affix style={{ position: 'fixed', bottom: 50, right: 12, zIndex: 1 }}>
            <Button
                size="large"
                shape="circle"
                onClick={toggle}
                data-theme={value}
                className={styles.toggler}
                icon={value === 'dark' ? <BsFillSunFill /> : <BsMoonStarsFill />}
            />
        </Affix>
    );
};

export default DarkModeToggler;
