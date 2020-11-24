<template>
  <div class="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal">
    <!-- sticky -->
    <div
      class="w-full inset-0 max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
    >
      <p class="text-base font-semibold py-2 text-gray-700">Menu</p>
      <ul
        class="list-reset py-2 md:py-0 h-screen static"
        @mouseleave="openSubMenu = 0"
      >
        <div
          v-for="item in allCategories"
          :key="item.id"
          @mouseenter="openSub(item.id)"
        >
          <li
            v-if="item.status == 'active'"
            :class="
              selectedItem == item.id
                ? 'border-l-4 border-transparent border-green-600 '
                : ''
            "
            class="py-1 md:my-2 hover:bg-green-100 lg:hover:bg-transparent"
          >
            <router-link
              :to="{
                name: 'DocsMenu',
                params: { menu: item.name.toLowerCase(), page: 1 },
              }"
            >
              <a
                class="block pl-4 align-middle text-gray-700 no-underline hover:text-green-600"
              >
                <span class="pb-1 md:pb-0 text-sm capitalize">{{
                  item.name
                }}</span>
              </a>
            </router-link>
            <div
              v-if="item.id == openSubMenu && item.sub_category.length"
              @mouseleave="openSubMenu = 0"
              class="absolute right-50 w-64 mt-2 origin-center"
            >
              <div>
                <div class="px-2 py-2 bg-white rounded shadow">
                  <div
                    v-for="sub_category in item.sub_category"
                    :key="sub_category.id"
                  >
                    <router-link
                      :to="`/docs/${item.name.toLowerCase()}/${sub_category.name
                        .replace('IK3_', '')
                        .toLowerCase()}/1`"
                    >
                      <a
                        class="cursor-pointer block px-4 py-2 mt-2 text-sm bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline capitalize"
                      >
                        <span>&#9862;</span>
                        {{ sub_category.name.toLowerCase() }}
                      </a>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      openSubMenu: 0,
      selectedItem: "",
    };
  },
  watch: {
    $route() {
      this.selectedItem = this.$route.params.id;
    },
  },
  computed: mapGetters(["allCategories"]),
  methods: {
    ...mapActions(["FETCH_CATEGORIES"]),
    openSub(itemId) {
      this.openSubMenu = itemId;
    },
    created() {
      this.FETCH_CATEGORIES();
    },
  },
};
</script>