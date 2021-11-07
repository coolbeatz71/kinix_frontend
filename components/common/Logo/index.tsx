import React, { FC } from 'react';
import Link from 'next/link';
import { HOME_PATH } from '@constants/paths';

interface ILogoProps {
    canRedirect?: boolean;
    className: string | undefined;
}

const Logo: FC<ILogoProps> = ({ className, canRedirect = false }) =>
    canRedirect ? (
        <Link href={HOME_PATH}>
            <a aria-label="kiinox-logo">
                <div className={className} />
            </a>
        </Link>
    ) : (
        <div className={className} />
    );

export default Logo;
