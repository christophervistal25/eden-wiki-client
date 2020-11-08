<template>
  <div
    class="shadow-lg flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0"
  >
    <div
      class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between"
    >
      <a
        href="#"
        class="font-body text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white"
        >EDEN FLYFF WIKI</a
      >
      <button
        class="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline"
      ></button>
    </div>
    <nav class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
      <div class="relative">
        <div v-for="(menuItem, index) in menu" v-bind:key="index">
          <button
            @click="changeMenuStatus(index)"
            class="flex flex-row items-center w-full px-4 py-2 mt-2 text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
          >
            <span class="menu__title">{{ menuItem.name }}</span>
          </button>
          <div
            x-transition:enter="transition ease-out duration-100"
            x-transition:enter-start="transform opacity-0 scale-95"
            x-transition:enter-end="transform opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-75"
            x-transition:leave-start="transform opacity-100 scale-100"
            x-transition:leave-end="transform opacity-0 scale-95"
            v-if="this.dropStatus[index].status"
            class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg"
          >
            <div>
              <div class="px-2 py-2 bg-white rounded-md shadow-lg">
                <div v-for="(sub, i) in menuItem.sub_category" v-bind:key="i">
                  <router-link
                    :to="`/docs/${menuItem.name.toLowerCase()}/${sub.kind
                      .replace('IK3_', '')
                      .toLowerCase()}`"
                  >
                    <a
                      class="block px-4 py-2 mt-2 text-sm bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline menu__sub__title"
                    >
                      <span>&#9862;</span>
                      {{
                        sub.kind
                          .replace("IK3_", "")
                          .replace("TEXT", "")
                          .replace(/_/g, " ")
                          .toLowerCase()
                      }}
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
      axios.get("collection/types").then((response) => {
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
  },
  created() {
    this.getMenuItems();
  },
};
</script>

<style scoped>
.menu__title,
.menu__sub__title {
  text-transform: capitalize;
}
</style>
