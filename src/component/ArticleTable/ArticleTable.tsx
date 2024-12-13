import { Button, Flex, Form, Popconfirm, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ColumnArticleTableTypes, DataArticleTableType } from './type';
import EditableCell from './EditableCell';
import { getArticleTableColumns } from './articleTableColumn';
import ArticleTableTitle from './ArticleTableTitle';

const ArticleTable = () => {
    const [form] = Form.useForm();

    const [count, setCount] = useState(0);
    const [data, setData] = useState<DataArticleTableType[]>([]);

    const [editingKey, setEditingKey] = useState<React.Key>('');

    useEffect(() => {
        const savedData = localStorage.getItem('data');
        if (savedData) {
            const newData = JSON.parse(savedData);
            setData(newData);
        }
    }, []);

    const isEditing = (record: DataArticleTableType) => record.key === editingKey;

    const edit = (record: Partial<DataArticleTableType> & { key: React.Key }) => {
        form.setFieldsValue({
            ...record,
            article: record.article,
            costPrice: record.costPrice,
            commission: record.commission,
            tax: record.tax,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as DataArticleTableType;
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }

            localStorage.setItem(`data`, JSON.stringify(newData));
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = (key: React.Key) => {
        const newData = data.filter((item) => item.key !== key);
        localStorage.setItem(`data`, JSON.stringify(newData));
        setData(newData);
    };

    const handleAdd = () => {
        const newData: DataArticleTableType = {
            key: data.length,
            article: ``,
            commission: '',
            costPrice: ``,
            tax: '',
        };
        setData([...data, newData]);
        setCount(count + 1);
    };

    const components = {
        body: {
            cell: EditableCell,
        },
    };

    const defaultColumns = getArticleTableColumns({ cancel, edit, editingKey, handleDelete, isEditing, save });
    // @ts-ignore
    const mergedColumns: TableProps<DataArticleTableType>['columns'] = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataArticleTableType) => ({
                record,
                inputType: col.dataIndex === 'article' ? 'text' : 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table<DataArticleTableType>
                components={components}
                rowClassName={'editable-row'}
                bordered
                dataSource={data}
                columns={mergedColumns}
                title={() => <ArticleTableTitle handleAdd={handleAdd} />}
            />
        </Form>
    );
};

export default ArticleTable;
