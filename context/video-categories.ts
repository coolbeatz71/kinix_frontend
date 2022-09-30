import { createContext } from 'react';

export interface ICategoryType {
    id: number;
    name: string;
}

export interface ServerPropsType {
    error: string | null;
    categories: ICategoryType[];
}

interface CtxType {
    serverProps: ServerPropsType;
}

const initialValue: CtxType = { serverProps: { error: null, categories: [] } };
const CategoriesContext = createContext(initialValue);

export default CategoriesContext;
