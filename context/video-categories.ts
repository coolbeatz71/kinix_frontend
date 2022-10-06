import { createContext } from 'react';

export interface ICategoryType {
    id: number;
    name: string;
}

export interface CategoryServerPropsType {
    error: string | null;
    categories: ICategoryType[];
}

interface CtxType {
    serverProps: CategoryServerPropsType;
}

const initialValue: CtxType = { serverProps: { error: null, categories: [] } };
const CategoriesContext = createContext(initialValue);

export default CategoriesContext;
