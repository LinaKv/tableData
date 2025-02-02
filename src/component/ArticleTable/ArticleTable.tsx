import { Button, Card, Flex, Form, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ColumnArticleTableTypes, DataArticleTableType } from './type';
import EditableCell from './EditableCell';
import { getArticleTableColumns } from './articleTableColumn';
import ArticleTableTitle from './ArticleTableTitle';
import Title from 'antd/es/typography/Title';

const ArticleTable = () => {
    const [form] = Form.useForm();
    const [commonDataForm] = Form.useForm();

    const [count, setCount] = useState(0);
    const [data, setData] = useState<DataArticleTableType[]>([]);
    const [taxPercent, setTaxPercent] = useState(0);

    const [editingKey, setEditingKey] = useState<React.Key>('');

    useEffect(() => {
        const savedData = localStorage.getItem('data');
        const taxData = localStorage.getItem('taxData');
        if (savedData) {
            const newData = JSON.parse(savedData);
            setData(newData);
        }

        if (taxData) {
            const newTaxData = JSON.parse(taxData);
            setTaxPercent(newTaxData);
            commonDataForm.setFieldsValue({ tax: newTaxData });
        }
    }, []);

    const isEditing = (record: DataArticleTableType) => record.key === editingKey;

    const edit = (record: Partial<DataArticleTableType> & { key: React.Key }) => {
        form.setFieldsValue({
            ...record,
            article: record.article,
            costPrice: record.costPrice,
            commission: record.commission,
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

    const onSubmitData = () => {
        const taxPercent = commonDataForm.getFieldValue('tax');
        localStorage.setItem(`taxData`, JSON.stringify(taxPercent));
    };

    return (
        <div className="">
            <Title level={3}>Общие данные артиклей</Title>

            <Card bordered={false}>
                <Form form={commonDataForm} layout="vertical" onFinish={onSubmitData} initialValues={{ tax: 0 }}>
                    <Flex justify="space-between" align="flex-end">
                        <Form.Item label="Процент налога" name="tax" style={{ marginBottom: '0px' }}>
                            <InputNumber<number>
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value?.replace('%', '') as unknown as number}
                            />
                        </Form.Item>
                        <Form.Item label={null} style={{ marginBottom: '0px' }}>
                            <Button type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form>
            </Card>

            <Title level={3}>Уникальные данные артиклей</Title>
            <Form form={form} component={false} layout="horizontal">
                <Table<DataArticleTableType>
                    components={components}
                    rowClassName={'editable-row'}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    title={() => <ArticleTableTitle handleAdd={handleAdd} />}
                />
            </Form>
        </div>
    );
};

export default ArticleTable;
