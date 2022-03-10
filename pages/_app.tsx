import React from 'react';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import { Router } from 'next/router';

import 'styles/coreui.min.css';
import 'styles/global.scss';

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
    return <Component {...pageProps} />;
};
export default MyApp;
