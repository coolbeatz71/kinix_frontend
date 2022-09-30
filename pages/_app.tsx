import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import fr from 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';

import NProgress from 'nprogress';
import Wrapper from 'redux/store';
import { AppProps, AppContext } from 'next/app';
import { Router } from 'next/router';
import { persistor } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'styles/coreui.min.css';
import 'styles/global.scss';
import 'styles/404.scss';
import 'styles/nprogress.scss';

import locales from '@locales/index';
import { getLanguage } from '@helpers/getLanguage';
import getCategories from '@helpers/getCategories';
import { IUnknownObject } from '@interfaces/app';
import CategoriesContext from '@context/video-categories';

type AppPropsWithError = AppProps & { err: unknown } & IUnknownObject;

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

const MyApp = ({ Component, pageProps, serverProps }: AppPropsWithError): JSX.Element => {
    const userLang = getLanguage();

    const initLanguage = (lang: string): void => {
        locales.changeLanguage(lang);
        dayjs.locale(lang === 'en' ? en : fr);
    };

    useEffect(() => {
        dayjs.extend(relativeTime);
        initLanguage(userLang as string);
    }, [userLang]);

    return (
        <PersistGate loading={null} persistor={persistor}>
            <CategoriesContext.Provider value={{ serverProps }}>
                <Component {...pageProps} serverProps={serverProps} />
            </CategoriesContext.Provider>
        </PersistGate>
    );
};

MyApp.getInitialProps = async (context: AppContext) => await getCategories(context);

export default withRedux(MyApp);
