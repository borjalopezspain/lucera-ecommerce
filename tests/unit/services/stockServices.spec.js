import mockAxios from 'jest-mock-axios';
import stockServices from '@/services/stockServices';

const productListMock = [
    {
        id: '1',
    },
    {
        id: '2',
    },
    {
        id: '3',
    }
];

const productMock = {
    id: "41fd4fd9-95c7-4809-96db-a147d352fdbb",
    imageUrl: "https://source.unsplash.com/featured/400x400/?Unbranded Metal Chair",
    stock: 8,
    name: "Unbranded Metal Chair",
    price: 43.95,
    description: "Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.",
    favorite: false
};

describe('Stock Services', () => {
    const env = process.env

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...env };
    })

    afterEach(() => {
        process.env = env;
        mockAxios.reset();
    })
    describe('getAllItems', () => {
        it('should return the list of products', async() => {
            process.env.VUE_APP_DB_URL = 'http://localhost:3000';

            mockAxios.get.mockResolvedValueOnce({
                data: productListMock,
            });

            const result = await stockServices.getAllItems();

            expect(mockAxios.get).toHaveBeenCalledTimes(1);
            expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/grocery');
            expect(result).toEqual(productListMock);
        })
    });
    describe('getPaginatedItems', () => {
        it('should return the list of products', async() => {
            process.env.VUE_APP_DB_URL = 'http://localhost:3000';

            mockAxios.get.mockResolvedValueOnce({
                data: productListMock,
            });

            const result = await stockServices.getPaginatedItems(2, 20, '');

            expect(mockAxios.get).toHaveBeenCalledTimes(1);
            expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/grocery?_page=2&_limit=20&');
            expect(result).toEqual(productListMock);
        });

        it('should add filters', async() => {
            process.env.VUE_APP_DB_URL = 'http://localhost:3000';

            mockAxios.get.mockResolvedValueOnce({
                data: productListMock,
            });

            const result = await stockServices.getPaginatedItems(2, 20, 'favorite=true');

            expect(mockAxios.get).toHaveBeenCalledTimes(1);
            expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/grocery?_page=2&_limit=20&favorite=true');
            expect(result).toEqual(productListMock);
        });
    });
    describe('toggleLike', () => {
        it('should return the list of products', async() => {
            process.env.VUE_APP_DB_URL = 'http://localhost:3000';

            mockAxios.put.mockResolvedValueOnce({
                data: {},
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {},
            });

            const result = await stockServices.toggleLike(productMock);

            expect(mockAxios.put).toHaveBeenCalledTimes(1);
            expect(mockAxios.put).toHaveBeenCalledWith('http://localhost:3000/grocery/41fd4fd9-95c7-4809-96db-a147d352fdbb', productMock);
            expect(result).toEqual(200);
        })
    });
})