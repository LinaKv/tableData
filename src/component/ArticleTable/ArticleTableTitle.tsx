import { Button, Flex } from 'antd';
import React from 'react';

type ArticleTableTitleProps = {
    handleAdd: () => void;
};

const ArticleTableTitle = ({ handleAdd }: ArticleTableTitleProps) => {
    return (
        <Flex align="center" justify="space-between">
            <h4>Таблица артиклей</h4>
            <Button onClick={handleAdd} type="primary">
                Добавить данные
            </Button>
        </Flex>
    );
};

export default ArticleTableTitle;
