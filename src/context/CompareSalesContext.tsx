import { ReactNode, createContext, useState } from 'react';
import { PeriodType } from '../types/compareSales';
import { PeriodTypeEnum } from '../const/compareSalesEnum';
import { v4 as uuidv4 } from 'uuid';
import { Dayjs } from 'dayjs';

export type CompareSalesContextType = {
    periods: PeriodType[];
    addNewPeriod: () => void;
    deletePeriod: (id: string) => void;
    changePeriod: (id: string, newPeriod: Dayjs[] | null[]) => void;
    changePeriodType: (id: string, newPeriod: PeriodTypeEnum) => void;
    deleteAllPeriods: () => void;
};
export const CompareSalesContext = createContext<CompareSalesContextType | null>(null);

type CompareSalesProvideProps = {
    children: ReactNode;
};

export const CompareSalesProvider: React.FC<CompareSalesProvideProps> = ({ children }) => {
    const [periods, setPeriods] = useState<PeriodType[]>([]);

    const addNewPeriod = () => {
        setPeriods((prev) => [
            ...prev,
            {
                id: uuidv4(),
                type: PeriodTypeEnum.YEAR,
                period: [null, null],
            },
        ]);
    };

    const changePeriodType = (id: string, newType: PeriodTypeEnum) => {
        setPeriods((prev) => {
            const newPeriods = prev.map((period) => {
                if (period.id === id) {
                    return { ...period, type: newType, period: [null, null] };
                } else {
                    return period;
                }
            });
            return newPeriods;
        });
    };

    const changePeriod = (id: string, newPeriod: Dayjs[] | null[]) => {
        setPeriods((prev) => {
            const newPeriods = prev.map((period) => {
                if (period.id === id) {
                    return { ...period, period: newPeriod };
                } else {
                    return period;
                }
            });
            return newPeriods;
        });
    };

    const deletePeriod = (id: string) => {
        setPeriods((prev) => prev.filter((period) => period.id !== id));
    };

    const deleteAllPeriods = () => {
        setPeriods([]);
    };

    return (
        <CompareSalesContext.Provider
            value={{ periods, addNewPeriod, deletePeriod, changePeriodType, changePeriod, deleteAllPeriods }}
        >
            {children}
        </CompareSalesContext.Provider>
    );
};
