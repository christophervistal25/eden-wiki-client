<template>
  <div
    class="flex flex-col fixed mt-12 h-screen w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0 rounded"
  >
    <nav
      class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto"
      @mouseleave="closeMenu"
    >
      <div class="relative">
        <div v-for="(menuItem, index) in menu" v-bind:key="index">
          <div
            @mouseenter="changeMenuStatus(index)"
            class="cursor-pointer w-full px-4 py-2 mt-2 text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
          >
            <router-link :to="`/docs/${menuItem.id}`">
              <button
                class="bg-grey-light focus:outline-none text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <svg
                  class="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                <span>{{ menuItem.name }}</span>
              </button>
            </router-link>
          </div>
          <div
            v-if="this.dropStatus[index].status"
            class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow"
          >
            <div>
              <div
                class="px-2 py-2 bg-white rounded-md"
                @mouseleave="closeMenu"
              >
                <div v-for="(sub, i) in menuItem.sub_category" v-bind:key="i">
                  <router-link
                    :to="`/docs/${menuItem.name.toLowerCase()}/${sub.name
                      .replace('IK3_', '')
                      .toLowerCase()}/1`"
                  >
                    <a
                      class="block px-4 py-2 mt-2 text-sm bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline capitalize"
                    >
                      <span>&#9862;</span>
                      {{ sub.name.toLowerCase() }}
                    </a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      open: false,
      menu: [],
      dropStatus: [],
    };
  },
  methods: {
    getMenuItems() {
      axios.get("user/category").then((response) => {
        this.menu = response.data;
        this.initDropdowns(this.menu);
      });
    },
    initDropdowns(menu) {
      menu.forEach((item) => {
        this.dropStatus.push({
          name: item.name.toLowerCase(),
          status: false,
        });
      });
    },
    changeMenuStatus(itemIndex) {
      this.dropStatus.forEach((drop, index) => {
        if (itemIndex == index) {
          drop.status = !drop.status;
        } else {
          drop.status = false;
        }
      });
    },
    closeMenu() {
      this.dropStatus.forEach((drop) => (drop.status = false));
    },
  },
  created() {
    this.getMenuItems();
  },
};
</script>

