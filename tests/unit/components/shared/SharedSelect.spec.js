import { render, screen } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import Vue from 'vue';
import SharedSelect from '@/components/shared/SharedSelect/SharedSelect.vue';
expect.extend(toHaveNoViolations)

describe('SharedSelect component', () => {
    it('should render the component', () => {
        render(SharedSelect, {
            props: {
                id: 'id',
                labelText: 'Select product',
            },
        });

        const label = screen.getByLabelText('Select product');

        expect(label).toBeInTheDocument();
    });

    it('should emit an event when select an option', async() => {
        const { emitted } = render(SharedSelect, {
            props: {
                id: 'id',
                labelText: 'Select product',
                optionsList: [
                    {
                        label: 'All products',
                        value: 'all',
                    },
                    {
                        label: 'Favorites',
                        value: 'favs',
                    },
                ],
            },
        });

        const select = screen.getByRole('combobox');

        select.focus();

        userEvent.tab();

        await Vue.nextTick();

        userEvent.selectOptions(select, 'favs');

        await Vue.nextTick();

        expect(emitted()).toHaveProperty('onChange');
    });

    it('should be accessible', async() => {
        const { container } = render(SharedSelect, {
            props: {
                id: 'id',
                labelText: 'Select product',
            },
        });
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
});
