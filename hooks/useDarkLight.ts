import { useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';

interface IDarkLightData {
    value: string;
    toggle: () => void;
    isDark: boolean;
}

const useDarkLight = (): IDarkLightData => {
    const [isDark, setDark] = useState(false);
    const { value, toggle } = useDarkMode();

    useEffect(() => {
        setDark(value);
    }, [value]);

    return { value: isDark ? 'dark' : 'light', toggle, isDark };
};

export default useDarkLight;
