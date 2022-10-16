import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Lottie, { Options } from 'react-lottie';
import notFound from 'public/404_anim.json';
import { Button, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { HOME_PATH } from '@constants/paths';

const { Title } = Typography;

const Custom404: NextPage = () => {
    const { t } = useTranslation();
    const defaultOptions: Options = {
        loop: true,
        autoplay: true,
        animationData: notFound,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="notFound">
            <Lottie width={512} height={512} options={defaultOptions} />
            <Title className="text-center" data-text="title">
                {t('notFound')}
            </Title>
            <Link href={HOME_PATH} passHref prefetch={false}>
                <Button className="text-center" size="large" type="primary" icon={<HomeOutlined />}>
                    {t('backHome')}
                </Button>
            </Link>
        </div>
    );
};

export default Custom404;
