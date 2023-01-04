import { render, screen } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import CartProduct from '@/components/CartProduct/CartProduct.vue';
expect.extend(toHaveNoViolations);

const productMock = {
    id: "41fd4fd9-95c7-4809-96db-a147d352fdbb",
    imageUrl: "https://source.unsplash.com/featured/400x400/?Unbranded Metal Chair",
    stock: 8,
    name: "Unbranded Metal Chair",
    price: 43.95,
    description: "Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.",
    favorite: false,
    quantity: 2,
};

describe('CartProduct component', () => {
    it('should render the card', () => {
        render(CartProduct, {
            props: {
                product: productMock,
            },
        });

        const productCard = screen.getByText('Unbranded Metal Chair');

        expect(productCard).toBeInTheDocument();
    });
    it('should emit an event when click on add product', () => {
        const { emitted } = render(CartProduct, {
            props: {
                product: productMock,
            },
        });

        const addButton = screen.getByRole('button', {
            name:'Add from cart',
        });

        userEvent.click(addButton);

        expect(emitted()).toHaveProperty('onAddToCart');
    });
    it('should emit an event when click on remove product', () => {
        const { emitted } = render(CartProduct, {
            props: {
                product: productMock,
            },
        });

        const addButton = screen.getByRole('button', {
            name:'Remove from cart',
        });

        userEvent.click(addButton);

        expect(emitted()).toHaveProperty('onRemoveFromCart');
    });
    it('should be accessible', async() => {
        const { container } = render(CartProduct, {
            props: {
                product: productMock,
            },
        });
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
})