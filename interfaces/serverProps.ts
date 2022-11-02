import { InferGetServerSidePropsType } from 'next';
import { IUnknownObject } from './app';

type ServerPropsType = InferGetServerSidePropsType<IUnknownObject>;
export default ServerPropsType;
