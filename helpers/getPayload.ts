import { IUnknownObject } from '@interfaces/app';

const getPayload = (res: unknown): IUnknownObject => (res as IUnknownObject).payload;

export default getPayload;
