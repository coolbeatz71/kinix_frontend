import '../styles/globals.css';
import { AppProps } from 'next/app';

type AppPropsWithError = AppProps & { err: unknown };

const MyApp = ({ Component, pageProps }: AppPropsWithError): JSX.Element => {
    return <Component {...pageProps} />;
};
export default MyApp;
