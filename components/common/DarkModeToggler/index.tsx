import React, { FC } from 'react';
import { Affix, Button } from 'antd';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
import styles from './index.module.scss';
import useDarkLight from '@hooks/useDarkLight';

const DarkModeToggler: FC = () => {
    const { value, toggle } = useDarkLight();

    return (
        <Affix style={{ position: 'fixed', bottom: 50, right: 20, zIndex: 1 }}>
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
