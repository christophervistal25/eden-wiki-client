import axios from 'axios';
const state = {
    categories: [],
    category_items: [],
    pagination_data: {},
};

const getters = {
    allCategories: (state) => state.categories,
    categoryItems: (state) => state.category_items,
    paginationData: (state) => state.pagination_data,
};

const actions = {
    async FETCH_CATEGORIES({ commit }) {
        const response = await axios.get('user/category');
        commit('setCategories', response.data);
    },

    async FETCH_CATEGORY_ITEMS({ commit }, params) {
        const response = await axios.get(`user/category/${params.name}/${params.page}`);
        commit('setCategoryItems', response.data);
    }

};

const mutations = {
    setCategories: (state, categories) => (state.categories = categories),
    setCategoryItems: (state, category_items) => {
        state.category_items = category_items;
        state.pagination_data.pagination_total = category_items.pagination_total;
        state.pagination_data.total_items = category_items.total_items;
        state.pagination_data.next = category_items.next;
        state.pagination_data.previous = category_items.previous;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}