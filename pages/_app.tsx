import React from 'react';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@redux/store';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'styles/coreui.min.css';
import 'styles/global.scss';
import 'styles/404.scss';
import 'styles/nprogress.scss';

type AppPropsWithError = AppProps & { err: unknown };

const config = {
    trickle: false,
    easing: 'ease',
    speed: 800,
};

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
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
};
export default MyApp;
