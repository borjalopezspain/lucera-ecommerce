import { render, screen } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import SharedButton from '@/components/shared/SharedButton/SharedButton.vue';
expect.extend(toHaveNoViolations)

describe('SharedButton component', () => {
    it('should render the button', () => {
        render(SharedButton, {
            props: {
                labelText: 'add',
            },
        });

        const button = screen.getByRole('button', {
            name: 'add',
        });

        expect(button).toBeInTheDocument();
    })
    it('should render an icon if the component has an icon slot', () => {
        render(SharedButton, {
            slots: {
                icon: '<span>IconSlot</span>',
            },
            props: {
                labelText: 'add',
            },
        });

        const icon = screen.getByText('IconSlot');

        expect(icon).toBeInTheDocument();
    });
    it('should render the button as disabled if has the prop disabled to true', () => {
        render(SharedButton, {
            props: {
                labelText: 'add',
                isDisabled: true,
            },
        });

        const button = screen.getByRole('button', {
            name: 'add',
        });

        expect(button).toBeDisabled();
    });
    it('should call the handleClick function onClick', () => {
            const { emitted } = render(SharedButton, {
                props: {
                    labelText: 'click',
                },
            });

            const button = screen.getByRole('button', {
                name: 'click',
            });

            userEvent.click(button);

            expect(emitted()).toHaveProperty('onClick');
        });
    it('should be accessible', async() => {
        const { container } = render(SharedButton, {
            props: {
                labelText: 'download',
            },
        });
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
})