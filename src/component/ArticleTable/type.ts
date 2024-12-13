import { TableProps } from 'antd';

export interface EditableRowProps {
    index: number;
}

export interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}

export interface DataArticleTableType {
    key: React.Key;
    article: string;
    costPrice: string;
    commission: string;
    tax: string;
}

export type ColumnArticleTableTypes = Exclude<TableProps<DataArticleTableType>['columns'], undefined>;
