import { ReactNode, createContext, useReducer, useState } from 'react';

import { periodsReducer } from '../reducers/CompareSalesReducer';
import { CompareSalesContextType, CompareSalesStateType } from '../types/compareSales';

export const CompareSalesContext = createContext<CompareSalesContextType | null>(null);

type CompareSalesProvideProps = {
    children: ReactNode;
};

const initialCompareSalesState: CompareSalesStateType = {
    periods: [],
    articleFilter: [],
};
export const CompareSalesProvider: React.FC<CompareSalesProvideProps> = ({ children }) => {
    const [compareSalesState, dispatch] = useReducer(periodsReducer, initialCompareSalesState);

    return (
        <CompareSalesContext.Provider value={{ compareSalesState, dispatch }}>{children}</CompareSalesContext.Provider>
    );
};
