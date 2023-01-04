import { render, screen, within } from '@testing-library/vue';
import { createLocalVue } from '@vue/test-utils'
import { axe, toHaveNoViolations } from 'jest-axe';
import ProductListView from '@/views/ProductList/ProductListView.vue';
import userEvent from '@testing-library/user-event';
import Vuex from 'vuex'
expect.extend(toHaveNoViolations);

const localVue = createLocalVue()

localVue.use(Vuex)

const productListMock = [
    {
        id: "41fd4fd9-95c7-4809-96db-a147d352fdbb",
        imageUrl: "https://source.unsplash.com/featured/400x400/?Unbranded Metal Chair",
        stock: 8,
        name: "Unbranded Metal Chair",
        price: 43.95,
        description: "Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.",
        favorite: false,
        quantity: 2,
    },
    {
        id: "41fd4fd9-95c7-4809-96db-a147d352fd",
        imageUrl: "https://source.unsplash.com/featured/400x400/?Unbranded Metal Chair",
        stock: 8,
        name: "Unbranded Metal Chair",
        price: 43.95,
        description: "Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.",
        favorite: false,
        quantity: 2,
    }
];

let store;
let cartActions;
let stockActions;
let cartGetters;


describe('ProductListView', () => {
    beforeEach(() => {
            cartActions = {
                axn_addToCart: jest.fn(),
                axn_removeFromCart: jest.fn(),
                axn_toggleCart: jest.fn(),
            };
            stockActions = {
                axn_getAllStock: jest.fn(),
                axn_getPaginatedStock: jest.fn(),
                axn_resetPagination: jest.fn(),
                axn_getPrevPage: jest.fn(),
                axn_getNextPage: jest.fn(),
                axn_toggleLike: jest.fn(),
                axn_updateSearchFilters: jest.fn(),
            };
            cartGetters = {
                get_cartTotalAmount: jest.fn(),
            },
            store = new Vuex.Store({
                modules: {
                    stock: {
                        namespaced: true,
                        state: {
                            state_stock: productListMock,
                            state_currentPage: 1,
                            state_renderLimit: 20,
                            state_filters: '',
                        },
                        actions: stockActions,
                    },
                    cart: {
                        namespaced: true,
                        state: {
                            state_isCartVisible: false,
                            state_cart: [productListMock[0]],
                            state_total: 0,
                        },
                        actions: cartActions,
                        getters: cartGetters,
                    }
                }
            })
});
    it('should render a list of products', () => {
        render(ProductListView, {
            store,
        });

        const productList = screen.getAllByTestId('product-card');

        expect(productList).toHaveLength(2);
    });
    it('should add product to the cart when click on add button', () => {
        render(ProductListView, {
            store,
        });

        const productList = screen.getAllByTestId('product-card');
        const addButton = within(productList[0]).getByRole('button', {
            name: 'add',
        });

        userEvent.click(addButton);

        expect(cartActions.axn_addToCart).toHaveBeenCalled();
    });
    it('should remove product from the cart when click on minus button', () => {
        render(ProductListView, {
            store,
        });

        const cartItem = screen.getByTestId('cart-product');
        const removeItem = within(cartItem).getByRole('button', {
            name: 'Remove from cart'
        });

        userEvent.click(removeItem);

        expect(cartActions.axn_removeFromCart).toHaveBeenCalled();
    });
    it('should be accessible', async() => {
        const { container } = render(ProductListView, {
            store,
        });

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
})