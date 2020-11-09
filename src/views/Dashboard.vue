<template>
  <div class="dashboard">
    <!-- component -->
    <div class="h-screen w-screen flex overflow-hidden select-none">
      <sidebar></sidebar>
      <main
        class="my-1 pt-2 pb-2 px-10 flex-1 bg-gray-200 dark:bg-black rounded-l-lg transition duration-500 ease-in-out overflow-y-auto"
      >
        <div class="flex flex-col capitalize text-3xl">
          <span class="font-semibold">hello,</span>
          <span>Administrator!</span>
        </div>
        <div class="flex">
          <div
            class="mr-6 mt-8 py-2 w-full flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 rounded-lg"
          >
            <h3
              class="flex flex-col px-5 py-1 text-lg font-semibold dark:text-gray-300"
            >
              <span>Categories</span>
            </h3>
            <div class="flex flex-col px-5 py-3">
              <custom-table :data="categories"></custom-table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Dashboard/Sidebar.vue";
import CustomTable from "../components/Dashboard/Table.vue";
import axios from "axios";
export default {
  data() {
    return {
      categories: [],
    };
  },
  components: {
    Sidebar,
    CustomTable,
  },
  methods: {},
  created() {
    axios.get("category").then((response) => (this.categories = response.data));
  },
};
</script>
