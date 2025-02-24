import React from 'react';
import CompareSalesForm from '../component/CompareSales/CompareSalesForm';
import { CompareSalesProvider } from '../context/CompareSalesContext';

type Props = {};

const CompareSales = (props: Props) => {
    return (
        <CompareSalesProvider>
            <CompareSalesForm />
        </CompareSalesProvider>
    );
};

export default CompareSales;
