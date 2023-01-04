import state from './state';
import { actions } from './actions';
import { mutations } from './mutations';

export const stock = {
    namespaced: true,
    state,
    actions,
    mutations,
};