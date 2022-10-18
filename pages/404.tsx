import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { HomeOutlined } from 'icons';
import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { HOME_PATH } from '@constants/paths';
import { IUnknownObject } from '@interfaces/app';

const DynamicLottieAnimation = dynamic(() => import('@components/common/LottieAnimation'));

const { Title } = Typography;

const Custom404: NextPage = () => {
    const { t } = useTranslation();
    const [animationData, setAnimationData] = useState<IUnknownObject>();

    useEffect(() => {
        import('public/404_anim.json').then((res) => setAnimationData(res.default));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="notFound">
            {isEmpty(animationData) ? (
                <Image quality={1} width={512} height={512} layout="intrinsic" src="/lottie-placeholder-vector.svg" />
            ) : (
                <DynamicLottieAnimation width="512px" height="512px" animation={animationData as IUnknownObject} />
            )}
            <Title className="text-center" data-text="title">
                {t('notFound')}
            </Title>
            <Link href={HOME_PATH} passHref>
                <Button className="text-center" size="large" type="primary" icon={<HomeOutlined />}>
                    {t('backHome')}
                </Button>
            </Link>
        </div>
    );
};

export default Custom404;
