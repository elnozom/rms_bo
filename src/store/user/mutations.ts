import { MutationTree } from 'vuex';
import { UserState } from './types';

export const mutations: MutationTree<UserState> = {
    loggedIn(state , user) {
        state.user = user;
    }
};