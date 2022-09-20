import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import fr from 'dayjs/locale/fr';
import Wrapper from 'redux/store';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@redux/store';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'styles/coreui.min.css';
import 'styles/global.scss';
import 'styles/404.scss';
import 'styles/nprogress.scss';

import { getLanguage } from '@helpers/getLanguage';
import locales from '@locales/index';

type AppPropsWithError = AppProps & { err: unknown };

const config = {
    trickle: false,
    easing: 'ease',
    speed: 800,
};

const { withRedux } = Wrapper;
const nProgress = NProgress.configure(config);

Router.events.on('routeChangeStart', () => nProgress.set(0.9).start());
Router.events.on('routeChangeComplete', () => {
    window.scroll({
        top: 0,
        left: 0,
    });
    nProgress.done();
});
Router.events.on('routeChangeError', () => nProgress.done());

const MyApp = ({ Component, pageProps }: AppPropsWithError): JSX.Element => {
    const userLang = getLanguage();

    const initLanguage = (lang: string): void => {
        locales.changeLanguage(lang);
        dayjs.locale(lang === 'en' ? en : fr);
    };

    useEffect(() => {
        initLanguage(userLang as string);
    }, [userLang]);

    return (
        <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
        </PersistGate>
    );
};
export default withRedux(MyApp);
