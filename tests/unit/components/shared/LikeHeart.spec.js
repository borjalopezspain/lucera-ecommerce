import { render, screen } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import LikeHeart from '@/components/shared/LikeHeart/LikeHeart.vue';
expect.extend(toHaveNoViolations)

describe('LikeHeart component', () => {
    it('should render the filled heart if the prop is true', () => {
        render(LikeHeart, {
            props: {
                isLiked: true,
            },
        });

        const heartFilled = screen.getByTestId('heart-filled');

        expect(heartFilled).toBeInTheDocument();
    });
    it('should render the empty heart if the prop is false', () => {
        render(LikeHeart, {
            props: {
                isLiked: false,
            },
        });

        const heartEmpty = screen.getByTestId('heart-empty');

        expect(heartEmpty).toBeInTheDocument();
    });
    it('should be accessible', async() => {
        const { container } = render(LikeHeart, {
            props: {
                isLiked: false,
            },
        });
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
})