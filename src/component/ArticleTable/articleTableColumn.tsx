import { Flex, Popconfirm, Typography } from 'antd';
import { ColumnArticleTableTypes, DataArticleTableType } from './type';
import { toRub } from '../../helpers/helpers';

type getArticleTableColumnsType = {
    editingKey: React.Key;
    cancel: () => void;
    edit: (i: DataArticleTableType) => void;
    handleDelete: (i: React.Key) => void;
    isEditing: (i: DataArticleTableType) => boolean;
    save: (i: React.Key) => void;
};

export const getArticleTableColumns = ({
    editingKey,
    cancel,
    edit,
    handleDelete,
    isEditing,
    save,
}: getArticleTableColumnsType) => {
    const generateFilters = () => {
        const savedData = localStorage.getItem('data');
        if (savedData) {
            const newData = JSON.parse(savedData);
            return newData.map((el: DataArticleTableType) => ({ text: el.article, value: el.article }));
        } else {
            return null;
        }
    };
    const defaultColumns: (ColumnArticleTableTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Артикль',
            dataIndex: 'article',
            width: '30%',
            editable: true,
            filters: generateFilters(),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.article.startsWith(value as string),
        },
        {
            title: 'Себестоиомость',
            dataIndex: 'costPrice',
            editable: true,
            render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
        },
        {
            title: 'Комиссия',
            dataIndex: 'commission',
            editable: true,
            render: (percent) => <>{percent ? `${percent}%` : '-'} </>,
        },
        {
            title: 'Налог',
            dataIndex: 'tax',
            editable: true,
            render: (sum) => <>{sum ? toRub(sum) : '-'}</>,
        },
        {
            title: 'Настройки',
            dataIndex: 'operation',
            render: (_: any, record: DataArticleTableType) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Flex align="center" justify="space-center" gap="middle">
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Typography.Link disabled={editingKey !== ''}>Удалить</Typography.Link>
                        </Popconfirm>
                    </Flex>
                );
            },
        },
    ];

    return defaultColumns;
};
