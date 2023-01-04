import state from './state';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export const cart = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};