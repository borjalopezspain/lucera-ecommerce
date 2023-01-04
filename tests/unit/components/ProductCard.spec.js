import { render, screen } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import ProductCard from '@/components/ProductCard/ProductCard.vue';
expect.extend(toHaveNoViolations);

const productMock = {
    id: "41fd4fd9-95c7-4809-96db-a147d352fdbb",
    imageUrl: "https://source.unsplash.com/featured/400x400/?Unbranded Metal Chair",
    stock: 8,
    name: "Unbranded Metal Chair",
    price: 43.95,
    description: "Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.",
    favorite: false
};

describe('ProductCard component', () => {
    it('should render the card', () => {
        render(ProductCard, {
            props: {
                product: productMock,
            },
        });

        const productCard = screen.getByText('Unbranded Metal Chair');

        expect(productCard).toBeInTheDocument();
    });
    it('should emit an event when click on add product', () => {
        const { emitted } = render(ProductCard, {
            props: {
                product: productMock,
            },
        });

        const addToCartButton = screen.getByRole('button', {
            name:'add',
        });

        userEvent.click(addToCartButton);

        expect(emitted()).toHaveProperty('onAddToCard');
    });
    it('should emit an event when click on like product', () => {
        const { emitted } = render(ProductCard, {
            props: {
                product: productMock,
            },
        });

        const likeProduct = screen.getByTestId('like-product');

        userEvent.click(likeProduct);

        expect(emitted()).toHaveProperty('onToggleLike');
    });
    it('should be accessible', async() => {
        const { container } = render(ProductCard, {
            props: {
                product: productMock,
            },
        });
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
})