export const toRub = (number: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(number);
};

export const getTagColor = (type: string) => {
    switch (type) {
        case 'Продажа':
            return 'green';
            break;

        case 'Возврат':
            return 'volcano';
            break;

        case 'Клиентский':
            return 'gold';
            break;

        default:
            return 'red';
            break;
    }
};
